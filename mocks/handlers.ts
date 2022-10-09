import { rest } from "msw";
import { diaryList } from "./dummy/home";

export const handlers = [
  // domain다 써줘야
  rest.get("http://localhost:3000/diary/lists", (req, res, ctx) => {
    return res(ctx.json(diaryList));
  }),
];
