const cloud = require('wx-server-sdk');
const UserMethod = require('./method');

cloud.init({
  env: 'dev-enjcr'
})

const db = cloud.database();

exports.db = db

/*
  {
    "nickName":"石兴龙",
    "gender":1,
    "language":"zh_CN",
    "city":"",
    "province":"",
    "country":"China",
    "avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/ERopy2EtG2cKhLKSYHvnsnnD67Vh7z6A0qGGajcXtMuwcUOichYPUL1VOdheoPwo4nP98FSHztr5mZpjoDBSwtw/132"
  }
*/

// 注册
// 登录

exports.main = async (event) => {
  const wxContext = cloud.getWXContext()
  const { userInfo } = event
  // login
  let res = await UserMethod.login(wxContext.OPENID)
  
  if (res.data === null) {
    // create user
    try {
      res = await UserMethod.create(wxContext.OPENID, userInfo)
      console.log('res: ', res)
      // res.data._id

    } catch (error) {
      console.error('insert user error', error)
    }
  }
  return res
}
