import { useRouter } from 'next/router'
import React from 'react'
import Button from '../../components/Button'
import Layout from '../../components/Layout'
import NewDiaryContent from '../../components/NewDiaryContent'

function NewDiary() {
    const router = useRouter()
  return (

    <Layout 
        text='새 일기쓰기'
        LeftChild={<Button text='< 뒤로가기' onClick={()=>router.back()} />}
    >
      <NewDiaryContent />
    </Layout>
  )
}

export default NewDiary