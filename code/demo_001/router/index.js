const Router = require('@koa/router');
const router = new Router()
const UserMudule = require('../modules/user')

// 修改路由：首页，查询所有用户
router.get('/', async ctx => {
    let users = []
    try {
        users = await UserMudule.find(ctx.query)
    } catch (error) {
        console.error(error)
    }
    await ctx.render('index', { title: 'node + mysql ', users });
});
// 增加
router.get('/user/create', async ctx => {
    await ctx.render('create', { title: '添加用户', method: 'add' })
})
// 修改路由：增加
router.post('/user/create', async (ctx) => {
    const {
        username, pwd, phone, age, gender
     } = ctx.request.body
     try {
         await UserMudule.add({
            username, pwd, phone, age, gender
         })
     } catch (error) {
        console.error(error)
     }
    ctx.redirect('/')
})
// 修改路由：update
router.get('/user/edit', async ctx => {
    const codition = { id: ctx.query.id }
    // 修改前先查询出 User 对象
    let user = []
    try {
        user = await UserMudule.find(codition)
    } catch (error) {
        console.error(error)
    }
    await ctx.render('edit', { title: '修改用户', method: 'edit', user: user[0] })
})

// 修改路由：update
router.post('/user/edit', async ctx => {
    const {
        username, pwd, phone, age, gender, id
    } = ctx.request.body
    //  接受参数，执行修改
    try {
        await UserMudule.update({
            id, username, pwd, phone, age, gender
        })
    } catch (error) {
        console.error(error)    
    }
    ctx.redirect('/')
})
// 修改路由：delete
router.get('/user/del/:id', async ctx => {
    try {
        await UserMudule.del(ctx.params.id)
    } catch (error) {
        console.error(error)
    }
    ctx.redirect('/')
})

module.exports = router;
