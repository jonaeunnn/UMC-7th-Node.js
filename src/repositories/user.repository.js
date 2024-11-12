import { pool } from "../db.config.js";
//데이터베이스와 직접 상호작용하는 레이어
// User 데이터 삽입
// export const addUser = async (data) => {
//   const conn = await pool.getConnection();

//   try {
//     const [confirm] = await pool.query(
//       `SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail;`,
//       data.email
//     );

//     if (confirm[0].isExistEmail) {
//       return null;
//     }

//     const [result] = await pool.query(
//       `INSERT INTO user (email, name, gender, birth, address, detailaddress, phoneNumber,fav_food) VALUES (?, ?, ?, ?, ?, ?, ?,?);`,
//       [
//         data.email,
//         data.name,
//         data.gender,
//         data.birth,
//         data.address,
//         data.detailAddress,
//         data.phoneNumber,
//         JSON.stringify(data.fav_food),
//       ]
//     );

//     return result.insertId;
//   } catch (err) {
//     throw new Error(
//       `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
//     );
//   } finally {
//     conn.release();
//   }
// };
// connection 반납을 위해 finally로 꼭 반납하도록 함

// User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) {
    return null;
  }

  const created = await prisma.user.create({ data: data });
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};
// // 사용자 정보 얻기
// export const getUser = async (userId) => {
//   const conn = await pool.getConnection();

//   try {
//     const [user] = await pool.query(`SELECT * FROM user WHERE id = ?;`, userId);

//     console.log(user);

//     if (user.length == 0) {
//       return null;
//     }

//     return user;
//   } catch (err) {
//     throw new Error(
//       `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
//     );
//   } finally {
//     conn.release();
//   }
//};
