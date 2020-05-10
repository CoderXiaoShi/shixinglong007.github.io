// 云函数入口文件
const cloud = require('wx-server-sdk');
const method = require('./method');

cloud.init({
  env: 'dev-enjcr'
})

exports.db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { action, params } = event
  let res = {}
  switch(action) {
    case 'create':
      res = await method.create(params);
    break;
    case 'del':
      res = await method.del(params);
    break;
    case 'update':
      res = await method.update(params);
    break;
    case 'select':
      res = await method.select(params);
    break;
  }

  return res
}
