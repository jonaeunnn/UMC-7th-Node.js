// mission.dto.js

export const bodyToMission = (body) => {
  return {
    store_id: body.mission_id, // 미션 ID
    mission_id: body.store_id, // 스토어 ID
    status: body.status, // 미션 상태
  };
};
