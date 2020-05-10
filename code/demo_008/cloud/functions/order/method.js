const main = require('./index')

let collName = 'Order'

/*
user
createDate
teaList: []
    tea
status: 下单，支付，已收货，已评价
evaluate
    userId
    score
    text


{
  "action": "create",
  "params": {
    "user": {},
    "teaList": [ { "name": "绿茶" } ],
    "status": "支付",
    "evaluate": {
        "userId": "123",
        "score": 5,
        "text": "good"
    }
  }
}
*/

const create = async (params) => {
    let res = {
        success: true,
        errorCode: '-1',
        data: null,
        msg: ''
    }
    try {
        res.data = await main.db.collection(collName)
                    .add({
                        data: {
                            ...params,
                            createDate: new Date(),
                        }
                    })
    } catch (error) {
        res.success = false
        res.errorCode = '1010'
        res.msg = error
    }
    return res;
}

const del = async (params) => {
    let res = {
        success: true,
        errorCode: '-1',
        data: null,
        msg: ''
    }
    try {
        res.data = await main.db.collection(collName)
                        .doc(params._id)
                        .remove()
    } catch (error) {
        res.success = false
        res.errorCode = '1010'
        res.msg = error
    }
    return res;
}

const update = async (params) => {
    let res = {
        success: true,
        errorCode: '-1',
        data: null,
        msg: ''
    }
    try {
        let setObj = {
            ...params
        }
        delete setObj['_id']
        res.data = await main.db.collection(collName)
                    .doc(params._id)
                    .update({
                        data: setObj
                    })
    } catch (error) {
        res.success = false
        res.errorCode = '1010'
        res.msg = error
    }
    return res;
}

const select = async (params) => {
    // 根据日期查询
    // 根据ID查询
    let res = {
        success: true,
        errorCode: '-1',
        data: null,
        msg: ''
    }
    try {
        let _ = main.db.command
        _.gt
        if (params._id) {
            res.data = await main.db.collection(collName)
                            .doc(params._id)
                            .get()
        } else {
            let date = new Date()
            if (params.createDate) {
                date = new Date(params.createDate)
            } else {
                date.setHours(0)
                date.setSeconds(0)
                date.setMinutes(0)
            }
            res.data = await main.db.collection(collName)
                        .where({
                            createDate: _.gt(date)
                        })
                        .skip(0)
                        .limit(9999)
                        .get()
        }
    } catch (error) {
        res.success = false
        res.errorCode = '1010'
        res.msg = error
    }
    return res;
}

module.exports = {
    create,
    del,
    update,
    select
}