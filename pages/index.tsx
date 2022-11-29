import Link from "next/link";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import Button from "../components/Button/index";
import Layout from "../components/Layout";
import List from "../components/List";
import Menu from "../components/Menu";
import { DATE_FILTERS, EMOTION_FILTERS } from "../constants/filterType";
import { DateType, Diary, EmotionType } from "../types/home";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Loading from "../components/Loading";
import { database } from "../firebase/config";

const Home=() => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [diary, setDiary] = useState<Diary[]>([]);
  const [originDiary,setOriginDiary] = useState<Diary []>([]);

  const currentYear = useMemo(() => currentDate.getFullYear(), [currentDate]);
  const currentMonth = useMemo(() => currentDate.getMonth(), [currentDate]);
  const startOfThisMonth = useMemo(
    () => new Date(currentYear, currentMonth, 1).getTime(),
    [currentDate]
  );
  const startOfNextMonth = useMemo(
    () => new Date(currentYear, currentMonth + 1, 1).getTime(),
    [currentDate]
  );
  const [lists, loading, error] = useCollection(
    collection(database, "diaryLists"),
    {}
);

  useEffect(() => {
    if (!loading && lists) {
        const result = lists.docs.map(doc=>{ 
          const data = {...doc.data()}
          return {
            emotion: data.emotion,
            content: data.content,
            createdAt : new Date(data.createdAt.seconds * 1000),
            id : doc.id,
            likeCount : data.like
          }})
        setDiary(result)
        setOriginDiary(result);
    }
  }, [loading]);
  
  const monthChangeHandler = useCallback(
    (type: "prev" | "next") => {
      const date = new Date(
        currentYear,
        type === "prev" ? currentMonth - 1 : currentMonth + 1,
        1
      );
      setCurrentDate(date);
    },
    [currentDate]
  );

  const headerTitle = useMemo(
    () => `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`,
    [currentDate]
  );
  const [dateType, setDateType] = useState<DateType>("latest");
  const [emotionType, setEmotionType] = useState<EmotionType>("all");

  const filteredDataByEmotion = useCallback((arr: Diary[]) => {
    switch (emotionType) {
      case 'good':
        return arr.filter((item): item is Diary => item.emotion <= 3);
      case 'bad':
        return arr.filter((item): item is Diary => item.emotion > 3);
      case 'all':
        return arr;;
    }
  }, [emotionType])

  const filterDataByDate = useCallback((list: Diary[]) => {
    let deepCopiedData: Diary[] = JSON.parse(JSON.stringify(list));
    if (dateType === "latest") {
      deepCopiedData.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      deepCopiedData.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
    return deepCopiedData;
  }, [dateType])

  useEffect(() => {
    const getThisMonthDiary = originDiary.filter((v) => {
      const createdAt = new Date(v['createdAt']).getTime();
      return createdAt >= startOfThisMonth && createdAt < startOfNextMonth;
    });
    const dateFilterdDiary = filterDataByDate(getThisMonthDiary);
    const emotionFilterdDiary = filteredDataByEmotion(dateFilterdDiary);
    setDiary(emotionFilterdDiary);
  }, [originDiary,startOfThisMonth, startOfNextMonth,filterDataByDate, filteredDataByEmotion]);

  const MenuLeftChild = (
    <>
      <select
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setDateType(e.target.value as DateType)
        }
        name="Date"
        className="controlMenu"
      >
        {DATE_FILTERS.map(({ value, name }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
      <select
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setEmotionType(e.target.value as EmotionType)
        }
        name="Emotion"
        className="controlMenu"
      >
        {EMOTION_FILTERS.map(({ value, name }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
    </>
  );
  const MenuRightChild = <Link href="/new">새 일기 쓰기</Link>;

  if (loading) return <Loading />
  if (error) return <p className="error">잠시 후 다시 시도해주세요!</p>

  return (
    <Layout
      text={headerTitle}
      LeftChild={<Button text="<" onClick={() => monthChangeHandler("prev")} />}
      RightChild={
        <Button text=">" onClick={() => monthChangeHandler("next")} />
      }
    >
      <Menu LeftChild={MenuLeftChild} RightChild={MenuRightChild} />
      <List list={diary} />
    </Layout>
  );
};

export default Home;
Home.isPrivate = true;