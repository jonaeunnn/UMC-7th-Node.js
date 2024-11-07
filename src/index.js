import dotenv from "dotenv";
import express from "express";

import cors from "cors";
import { handleUserSignUp } from "./controllers/user.controller.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});
//첫번쨰 인자->req:클라이언트에서 요청이 올떄 , requestbody ,reqheader,url등등 그런 정보들이 들어 있음
//res: 클라이언트한테 응답할 때 필요한 모든 정보
app.post("/signup", handleUserSignUp);
//post로 /signup으로 요청이오면 handleUserSignup실행

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
