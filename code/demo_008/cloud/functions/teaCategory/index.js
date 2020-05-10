// 云函数入口文件
const cloud = require('wx-server-sdk')
const { create, del, update, select } = require('./method')

cloud.init({
  env: 'dev-enjcr'
})

exports.db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { action, params } = event;
  let res = null;
  switch (action) {
    case 'create':
      res = await create(params);
    break;
    case 'del':
      res = await del(params);
    break;
    case 'update':
      res = await update(params);
    break;
    case 'select':
      res = await select(params);
    break;
  }
  return res;
}
