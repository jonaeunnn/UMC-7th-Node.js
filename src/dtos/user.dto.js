// bodyToUser: 클라이언트로부터 받은 데이터를 user 테이블에 맞게 변환
export const bodyToUser = (body) => {
  const birth = new Date(body.birth);

  return {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth,
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber || "",
    fav_food: body.fav_food || [],
  };
};
// || "" 이면 필수 입력 정보가 아니다!

// responseFromUser: 데이터베이스에서 받은 데이터를 클라이언트 형식에 맞게 변환
export const responseFromUser = ({ user }) => {
  return {
    user: {
      email: user.email,
      name: user.name,
      gender: user.gender,
      birth: user.birth, // Date 객체를 ISO 문자열로 변환
      address: user.address,
      detailAddress: user.detailAddress,
      phoneNumber: user.phoneNumber,
      fav_food: user.fav_food || [],
    },
  };
};
