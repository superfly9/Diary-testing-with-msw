import { rest } from "msw";
import { diaryList } from "./dummy/home";

const getAllDiary = rest.get("http://localhost:3000/diary/lists", (req, res, ctx) => {
  return res(ctx.json(diaryList));
})

const getDetailDiary = rest.get('http://localhost:3000/diary/detail/:diaryId', (req,res,ctx)=>{
const {diaryId} =JSON.parse(JSON.stringify(req?.params))
const detailDiary = diaryList.filter(v=>v.id === Number(diaryId));
const checkDiaryExist = detailDiary.length > 0
return res(ctx.json(checkDiaryExist ?  detailDiary[0] : {} )) 
})

export const handlers = [
  // domain다 써줘야
  getAllDiary, 
  getDetailDiary
];
