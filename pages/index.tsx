import type { GetServerSideProps, NextPage } from "next";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "../components/Button/index";
import Layout from "../components/Layout";
import List from "../components/List";
import { Diary, DirayList } from "../types/home";

const Home: NextPage<DirayList> = ({ list }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [diary, setDiary] = useState<Diary [] | []>([])
  
  const currentYear = useMemo(()=>currentDate.getFullYear(), [currentDate]);
  const currentMonth = useMemo(()=>currentDate.getMonth() , [currentDate]);
  const startOfThisMonth = useMemo(()=>new Date(currentYear, currentMonth,1).getTime(), [currentDate]);
  const endOfThisMonth = useMemo(()=> new Date(currentYear, currentMonth + 1 , 0).setHours(23,59,59,999) , [currentDate]);

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
      return createdAt >=startOfThisMonth && createdAt <=endOfThisMonth
    })
    setDiary(filteredList)
  },[currentDate])

  return (
    <Layout 
      text={headerTitle}
      LeftChild={<Button text="<" className="default" onClick={()=>monthChangeHandler('prev')} />}
      RightChild={<Button text=">" className="default" onClick={()=>monthChangeHandler('next')} />}
    >
      {<List list={diary} />}
    </Layout>
  );
};

export default Home;

/**
 *
 * @param context
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
