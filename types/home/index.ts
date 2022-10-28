export type Diary = {
  createdAt: Date;
  content: string;
  title: string;
  emotion: number;
  id: number;
};

export interface DirayList {
  //추후 [] 부분 수정
  list: Diary[]
}

export type DateType = "latest" | "oldest";
export type EmotionType = "all" | "good" | "bad";
