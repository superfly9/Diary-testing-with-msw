import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import Button from "../components/Button/index";
import Layout from "../components/Layout";
import List from "../components/List";
import Menu from "../components/Menu";
import { DateType, Diary, DirayList, EmotionType } from "../types/home";

const DATE_FILTERS = [
  {
    value: "latest",
    name: "최신순",
  },
  {
    value: "oldest",
    name: "오래된 순",
  },
];
const EMOTION_FILTERS = [
  {
    value: "all",
    name: "전부 다",
  },
  {
    value: "good",
    name: "좋은 감정만",
  },
  {
    value: "bad",
    name: "나쁜 감정만",
  },
];

const Home: NextPage<DirayList> = ({ list }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [diary, setDiary] = useState<Diary[]>([]);

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

  const filteredDataByEmotion = (arr: Diary[]) => {
    if (emotionType === "all") return arr;
    if (emotionType === "good") return arr.filter((v) => v.emotion <= 3);
    if (emotionType === "bad") return arr.filter((v) => v.emotion > 3);
  };

  const filterDataByDate = (list: Diary[]) => {
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
  };

  useEffect(() => {
    const getThisMonthDiary = list.filter((v) => {
      const createdAt = new Date(v.createdAt).getTime();
      return createdAt >= startOfThisMonth && createdAt < startOfNextMonth;
    });
    const getFilterdData = filteredDataByEmotion(
      filterDataByDate(getThisMonthDiary)
    );
    setDiary(getFilterdData!!);
  }, [currentDate, dateType, emotionType]);

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

/**
 * @returns context.req / res / cookies
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  let list = [];
  try {
    const res = await fetch("http://localhost:3000/diary/lists");
    if (res.statusText === "OK") {
      list = await res.json();
    }
  } catch (e) {
    console.log("[error]", e);
  }
  return {
    props: {
      list,
    },
  };
};
