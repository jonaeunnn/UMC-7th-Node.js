import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class StoreRepository {
  // 주어진 region_id를 통해서 name 조회
  async findRegionById(regionId) {
    const region = await prisma.region.findUnique({
      where: { id: regionId },
      select: { name: true },
    });
    return region ? region.name : null; // region이 없으면 null 반환
  }

  // store_id로 store 조회
  async findStoreById(storeId) {
    const store = await prisma.store.findUnique({
      where: { store_id: storeId },
    });
    return store || null; // store가 없으면 null 반환
  }

  // 특정 store_name으로 store 조회
  async findStoreByName(storeName) {
    const store = await prisma.store.findFirst({
      where: { store_name: storeName },
    });
    return store || null;
  }

  // stores 테이블에 데이터 저장
  async createStore(storeData) {
    const { store_name, address, phone_number, rating, created_at, category } =
      storeData;

    // category가 region 테이블의 id와 매칭되는지 확인
    const regionName = await this.findRegionById(category); // category는 region의 id를 참조
    if (!regionName) {
      throw new Error("Invalid region id.");
    }

    const createdStore = await prisma.store.create({
      data: {
        store_name,
        address,
        phone_number,
        rating,
        created_at,
        category, // region의 id 값을 그대로 저장
      },
    });

    return createdStore.store_id; // 새로 생성된 store의 ID 반환
  }
}

export default new StoreRepository();
