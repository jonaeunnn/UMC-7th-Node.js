import { responseFromUser } from "../dtos/user.dto.js";
import { addUser, getUser } from "../repositories/user.repository.js";
import { DuplicateUserEmailError } from "../errors.js";
//비즈니스 로직을 처리,컨트롤러로부터 호출되어 필요한 비즈니스 로직 수행
//리포지토리와 연동하여 데이터 처리
export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email, // email
    name: data.name,
    gender: data.gender,
    birth: new Date(data.birth), // Ensure birth is a Date object
    address: data.address || "", // "address" 필드 사용 (주소는 주소에 맞게)

    phoneNumber: data.phoneNumber || "", // 기본값 설정
    favfood: data.favfood || [], // 기본값으로 빈 배열 설정
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.favfood || []) {
    // "favfood" 필드를 "preferences"로 매핑
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);

  return responseFromUser({ user });
};
