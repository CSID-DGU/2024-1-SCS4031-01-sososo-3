//개발 환경이 로컬인 경우와 배포 모드일 경우 다르게 설정

process.env.NODE_ENV === 'production' 
  ? module.exports = require('./prod') 
  : module.exports = require('./dev');