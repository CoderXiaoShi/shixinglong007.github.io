const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const bodyparser = require('koa-bodyparser');

const indexRouter = require('./router/index')

const app = new Koa();

app.keys = ['my keys'];

app.use(bodyparser());
app.use(views(path.join(__dirname, './views'), { extension: 'ejs' }));

app.use(indexRouter.routes(), indexRouter.allowedMethods());

app.listen(3000, () => {
    console.log('server is running', new Date());
});
