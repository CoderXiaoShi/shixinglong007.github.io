const main = require('./index')

let collName = 'Tea'

/*
    茶
        name
        description
        imgs
        price
        selects: []
        autherServices: []


{
    "action": "create", 
    "params": {
        "name":"",
        "description":"",
        "imgs": [],
        "price": "",
        selects: [],
        autherServices: []
    }
}


*/

const create = async (params) => {
    let res = {
        success: true,
        errorCode: -1,
        msg: '',
        data: null
    }
    try {
        let isExist = await main.db.collection(collName) 
            .where({
                name: params.name
            }).get()
        if (isExist.data.length === 0)　{
            let addRes = await main.db.collection(collName)
            .add({
                data: params
            })
            res.data = await main.db.collection(collName)
                    .doc(addRes._id)
                    .get()
        } else {
            res.success = false
            res.errorCode = '1001'
            res.msg = `${params.name}, 已存在同名奶茶`
        }
    } catch (error) {
        res.success = false
        res.errorCode = '1010'
        res.msg = error
    }
    return res
}

const del = async (params) => {
    let res = {
        success: true,
        errorCode: -1,
        msg: '',
        data: null
    }
    try {
        res.data = await main.db.collection(collName)
                    .doc(params._id)
                    .remove()
    } catch (error) {
        res.msg = error
        res.errorCode = '1010'
        res.success+ false
    }
    return res;
}

const update = async (params) => {
    console.log('updateTea')
    let res = {
        success: true,
        errorCode: -1,
        msg: '',
        data: null
    }
    try {
        let setObj = {
            ...params
        }
        delete setObj['_id']
        res.data = main.db.collection(collName)
                    .doc(params._id)
                    .update({
                        data: setObj
                    })
    } catch (error) {
        res.msg = error
        res.errorCode = '1010'
        res.success+ false
    }
    return res;
}

const select = async () => {
    console.log('selectTea')
    let res = {
        success: true,
        errorCode: -1,
        msg: '',
        data: null
    }
    try {
        // 查询所有的茶
        res.data = await main.db.collection(collName)
                            .where({})
                            .skip(0)
                            .limit(9999)
                            .get()
    } catch (error) {
        res.msg = error
        res.errorCode = '1010'
        res.success+ false
    }
    return res;
}

module.exports = {
    create,
    del,
    update,
    select
}