const express = require('express'); // express 임포트
const app = express(); // app 생성
const cors = require("cors")

//아래 주석 살려야됨
const UserModel = require("./models/user");
const MemberModel = require("./models/member");
const GroupModel = require("./models/group");
const LevelModel = require("./models/level");
const RoomModel = require("./models/room");
const StateModel = require("./models/state");
const TaskModel = require("./models/task");

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
 
    }
  )
  .then(() => console.log('MongoDB conected'))
  .catch((err) => {
    console.log("connected error");
    console.log(err);
  });


  // 로그인 엔드포인트
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // 이메일로 사용자를 찾기
  UserModel.findOne({ email: email })
    .then(user => {
      if (user) {
        // 비밀번호 확인
        if (user.password === password) {
          // 로그인 성공 시 해당 사용자의 roomId 반환
          res.json({ status: "Success", roomId: user.roomId, name: user.name, groupCode: user.groupCode, userLevel: user.userLevel });
        } else {
          // 비밀번호가 일치하지 않는 경우
          res.status(401).json({ error: "The password is incorrect" });
        }
      } else {
        // 해당 이메일로 사용자를 찾을 수 없는 경우
        res.status(404).json({ error: "No user found with this email" });
      }
    })
    .catch(err => {
      // 데이터베이스 조회 중 오류 발생
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

