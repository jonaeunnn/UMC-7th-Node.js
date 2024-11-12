// mission.controller.js

import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { startMission } from "../services/mission.service.js";

export const handleMissionStatusUpdate = async (req, res, next) => {
  try {
    console.log("미션 상태 변경 요청이 들어왔습니다!");
    console.log("body:", req.body); // 요청 body 확인

    // 요청 데이터를 DTO로 변환
    const missionDTO = bodyToMission(req.body);

    // 서비스에서 상태 변경 처리
    const updatedMission = await startMission(missionDTO);

    // 상태 변경 성공 후, 업데이트된 미션 정보 반환
    res.status(StatusCodes.OK).json({ result: updatedMission });
  } catch (error) {
    // 에러 처리
    console.error("Error while updating mission status:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
