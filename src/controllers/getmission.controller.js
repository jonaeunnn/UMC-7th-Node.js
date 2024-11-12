import { StatusCodes } from "http-status-codes";
import MissionService from "../services/getmission.service.js";

export const handleGetMissionsByStoreId = async (req, res, next) => {
  try {
    const { store_id } = req.params;
    console.log("미션 목록 조회 요청이 들어왔습니다!");
    console.log("store_id:", store_id); // store_id 값 확인

    // 서비스에서 미션 목록을 조회
    const missions = await MissionService.getMissionsByStoreId(
      parseInt(store_id)
    );

    if (missions.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "해당 store_id에 대한 미션이 없습니다.",
      });
    }

    // 미션 목록을 성공적으로 반환
    res.status(StatusCodes.OK).json({ result: missions });
  } catch (error) {
    // 에러 처리
    console.error("미션 목록 조회 중 오류 발생:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
