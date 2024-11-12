import { pool } from "../db.config.js";

class MissionRepository {
  // 미션 ID로 미션 조회
  async findMissionById(missionId) {
    const [rows] = await pool.query(
      "SELECT * FROM mission WHERE mission_id = ?",
      [missionId]
    );
    return rows[0] || null;
  }

  // 미션 상태 업데이트
  async updateMissionStatus(missionId, status) {
    const [result] = await pool.query(
      "UPDATE mission SET status = ? WHERE mission_id = ?", // 'id' 대신 'mission_id' 사용
      [status, missionId]
    );

    console.log("Update result:", result); // 결과를 콘솔에 출력
    console.log("Affected Rows:", result.affectedRows); // affectedRows를 확인

    return result.affectedRows > 0; // 상태 업데이트가 성공하면 true 반환
  }

  // 미션 생성
  async createMission(missionData) {
    const { user_id, store_id, status, start_date, end_date, description } =
      missionData;
    const [result] = await pool.query(
      `INSERT INTO mission (user_id, store_id, status, start_date, end_date, description)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user_id, store_id, status, start_date, end_date, description]
    );
    return result.insertId; // 새로 생성된 미션 ID 반환
  }

  // 특정 store_id로 모든 미션 조회
  async findMissionsByStoreId(storeId) {
    const [rows] = await pool.query(
      "SELECT * FROM mission WHERE store_id = ?",
      [storeId]
    );
    return rows; // 해당 store_id의 모든 미션 반환
  }
}

export default new MissionRepository();
