import React ,{ createContext, ReactElement,  useContext,  useState } from 'react'
import { Diary } from '../types/home'


const initialState : Diary = {
    createdAt:'',
    image:'',
    name:'',
    title:'',
    id:0
}
interface Props {
    children : ReactElement
}

const DetailContext = createContext(initialState)

function DiaryContextProvider ({children} : Props) {
    const [state, setState] = useState(initialState);
  return (
    <DetailContext.Provider value={state}>{children}</DetailContext.Provider>
  )
}
export const useDiaryContext =()=> useContext(DetailContext);

export default DiaryContextProvider