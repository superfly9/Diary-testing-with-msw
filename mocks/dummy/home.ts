export const diaryList = [
  {
    createdAt: new Date().toLocaleDateString(),
    image: '/emotion/3.png', // public폴더 안에서의 경로만 작성, next에서 public폴더 기본으로 참조함
    name: "soso",
    title: "SoSo`s Good Day",
    id:Math.floor(Math.random() * 50)
  },
  {
    createdAt: new Date(2022,5,7).toLocaleDateString(),
    image: '/emotion/3.png',
    name: "FireWorks",
    title: "SoSo`s Good Day",
    id:Math.floor(Math.random() * 50)
  },
  {
    createdAt: new Date(2022,11,31).toLocaleDateString(),
    image: '/emotion/3.png',
    name: "Black Rock",
    title: "Jerom 파월",
    id:Math.floor(Math.random() * 50)
  },
];
