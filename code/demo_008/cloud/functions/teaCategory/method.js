const main = require('./index');

/*
    TeaCategory: {
        title: '茶品类'
    }
*/

const create = async (param) => {
    let res = {
        success: true,
        errorCode: -1,
        msg: '',
        data: null
    }
    try {
        let isExist = await main.db.collection('TeaCategory')
            .where({
                title: param.title
            })
            .get()
        if (isExist.data.length === 0) {
            res.data = await main.db.collection('TeaCategory')
                .add({
                    data: param
                })
        } else {
            res.success = false
            res.errorCode = '1001'
            res.msg = `${param.title}, 此类目已存在`
        }
    } catch (error) {
        res.success = false
        res.errorCode = '1010'
        res.msg = error
    }
    return res
}

const del = async (param) => {
    let res = {
        success: true,
        errorCode: -1,
        msg: '',
        data: null
    }
    try {
        res = await main.db.collection('TeaCategory')
                .doc(param._id)
                .remove()
    } catch (error) {
        res.success = false
        res.errorCode = '1010'
        res.msg = error
    }
    return res
}

const update = async (param) => {
    let res = {
        success: true,
        errorCode: -1,
        msg: '',
        data: null
    }
    try {
        let newObj = {
            ...param
        }
        delete newObj['_id']
        res.data = await main.db.collection('TeaCategory')
                .doc(param._id)
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

// 查询全部
const select = async () => {
    let res = {
        success: true,
        errorCode: -1,
        msg: '',
        data: null
    }
    try {
        res.data = await main.db.collection('TeaCategory')
                    .skip(0)
                    .limit(9999)
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
