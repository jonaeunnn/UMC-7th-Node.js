import StoreRepository from "../repositories/store.repository.js";
import { bodyToStore } from "../dtos/store.dto.js";
import { DuplicateStoreNameError } from "../errors.js";

// store를 등록하는 함수
export const registerStore = async (storeData) => {
  // 요청 데이터를 DTO로 변환
  const storeDTO = bodyToStore(storeData);

  const regionName = await StoreRepository.findRegionById(storeDTO.category);
  if (!regionName) {
    // region_id가 유효하지 않은 경우 RegionNotFoundError
    throw new RegionNotFoundError(
      `해당 지역 ID(${storeDTO.category})를 찾을 수 없습니다.`,
      { region_id: storeDTO.category }
    );
  }
  // store_name 중복 여부 확인
  const existingStore = await StoreRepository.findStoreByName(
    storeDTO.store_name
  );
  if (existingStore) {
    // store_name이 중복되는 경우 DuplicateStoreNameError
    throw new DuplicateStoreNameError(
      ` 해당 "${storeDTO.store_name}" 스토어 이름이 이미 존재합니다. .`,
      { store_name: storeDTO.store_name }
    );
  }

  // 유효하다면 stores에 데이터 저장
  const storeId = await StoreRepository.createStore(storeDTO);
  return { storeId, ...storeDTO, category: regionName }; // 등록된 store의 정보 반환 (category는 region의 name으로 반환)
};
