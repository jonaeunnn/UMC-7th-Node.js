// src/dtos/mission.dto.js

class MissionDTO {
  constructor(mission) {
    this.mission_id = mission.mission_id;
    this.title = mission.title;
    this.body = mission.body;
    this.status = mission.status;
    this.created_at = mission.created_at;
    this.store_id = mission.store_id;
  }
}

export default MissionDTO;
