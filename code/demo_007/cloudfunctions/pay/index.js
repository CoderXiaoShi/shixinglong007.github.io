// 云函数入口文件
const cloud = require('wx-server-sdk')
const tenpay = require('tenpay')

const config = {
  appid: 'wxf25e232c63a1111a', // 小程序 appid
  mchid: '1515679431',  // 商户号
  partnerKey: '3a816922aba3ee43a8920024b9444996',  // api 秘钥
  notify_url: 'https://www.qq.com/',  
  spbill_create_ip: '127.0.0.1'
}

const wxApi = new tenpay(config)

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const { money } = event
  const wxContext = cloud.getWXContext()
  let out_trade_no = Date.now() + '_' + parseInt(Math.random() * 1e5)
  let result = await wxApi.getPayParams({
    out_trade_no: out_trade_no,
    body: '模拟充值',
    total_fee: money,
    openid: wxContext.OPENID
  });
  
  return {
    payParams: result
  }
}