// Prisma Client 초기화
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// User 데이터 삽입
export const addUser = async (data) => {
  try {
    // 이메일 중복 확인
    const user = await prisma.user.findFirst({ where: { email: data.email } });
    if (user) {
      return null; // 이미 존재하는 이메일이면 null 반환
    }

    // 사용자 생성
    const created = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        gender: data.gender,
        birth: new Date(data.birth), // 날짜 형식으로 변환
        address: data.address,
        detailAddress: data.detailAddress || null, // 선택적 필드 처리
        phoneNumber: data.phoneNumber,
        fav_Food: { set: data.fav_Food }, // 배열 필드 저장
      },
    });

    return created.id; // 생성된 사용자 ID 반환
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err.message})`
    );
  }
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: { id: userId },
    });

    return user; // 사용자 정보 반환
  } catch (err) {
    throw new Error(`사용자를 찾을 수 없습니다. (${err.message})`);
  }
};
