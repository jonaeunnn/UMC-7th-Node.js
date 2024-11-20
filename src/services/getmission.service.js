import MssionRepository from "../repositories/getmission.repository.js";
import MissionDTO from "../dtos/getmission.dto.js";

// services/getmission.service.js

class MissionService {
  async getMissionsByStoreId(storeId) {
    /*
    #swagger.summary = 'Store의 미션 목록 조회 API';
    #swagger.parameters = [
      {
        in: 'path',
        name: 'store_id',
        required: true,
        description: '조회할 Store의 ID',
        schema: {
          type: 'integer',
        }
      }
    ];
    #swagger.responses[200] = {
      description: "미션 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    mission_id: { type: "number" },
                    name: { type: "string" },
                    address: { type: "string" },
                    mission_content: { type: "string" }
                  }
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
                  reason: { type: "string" },
                  data: { type: "object" }
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
      const missions = await MissionRepository.findMissionsByStoreId(storeId);

      if (!missions) {
        throw new Error("미션 목록을 찾을 수 없습니다.");
      }

      // 미션 데이터를 DTO로 변환하여 반환
      return missions.map((mission) => new MissionDTO(mission));
    } catch (error) {
      throw new Error("미션 조회 중 오류 발생: " + error.message);
    }
  }
}

export default MissionService;
