const express = require('express');
const router = express.Router();
const Task = require('../models/task'); // Task 모델 불러오기

// Task 데이터 생성
router.post('/tasks', (req, res) => {
  const newTask = new Task({
    taskId: "T0001",
    roomId: "R0001",
    businessNumber: "B0001",
    groupCode: "G0001",
    taskAuthor: "최소영",
    taskTitle: "테스트1",
    taskContent: "테스트입니다.",
    taskAssignee: "최소영",
    startDate: "20240304",
    endDate: "20240501",
    stateCode: "01"
  });

  newTask.save()
    .then(() => res.status(201).json({ message: 'Task 데이터 저장 성공' }))
    .catch((err) => res.status(500).json({ error: 'Task 데이터 저장 실패', details: err }));
});

// 모든 Task 데이터 조회
router.get('/tasks', (req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(500).json({ error: 'Task 데이터 조회 실패', details: err }));
});

module.exports = router;