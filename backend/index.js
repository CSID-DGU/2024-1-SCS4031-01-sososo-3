const express = require('express'); // express 임포트
const app = express(); // app 생성
const cors = require("cors")
const UserModel = require("./models/user");
//const MemberModel = require("./models/member");
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
//const memberRouter = require('./routes/member'); //member라우터 가져오기
//const userRouter = require('./routes/user'); //user라우터 가져오기

//app.use('/api', memberRouter); //member라우터 등록
//app.use('/api', userRouter); //user라우터 등록

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
