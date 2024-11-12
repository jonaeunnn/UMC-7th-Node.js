import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class MissionRepository {
  // 특정 store_id에 해당하는 미션 목록 조회
  async findMissionsByStoreId(storeId) {
    try {
      const missions = await prisma.mission.findMany({
        where: {
          store_id: storeId,
        },
        include: {
          store: true,
        },
      });
      return missions;
    } catch (error) {
      throw new Error("Error fetching missions: " + error.message);
    }
  }
}

export default MissionRepository;
