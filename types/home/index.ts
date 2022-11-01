export type Diary = {
  createdAt: Date;
  content: string;
  emotion: number;
  id: string;
};

export interface DirayList {
  //추후 [] 부분 수정
  list: Diary[]
}

export type DateType = "latest" | "oldest";
export type EmotionType = "all" | "good" | "bad";
