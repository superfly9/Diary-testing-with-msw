import { useRouter } from 'next/router'
import React from 'react'
import Button from '../../components/Button'
import Layout from '../../components/Layout'

function NewDiary() {
    const router = useRouter()
  return (
    <Layout 
        text='새 일기쓰기'
        LeftChild={<Button text='< 뒤로가기' onClick={()=>router.back()} />}
    >
    <em>오늘은 언제인가요?</em>
    <input type='date' />
    <em>오늘의 감정</em>
    </Layout>
  )
}

export default NewDiary