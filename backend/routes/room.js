const express = require('express');
const router = express.Router();
const Room = require('../models/room'); // Task 모델 불러오기

// Room 데이터 생성
router.post('/roomspost', (req, res) => {
  const newRoom = new Room({
    roomId: "R00001",
    businessNum: "B0001", //사업 번호
    groupCode: "G0002", //조직코드
    roomName: "테스트룸",
    parentRoom_id: "P00001", //상위공간
    groupLevel: "2", //조직레벨
    ownerBusinessNumber: "B0001" //공간소유사업번호
  });

  newRoom.save()
    .then(() => res.status(201).json({ message: 'Room 데이터 저장 성공' }))
    .catch((err) => res.status(500).json({ error: 'Room 데이터 저장 실패', details: err }));
});

// 모든 Task 데이터 조회
router.get('/roomsget', (req, res) => {
  Room.find()
    .then(rooms => res.json(rooms))
    .catch(err => res.status(500).json({ error: 'Room 데이터 조회 실패', details: err }));
});

module.exports = router;