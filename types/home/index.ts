export type Diary = {
  createdAt: string;
  image: string;
  name: string;
  title: string;
  id:number;
};

export interface DirayList {
  //추후 [] 부분 수정
  list: Diary [] | [];
}