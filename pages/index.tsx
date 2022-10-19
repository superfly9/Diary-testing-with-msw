import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import Button from "../components/Button/index";
import Layout from "../components/Layout";
import List from "../components/List";
import Menu from "../components/Menu";
import { DateType, Diary, DirayList, EmotionType } from "../types/home";

const DATE_FILTERS = [{
  value :'latest',
  name  :'최신순',
},{
  value :'oldest',
  name  :'오래된 순',
}];
const EMOTION_FILTERS = [{
  value:'all',
  name:'전부 다'
},{
  value:'good',
  name :'좋은 감정만'
},{
  value:'bad',
  name:'나쁜 감정만'
}];


const Home: NextPage<DirayList> = ({ list }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [diary, setDiary] = useState<Diary [] | []>([])

  const currentYear = useMemo(()=>currentDate.getFullYear(), [currentDate]);
  const currentMonth = useMemo(()=>currentDate.getMonth() , [currentDate]);
  const startOfThisMonth = useMemo(()=>new Date(currentYear, currentMonth , 1).getTime(), [currentDate]);
  const startOfNextMonth = useMemo(()=> new Date(currentYear, currentMonth+1, 1).getTime() , [currentDate]);

  const monthChangeHandler = useCallback((type : 'prev' | 'next')=>{
    const date = new Date(currentYear,  type === 'prev' ? currentMonth -1 : currentMonth + 1 ,1)
    setCurrentDate(date)
  }, [currentDate])
  
  const headerTitle = useMemo(
    () => `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`,
    [currentDate]
  );

  useEffect(()=>{
    const filteredList= list.filter(v=>{
      const createdAt = new Date(v.createdAt).getTime();
      return createdAt >=startOfThisMonth && createdAt < startOfNextMonth
    })
    setDiary(filteredList)
  },[currentDate])


  const [dataType, setDateType] = useState<DateType | string>('latest');
  const [emotionType, setEmotionType] = useState<EmotionType | string>('all');

  const filterHandler = (e:ChangeEvent<HTMLSelectElement>)=>{
    const value = e.target.value;
    const name = e.target.name;
    switch (name) {
      case 'Date':
        setDateType(value)
        case 'Emotion':
        setEmotionType(value);
      default:
        break;
    }
  }

  const MenuLeftChild = (
    <>
    <select onChange={filterHandler} name='Date' className='controlMenu'>
        {DATE_FILTERS.map(({value,name})=><option key={value}>{name}</option>)}
      </select>
      <select onChange={filterHandler} name='Emotion' className='controlMenu'>
        {EMOTION_FILTERS.map(({value,name})=><option key={value}>{name}</option>)}
      </select>
    </>
  )
  const MenuRightChild = <Link href='/new'>새 일기 쓰기</Link>
  
  return (
    <Layout 
      text={headerTitle}
      LeftChild={<Button text="<" onClick={()=>monthChangeHandler('prev')} />}
      RightChild={<Button text=">" onClick={()=>monthChangeHandler('next')} />}
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
