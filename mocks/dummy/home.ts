export const diaryList = [
  {
    createdAt: new Date().toLocaleDateString(),
    image: '/emotion/3.png', // public폴더 안에서의 경로만 작성, next에서 public폴더 기본으로 참조함
    email: "so@gmail.com",
    name: "soso",
    title: "SoSo`s Good Day",
    description: "A Awesome Day was coming from then",
    id:Math.floor(Math.random() * 50)
  },
  {
    createdAt: new Date(2022,5,7).toLocaleDateString(),
    image: '/emotion/3.png',
    email: "chan@gmail.com",
    name: "FireWorks",
    title: "SoSo`s Good Day",
    description: "Nasdaq is Gonig down to Bottom",
    id:Math.floor(Math.random() * 50)
  },
  {
    createdAt: new Date(2022,11,31).toLocaleDateString(),
    image: '/emotion/3.png',
    email: "Fire@naver.com",
    name: "Black Rock",
    title: "Jerom 파월",
    description: "인플레이션이 일시적이라매",
    id:Math.floor(Math.random() * 50)
  },
];
