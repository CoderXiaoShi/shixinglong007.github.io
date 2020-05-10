const main = require('./index')

const create = async (openid, userInfo) => {
    let res = {
        success: true,
        errorCode: -1,
        msg: '',
        data: null
    }
    try {
        let newUser = {
            openid,
            // 用户对象
            ...userInfo,
            // 身份
            identity: 'consumer',
            // 注册时间
            create_date: new Date()
        }
        res.data = await main.db.collection('User')
            .add({
                data: newUser
            })
        res.data = {
            _id: res.data._id,
            ...newUser
        }
    } catch (error) {
        res.success = false
        res.errorCode = '1010'
        res.msg = error
    }
    return res
}

const login = async (openid) => {
    let res = {
        success: true,
        errorCode: -1,
        msg: '',
        data: null
    }
    try {
        res.data = await main.db.collection('User')
            .where({ openid })
            .get()
        if (res.data.data.length === 0) {
            res.data = null
        }
    } catch (error) {
        res.success = false
        res.errorCode = '1010'
        res.msg = error
    }
    return res
}

module.exports = {
    create,
    login
}
