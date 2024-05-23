const express = require('express'); // express 임포트
const app = express(); // app 생성
const cors = require("cors")

//아래 주석 살려야됨
const UserModel = require("./models/user");
// const MemberModel = require("./models/member");
// const GroupModel = require("./models/group");
// const LebelModel = require("./models/level");
// const RoomModel = require("./models/room");
// const StateModel = require("./models/state");
// const TaskModel = require("./models/task");

const port = 3001;

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Backend Server is running');
});
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));


//라우팅
const memberRouter = require('./routes/member'); //member라우터 가져오기
const userRouter = require('./routes/user'); //user라우터 가져오기
const taskRouter = require('./routes/task');

app.use('/api', memberRouter); //member라우터 등록
app.use('/api', userRouter); //user라우터 등록
app.use('/api', taskRouter); //task 라우터 등록

//몽구스 연결
const mongoose = require('mongoose');
mongoose
  .connect(
    "mongodb+srv://ottffss1005:Wooang6324@cluster0.cgrpj1p.mongodb.net/sososo",
    {
      // useNewUrlPaser: true,
      // useUnifiedTofology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    }
  )
  .then(() => console.log('MongoDB conected'))
  .catch((err) => {
    console.log("connected error");
    console.log(err);
  });

  //task
  // Task 데이터 생성
  // app.post('/posttasks', (req, res) => {
  // const newTask = new Task({
  //   taskId: "T0003",
  //   roomId: "R0003",
  //   businessNumber: "B0003",
  //   groupCode: "G0003",
  //   taskAuthor: "박소정",
  //   taskTitle: "테스트3",
  //   taskContent: "테스트입니다3.",
  //   taskAssignee: "박소정",
  //   startDate: "20240522",
  //   endDate: "20240523",
  //   stateCode: "03"
  // });

  // newTask.save()
  //   .then(() => res.status(201).json({ message: 'Task 데이터 저장 성공' }))
  //   .catch((err) => res.status(500).json({ error: 'Task 데이터 저장 실패', details: err }));
  // });

  // const Task = require('./models/task'); 
  // app.get('/gettasks', (req, res) => {
  //   Task.find()
  //     .then(tasks => res.json(tasks))
  //     .catch(err => res.status(500).json({ error: 'Task 데이터 조회 실패', details: err }));
  // });
  

  // 로그인
  app.post("/login", (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email : email})
    .then(user => {
        if(user) {
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("No record existed")
        }
    })
})
