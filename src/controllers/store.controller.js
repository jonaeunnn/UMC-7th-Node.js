import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { registerStore } from "../services/store.service.js"; // 수정: 함수 import

export const handleStorePostUp = async (req, res, next) => {
  try {
    console.log("가게 작성을 요청하였습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    // store 데이터 처리 및 등록
    const storeData = bodyToStore(req.body);
    const store = await registerStore(storeData); // 수정: registerStore 함수 호출

    res.status(StatusCodes.OK).json({ result: store }); // 성공적으로 등록된 store 정보 반환
  } catch (error) {
    // 에러 처리
    console.error("Error while registering store:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
