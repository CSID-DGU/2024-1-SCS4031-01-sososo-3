const express = require('express');
const router = express.Router();
const Group = require('../models/group');

router.post('/groupspost', (req, res) => {
  const newGroup = new Group({
    groupName,
    groupLevel,
    parentGroupCode,
    leaderEmployeeNumber
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