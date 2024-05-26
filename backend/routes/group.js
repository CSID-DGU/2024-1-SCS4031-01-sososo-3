const express = require('express');
const router = express.Router();
const Group = require('../models/group');

router.post('/groupspost', (req, res) => {
  const newGroup = new Group({
    groupCode,
      groupName,
      groupLevel, // 팀:1, 본부:2, 대표이사:3
      parentGroupCode, // 상위조직 groupCode
      leaderRoomId // 리더 roomId 
  });

  newGroup.save()
    .then(() => res.status(201).json({ message: 'Group 데이터 저장 성공' }))
    .catch((err) => res.status(500).json({ error: 'Group 데이터 저장 실패', details: err }));
});

router.get('/groupsget', (req, res) => {
  Group.find()
    .then((groups) => res.json(groups)) 
    .catch((err) => res.status(500).json({ error: 'Group 데이터 가져오기 실패', details: err }));
});

module.exports = router;