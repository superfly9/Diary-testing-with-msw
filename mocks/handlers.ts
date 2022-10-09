import { rest } from "msw";

export const handlers = [
  rest.get("/diary/lists", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          date: new Date(),
          email: "so@gmail.com",
          name: "soso",
          title: "SoSo`s Good Day",
          description: "A Awesome Day was coming from then",
        },
        {
          date: new Date(),
          email: "chan@gmail.com",
          name: "FireWorks",
          title: "SoSo`s Good Day",
          description: "Nasdaq is Gonig down to Bottom",
        },
        {
          date: new Date(),
          email: "Fire@naver.com",
          name: "Black Rock",
          title: "Jerom 파월",
          description: "인플레이션이 일시적이라매",
        },
      ])
    );
  }),
];
