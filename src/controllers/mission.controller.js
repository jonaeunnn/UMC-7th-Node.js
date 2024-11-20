// mission.controller.js

import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { startMission } from "../services/mission.service.js";

export const handleMissionStatusUpdate = async (req, res, next) => {
  /*
  #swagger.summary = '미션 상태를 도전으로 바꾸는 API';
  #swagger.parameters = [
    {
      in: 'path',
      name: 'mission_id',
      required: true,
      description: '상태를 업데이트할 미션의 ID',
      schema: {
        type: 'integer',
      }
    }
  ];
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            status: { type: "number", example: 1 }  // 1은 도전중 상태
          }
        }
      }
    }
  };
  #swagger.responses[200] = {
    description: "미션 상태 업데이트 성공 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                mission_id: { type: "number", example: 1 },
                status: { type: "number", example: 1 },
                message: { type: "string", example: "미션 도전 시작." }
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[400] = {
    description: "잘못된 요청 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "U001" },
                reason: { type: "string", example: "NOTFOUND" },
                data: { type: "object", example: null }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  };
*/

  try {
    console.log("미션 상태 변경 요청이 들어왔습니다!");
    console.log("body:", req.body); // 요청 body 확인

    // 요청 데이터를 DTO로 변환
    const missionDTO = bodyToMission(req.body);

    // 서비스에서 상태 변경 처리
    const updatedMission = await startMission(missionDTO);

    // 상태 변경 성공 후, 업데이트된 미션 정보 반환
    res.status(StatusCodes.OK).success(updatedMission);
  } catch (error) {
    // 에러 처리
    console.error("Error while updating mission status:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
