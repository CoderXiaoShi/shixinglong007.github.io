const Router = require('@koa/router');
const router = new Router()

// 首页，查询所有用户
router.get('/', async ctx => {
    let users = []
    console.log('查询所有用户')
    await ctx.render('index', { title: 'node + mysql ', users });
});
// 增加
router.get('/user/create', async ctx => {
    await ctx.render('create', { title: '添加用户', method: 'add' })
})
router.post('/user/create', async ctx => {
    console.log('添加用户：',ctx.request)
    ctx.redirect('/')
})

// 修改
router.get('/user/edit', async ctx => {
    const codition = { id: ctx.query.id }
    console.log('查询要修改的用户',codition)
    await ctx.render('edit', { title: '修改用户', method: 'edit', user: {} })
})
router.get('/user/edit', async ctx => {
    console.log('要修改的用户：', ctx.request)
    ctx.redirect('/')
})

// 删除
router.get('/user/del/:id', async ctx => {
    console.log('删除用户id，', ctx.params.id)
    ctx.redirect('/')
})

module.exports = router;
