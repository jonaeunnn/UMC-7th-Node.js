import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";

dotenv.config();

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  // 기존 사용자 확인
  const user = await prisma.user.findFirst({ where: { email } });

  // 이미 사용자가 있으면 기존 사용자 반환
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  // 새로운 사용자 생성
  const created = await prisma.user.create({
    data: {
      email,
      name: profile.displayName,
      gender: "추후 수정", // 기본값
      birth: new Date(1970, 0, 1), // 기본값
      address: "추후 수정", // 기본값
      detailAddress: "추후 수정", // 기본값
      phoneNumber: "추후 수정", // 기본값
      fav_Food: JSON.stringify(["추후 수정"]), // JSON 형식으로 저장
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};

//googlVerify함수는 google로그인 후 전달받은 사용자의 프로필 정보에 이메일이 포함되어 있는지
//확인하고, 이메일을 이용해서 사용자를 조회함. 그리고 사용자가 존재x면 기본값과 함께 사용자 정보를 자동으로 생성하는 간단한 함수
