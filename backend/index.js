const express = require('express'); // express 임포트
const app = express(); // app생성
const port = 3000;

app.use(express.json()); //JSON

app.get('/', function (req, res) {
  res.send('hello world!!');
});

const memberRouter = require('./routes/member'); //라우터 가져오기

app.use('/api', memberRouter); //라우터 등록

app.listen(port, () => console.log(`${port}포트입니다.`));

//몽구스 연결
const mongoose = require('mongoose');
mongoose
  .connect(
    "mongodb+srv://ottffss1005:Wooang6324@cluster0.cgrpj1p.mongodb.net/",
    
    {
      // useNewUrlPaser: true,
      // useUnifiedTofology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    }
  )
  .then(() => console.log('MongoDB conected'))
  .catch((err) => {
    console.log("오류입니다");
    console.log(err);
  });

