const express = require('express');
const router = express.Router();
const Member = require('../models/member'); // 올바르게 Member 모델 불러오기

// member 데이터 생성
router.post('/memberspost', (req, res) => {
  const newMember = new Member({
    employeeNumber: "9823423",
    groupCode: "G00001",
    employeeName: "김민정"
  });

  newMember.save()
    .then(() => res.status(201).json({ message: 'Member 데이터 저장 성공' }))
    .catch((err) => res.status(500).json({ error: 'Member 데이터 저장 실패', details: err }));
});

// 모든 member 데이터 가져오기
router.get('/membersget', (req, res) => {
  // `req.body`는 GET 요청에서 사용되지 않음
  Member.find()
    .then((members) => res.json(members)) // 모든 멤버 데이터를 JSON 형식으로 반환
    .catch((err) => res.status(500).json({ error: 'Member 데이터 가져오기 실패', details: err }));
});

module.exports = router;