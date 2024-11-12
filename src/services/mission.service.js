// mission.service.js

import MissionRepository from "../repositories/mission.repository.js";
import StoreRepository from "../repositories/store.repository.js";

// mission을 시작하는 함수
export const startMission = async (missionDTO) => {
  // store_id가 유효한지 확인
  const store = await StoreRepository.findStoreById(missionDTO.store_id);
  if (!store) {
    throw new Error(`Store with ID ${missionDTO.store_id} does not exist.`);
  }

  // mission ID로 기존 미션 찾기
  const mission = await MissionRepository.findMissionById(
    missionDTO.mission_id
  );
  if (!mission) {
    throw new Error(`Mission with ID ${missionDTO.id} does not exist.`);
  }

  // 미션 상태가 "대기 중"인지 확인
  if (mission.status !== "대기 중") {
    throw new Error(
      `현재 상태는 "대기 중"이 아닙니다. 현재 상태: ${mission.status}`
    );
  }

  // 상태를 "미션 중"으로 업데이트
  missionDTO.status = "미션 중";
  await MissionRepository.updateMissionStatus(missionDTO.id, missionDTO.status);

  return missionDTO; // 업데이트된 미션 데이터 반환
};
