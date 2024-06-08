// const express = require('express');
// const router = express.Router();
// const Task = require('../models/task'); // Task 모델 불러오기

// // 가장 최근의 taskId를 가져오는 함수
// const getNextTaskId = async (roomId) => {
//   const lastTask = await Task.findOne({ roomId }).sort({ taskId: -1 }).exec();
//   if (lastTask) {
//     const lastTaskIdNumber = parseInt(lastTask.taskId.slice(1), 10);
//     return `T${(lastTaskIdNumber + 1).toString().padStart(4, '0')}`;
//   } else {
//     return 'T0100';
//   }
// };

// // Task 데이터 생성
// router.post('/taskspost', async (req, res) => {
//   const { taskTitle, taskDescription, taskAuthor, taskAssignee, status, attachment, startDate, endDate, roomId, groupCode } = req.body;

//   try {
//     const taskId = await getNextTaskId(roomId);
//     console.log('Received taskId:', taskId);

//     const newTask = new Task({
//       taskId,
//       groupCode: groupCode || 'G0001', // groupCode를 기본 값으로 설정
//       taskTitle,
//       taskDescription,
//       taskAuthor,
//       taskAssignee,
//       status,
//       attachment,
//       startDate: new Date(startDate), // ISO 문자열을 Date 객체로 변환하여 저장
//       endDate: new Date(endDate), // ISO 문자열을 Date 객체로 변환하여 저장
//       roomId
//     });

//     await newTask.save();
//     console.log('Task saved:', newTask); // 저장된 태스크 로그 추가
//     res.status(201).json({ message: 'Task 데이터 저장 성공', task: newTask });
//   } catch (err) {
//     console.error('Error saving task:', err.message, err.stack); // 서버 로그에 에러 출력
//     res.status(500).json({ error: 'Task 데이터 저장 실패', details: err.message });
//   }
// });

// // 특정 roomId의 모든 Task 데이터 조회
// router.get('/tasks/:roomId', async (req, res) => { // 새로운 엔드포인트 추가
//   const { roomId } = req.params;
//   try {
//     const tasks = await Task.find({ roomId });
//     console.log('Tasks fetched:', tasks); // 가져온 태스크 로그 추가
//     res.json(tasks);
//   } catch (err) {
//     console.error('Error fetching tasks:', err.message, err.stack); // 서버 로그에 에러 출력
//     res.status(500).json({ error: 'Task 데이터 조회 실패', details: err.message });
//   }
// });

// // Task 데이터 수정
// router.put('/puttasks/:taskId', async (req, res) => {
//   const { taskId } = req.params;
//   const { taskTitle, taskDescription, taskAuthor, taskAssignee, status, attachment, startDate, endDate, roomId, groupCode } = req.body;

//   try {
//     const updatedTask = await Task.findOneAndUpdate(
//       { taskId },
//       {
//         taskTitle,
//         taskDescription,
//         taskAuthor,
//         taskAssignee,
//         status,
//         attachment,
//         startDate: new Date(startDate), // ISO 문자열을 Date 객체로 변환하여 저장
//         endDate: new Date(endDate), // ISO 문자열을 Date 객체로 변환하여 저장
//         roomId,
//         groupCode
//       },
//       { new: true } // 업데이트된 문서를 반환
//     );

//     if (!updatedTask) {
//       return res.status(404).json({ error: 'Task not found' });
//     }

//     console.log('Task updated:', updatedTask); // 업데이트된 태스크 로그 추가
//     res.json({ message: 'Task 데이터 수정 성공', task: updatedTask });
//   } catch (err) {
//     console.error('Error updating task:', err.message, err.stack); // 서버 로그에 에러 출력
//     res.status(500).json({ error: 'Task 데이터 수정 실패', details: err.message });
//   }
// });

// // Task 데이터 삭제
// router.delete('/tasksdel/:taskId', async (req, res) => {
//   const { taskId } = req.params;

//   try {
//     const deletedTask = await Task.findOneAndDelete({ taskId });

//     if (!deletedTask) {
//       return res.status(404).json({ error: 'Task not found' });
//     }

//     console.log('Task deleted:', deletedTask);
//     res.json({ message: 'Task 데이터 삭제 성공', task: deletedTask });
//   } catch (err) {
//     console.error('Error deleting task:', err.message, err.stack);
//     res.status(500).json({ error: 'Task 데이터 삭제 실패', details: err.message });
//   }
// });

// module.exports = router;

//첨부파일 DB 업로드
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Task = require('../models/task');

// Multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// 가장 최근의 taskId를 가져오는 함수
const getNextTaskId = async (roomId) => {
  const lastTask = await Task.findOne({ roomId }).sort({ taskId: -1 }).exec();
  if (lastTask) {
    const lastTaskIdNumber = parseInt(lastTask.taskId.slice(1), 10);
    return `T${(lastTaskIdNumber + 1).toString().padStart(4, '0')}`;
  } else {
    return 'T0100';
  }
};

// Task 데이터 생성
router.post('/taskspost', upload.single('attachment'), async (req, res) => {
  const { taskTitle, taskDescription, taskAuthor, taskAssignee, status, startDate, endDate, roomId, groupCode } = req.body;

  try {
    const taskId = await getNextTaskId(roomId);
    console.log('Received taskId:', taskId);

    const newTask = new Task({
      taskId,
      groupCode: groupCode || 'G0001',
      taskTitle,
      taskDescription,
      taskAuthor,
      taskAssignee,
      status,
      attachment: req.file ? req.file.path : null, // attachment 속성 추가
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      roomId
    });

    await newTask.save();
    console.log('Task saved:', newTask);
    res.status(201).json({ message: 'Task 데이터 저장 성공', task: newTask });
  } catch (err) {
    console.error('Error saving task:', err.message, err.stack);
    res.status(500).json({ error: 'Task 데이터 저장 실패', details: err.message });
  }
});

// 특정 roomId의 모든 Task 데이터 조회
router.get('/tasks/:roomId', async (req, res) => {
  const { roomId } = req.params;
  try {
    const tasks = await Task.find({ roomId });
    console.log('Tasks fetched:', tasks);
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err.message, err.stack);
    res.status(500).json({ error: 'Task 데이터 조회 실패', details: err.message });
  }
});

// Task 데이터 수정
router.put('/tasks/:taskId', upload.single('attachment'), async (req, res) => {
  const { taskId } = req.params;
  const { taskTitle, taskDescription, taskAuthor, taskAssignee, status, startDate, endDate, roomId, groupCode } = req.body;

  try {
    const updateData = {
      taskTitle,
      taskDescription,
      taskAuthor,
      taskAssignee,
      status,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      roomId,
      groupCode
    };

    if (req.file) {
      updateData.attachment = req.file.path;
    }

    const updatedTask = await Task.findOneAndUpdate(
      { taskId },
      updateData,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    console.log('Task updated:', updatedTask);
    res.json({ message: 'Task 데이터 수정 성공', task: updatedTask });
  } catch (err) {
    console.error('Error updating task:', err.message, err.stack);
    res.status(500).json({ error: 'Task 데이터 수정 실패', details: err.message });
  }
});

// Task 데이터 삭제

router.delete('/tasksdel/:taskId', async (req, res) => {
  const { taskId } = req.params;

  try {
    const deletedTask = await Task.findOneAndDelete({ taskId });

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    console.log('Task deleted:', deletedTask);
    res.json({ message: 'Task 데이터 삭제 성공', task: deletedTask });
  } catch (err) {
    console.error('Error deleting task:', err.message, err.stack);
    res.status(500).json({ error: 'Task 데이터 삭제 실패', details: err.message });
  }
});

module.exports = router;