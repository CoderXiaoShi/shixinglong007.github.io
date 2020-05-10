const main = require('./index')

/*
   其他服务,例如: 配料, 杯型
   TeaAutherServices: {
        title
        childs: []
            id
            title
            price
    }
*/

let collName = 'TeaAutherServices'

const create = async (params) => {
    let res = {
        success: true,
        errorCode: -1,
        msg: '',
        data: null
    }
    try {
        // 查询是否有相同的 title
        let isExits = await main.db.collection(collName)
            .where({
                title: params.title
            }).get()
        if (isExits.data.length === 0) {
            res.data = await main.db.collection(collName)
                .add({
                    data: params
                })
        } else {
            res.success = false
            res.errorCode = '1001'
            res.msg = `${params.title}, 已存在`
        }
    } catch (error) {
        res.success = false
        res.errorCode = '1010'
        res.msg = error
    }
    return res
}

const del = async ({ _id }) => {
    let res = {
        success: true,
        errorCode: -1,
        msg: '',
        data: null
    }
    try {
        res.data = await main.db.collection(collName)
                    .doc(_id)
                    .remove()
    } catch (error) {
        res.success = false
        res.errorCode = '1010'
        res.msg = error
    }
    return res
}

const update = async (params) => {
    let res = {
        success: true,
        errorCode: -1,
        msg: '',
        data: null
    }
    try {
        let newObj = {
            ...params
        }
        delete newObj['_id']
        res.data = await main.db.collection(collName)
                    .doc(params._id)
                    .update({
                        data: newObj
                    })
    } catch (error) {
        res.success = false
        res.errorCode = '1010'
        res.msg = error
    }
    return res
}

const select = async () => {
    let res = {
        success: true,
        errorCode: -1,
        msg: '',
        data: null
    }

    try {
        res.data = await main.db.collection(collName)
                    .skip(0)
                    .limit(999)
                    .get()
    } catch (error) {
        res.success = false
        res.errorCode = '1010'
        res.msg = error
    }
    return res
}

module.exports = {
    create,
    del,
    update,
    select
}