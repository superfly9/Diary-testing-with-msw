export const diaryList = [
  {
    createdAt: new Date().toLocaleDateString(),
    image: '/emotion/3.png', // public폴더 안에서의 경로만 작성, next에서 public폴더 기본으로 참조함
    name: "soso",
    title: "SoSo`s Good Day",
    id:1
  },
  {
    createdAt: new Date(2022,5,7).toLocaleDateString(),
    image: '/emotion/3.png',
    name: "FireWorks",
    title: "SoSo`s Good Day",
    id:2
  },
  {
    createdAt: new Date(2022,11,31).toLocaleDateString(),
    image: '/emotion/3.png',
    name: "Black Rock",
    title: "Jerom 파월",
    id:3
  },
  {
    createdAt: new Date(2022,9,13).toLocaleDateString(),
    image: '/emotion/3.png',
    name: "9월 CPI 발표",
    title: "와 높다 예상보다",
    id:4
  },
  {
    createdAt: new Date(2022,11,2).toLocaleDateString(),
    image: '/emotion/3.png',
    name: "가을이 한창이다",
    title: "곧 겨울이다",
    id:5
  },
  {
    createdAt: new Date(2022,9,21).toLocaleDateString(),
    image: '/emotion/3.png',
    name: "10월 말이다",
    title: "올해가 2달 남짓 남았다",
    id:6
  },
];
