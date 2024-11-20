import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { registerStore } from "../services/store.service.js"; // 수정: 함수 import

export const handleStorePostUp = async (req, res, next) => {
  /*
    #swagger.summary = 'Store 등록 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              store_name: { type: "string" },
              address: { type: "string" },
              phone_number: { type: "string" },
              rating: { type: "number", format: "float" },  
            category: { type: "number" } 
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "스토어 등록 성공 응답",
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
                  store_name: { type: "string" },
                  store_id: { type: "number" },
                
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "스토어 등록 실패 응답",
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
    console.log("가게 작성을 요청하였습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    // store 데이터 처리 및 등록
    const storeData = bodyToStore(req.body);
    const store = await registerStore(storeData); // 수정: registerStore 함수 호출

    res.status(StatusCodes.OK).success(store);
  } catch (error) {
    // 에러 처리
    console.error("Error while registering store:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
