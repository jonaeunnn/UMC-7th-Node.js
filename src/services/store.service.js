import StoreRepository from "../repositories/store.repository.js";
import { bodyToStore } from "../dtos/store.dto.js";

// store를 등록하는 함수
export const registerStore = async (storeData) => {
  // 요청 데이터를 DTO로 변환
  const storeDTO = bodyToStore(storeData);

  // region의 id가 유효한지 확인
  const regionName = await StoreRepository.findRegionById(storeDTO.category);
  if (!regionName) {
    throw new Error(`Region with ID ${storeDTO.category} does not exist.`);
  }

  // store_name 중복 여부 확인
  const existingStore = await StoreRepository.findStoreByName(
    storeDTO.store_name
  );
  if (existingStore) {
    throw new Error(`Store with name "${storeDTO.store_name}" already exists.`);
  }

  // 유효하다면 stores에 데이터 저장
  const storeId = await StoreRepository.createStore(storeDTO);
  return { storeId, ...storeDTO, category: regionName }; // 등록된 store의 정보 반환 (category는 region의 name으로 반환)
};
