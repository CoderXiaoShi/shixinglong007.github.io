// modules/user.js
const Sequelize = require('sequelize')

const sequelize = require('../db');

const User = sequelize.define('user', {
    username: { type: Sequelize.STRING },
    pwd: { type: Sequelize.STRING, },
    phone: { type: Sequelize.STRING, },
    age: { type: Sequelize.STRING, },
    gender: { type: Sequelize.INTEGER, },
});

module.exports.add = async (data) => await User.create(data)
module.exports.del = async (id) => await User.destroy({ where: { id } })

module.exports.update = async (data) => {
    let newUser = {...data}
    delete newUser['id']
    return await User.update({ ...newUser }, {
        where: { id: data.id }
    })
}

module.exports.find = async (condition) => {
    if (Object.keys(condition).length) {
        return await User.findAll({ where: { ...condition } })
    } else {        
        return await User.findAll();
    }
}