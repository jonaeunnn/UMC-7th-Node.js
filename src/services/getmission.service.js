import MssionRepository from "../repositories/getmission.repository.js";
import MissionDTO from "../dtos/getmission.dto.js";

// services/getmission.service.js

class MissionService {
  // 특정 store_id에 해당하는 미션 목록을 가져오는 서비스
  async getMissionsByStoreId(storeId) {
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
