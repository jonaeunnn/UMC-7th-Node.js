export class DuplicateUserEmailError extends Error {
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

//errorCode는 고정이고 생상자 constuctor을 통해서 필요에 따라 오류 데이터를 추가로 담음

// store name 중복 에러 클래스
export class DuplicateStoreNameError extends Error {
  errorCode = "S001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 찾을 수 없으 때
export class NotFoundError extends Error {
  errorCode = "NOT_FOUND";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
