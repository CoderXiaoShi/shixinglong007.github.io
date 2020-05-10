const main = require('./index')
const moment = require('moment')
let collName = 'Queue'

const queueLock = () => {
    let lock = true
    return {
        get: () => lock,
        set: (v) => {
            lock = v ? true : false
        }
    }
}

// 入队锁
const lockFn = queueLock()

const QueueFn = (currentDate) => {
    return {
        currentDate,
        index: 0,
        list: []
    }
}

const sleep = (num = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, num)
    })
}

/*
    入队
        对号
        前面还有多少人
        订单详情
        用户对象
*/

const enqueue = async (params) => {
    let res = {
        success: true,
        errorCode: '-1',
        msg: '',
        data: null
    }
    try {
        while(1) {
            if (lockFn.get() === true) {
                // 1. 入队时, 加锁队列
                lockFn.set(false)
                let queue = null
                let date = moment().format('YYYY-M-D')
                let res = await main.db.collection(collName).where({ currentDate: date }) .get()
                if (res.data.length === 0) {
                    // 新增队列
                    queue = QueueFn(date)
                } else {
                    // 入队
                    queue = res.data[0];
                }
                params.beforeIndex = queue.list.length;
                params.createTime = new Date();
                queue.list.push(params);
                if (queue._id) {
                    let newQueue = { ...queue }
                    delete newQueue['_id'];
                    await main.db.collection(collName)
                        .doc(queue._id)
                        .set({
                            data: { ...newQueue }
                        })
                } else {
                    await main.db.collection(collName)
                        .add({
                            data: queue
                        })
                }
                lockFn.set(true);
                break;
            }
            // 轮询减速
            await sleep(150)
        }
    } catch (error) {
        res.msg = error
        res.errorCode = '1010'
        res.msg = error
        lockFn.set(true)
    }
    return res
}
/*
    出队
        删除一条数据
*/
const dequeue = async (params) => {
    let res = {
        success: true,
        errorCode: '-1',
        msg: '',
        data: null
    }
    try {
        while(1) {
            if (lockFn.get() === true) {
                lockFn.set(false)
                let queue = {}
                // 出队
                let date = moment().format('YYYY-M-D')
                let res = await main.db.collection(collName).where({ currentDate: date }) .get()
                if (res.data.length > 0) {
                    queue = res.data[0]
                    queue.list.shift()
                    queue.list = queue.list.map((item, i) => {
                        item.beforeIndex = i
                        return item
                    })
                }
                // 重置 beforeIndex
                let newQueue = {...queue}
                delete newQueue['_id']
                await main.db.collection(collName)
                        .doc(queue._id)
                        .set({
                            data: {
                                ...newQueue
                            }
                        })
                lockFn.set(true)
                break;
            }
        }
    } catch (error) {
        res.msg = error
        res.errorCode = '1010'
        res.msg = error
    }
    return res
}
module.exports = {
    enqueue,
    dequeue,
}