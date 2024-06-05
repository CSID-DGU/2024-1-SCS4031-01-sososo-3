const express = require('express');
const router = express.Router();
const User = require('../models/user'); // 올바르게 user 모델 불러오기

// user 데이터 생성
router.post('/userspost', (req, res) => {
  const newUser = new User({
    // test data
      name:"홍기봉",
      email: "dlij35@sososo.com",
      password: "11gh41",
      roomId: "R0160",
      groupCode: "G0020",
      userLevel: "1",
  },
);

  newUser.save()
    .then(() => res.status(201).json({ message: 'User 데이터 저장 성공' }))
    .catch((err) => res.status(500).json({ error: 'User 데이터 저장 실패', details: err }));
});

// 모든 member 데이터 가져오기
router.get('/usersget', (req, res) => {
  // `req.body`는 GET 요청에서 사용되지 않음
  User.find()
    .then((users) => res.json(users)) // 모든 멤버 데이터를 JSON 형식으로 반환
    .catch((err) => res.status(500).json({ error: 'User 데이터 가져오기 실패', details: err }));
});

// 특정 그룹 코드에 해당하는 사용자 데이터를 반환하는 엔드포인트
router.get('/users/:groupCode', async (req, res) => {
  const { groupCode } = req.params;

  try {
      // 해당 그룹 코드에 해당하는 사용자 데이터를 찾습니다.
      const users = await User.find({ groupCode });
      
      // 사용자 데이터를 JSON 형식으로 응답합니다.
      res.json(users);
  } catch (err) {
      // 오류가 발생하면 오류 메시지를 반환합니다.
      res.status(500).json({ error: '사용자 데이터 가져오기 실패', details: err });
  }
});

module.exports = router;