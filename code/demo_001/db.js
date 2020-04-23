const Sequelize = require('sequelize');
const config = require('./config')

const { dbName, username, password, host } = config.db;

const sequelise = new Sequelize(
    dbName,
    username, password,
    {
        host: host,
        dialect: 'mysql',
        // 配置连接池
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
})

sequelise
    .authenticate()
    .then(() => {
        console.log('数据库连接成功')
    })
    .catch(err => {
        throw new Error('数据库连接失败', err)
    })

module.exports = sequelise