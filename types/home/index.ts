export type Diary = {
  createdAt: string;
  image: string;
  name: string;
  title: string;
  id:number;
};

export interface DirayList {
  list: Diary [];
}