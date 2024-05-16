const express = require('express');
const router = express.Router();
const User = require('../models/User'); // 올바르게 user 모델 불러오기

// member 데이터 생성
router.post('/users', (req, res) => {
  const newMember = new Member({
    userid: "user123",
      name:"최소영",
      email: "ottffss1005@naver.com",
      password: pass123,
      token: "123",
      tokenExp: "123"
  });

  newMember.save()
    .then(() => res.status(201).json({ message: 'User 데이터 저장 성공' }))
    .catch((err) => res.status(500).json({ error: 'User 데이터 저장 실패', details: err }));
});

// 모든 member 데이터 가져오기
router.get('/users', (req, res) => {
  // `req.body`는 GET 요청에서 사용되지 않음
  Member.find()
    .then((users) => res.json(users)) // 모든 멤버 데이터를 JSON 형식으로 반환
    .catch((err) => res.status(500).json({ error: 'User 데이터 가져오기 실패', details: err }));
});

module.exports = router;