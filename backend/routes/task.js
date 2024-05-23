const express = require('express');
const router = express.Router();
const Task = require('../models/task'); // Task 모델 불러오기

// Task 데이터 생성
router.post('/taskspost', (req, res) => {
  const newTask = new Task({
    taskId: "T0002",
    roomId: "R0002",
    businessNumber: "B0002",
    groupCode: "G0002",
    taskAuthor: "김미소",
    taskTitle: "테스트2",
    taskContent: "테스트입니다.",
    taskAssignee: "김미소",
    startDate: "20240304",
    endDate: "20240501",
    stateCode: "01"
  });

  newTask.save()
    .then(() => res.status(201).json({ message: 'Task 데이터 저장 성공' }))
    .catch((err) => res.status(500).json({ error: 'Task 데이터 저장 실패', details: err }));
});

// 모든 Task 데이터 조회
router.get('/tasksget', (req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(err => res.status(500).json({ error: 'Task 데이터 조회 실패', details: err }));
});



// //Task 수정
// router.put('/tasks/:id', (req, res) => {
//   const { id } = req.params;
//   const updatedTask = req.body;

//   Task.findByIdAndUpdate(id, updatedTask, { new: true })
//     .then(task => {
//       if (task) {
//         res.json({ message: 'Task 수정 완료', task });
//       } else {
//         res.status(404).json({ error: 'Task 데이터가 존재하지 않습니다.' });
//       }
//     })
//     .catch(err => res.status(500).json({ error: 'Task 수정 실패', details: err }));
// });

module.exports = router;