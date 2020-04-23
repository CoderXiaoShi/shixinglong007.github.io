const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const serve = require('koa-static');
const bodyparser = require('koa-bodyparser');

const indexRouter = require('./router/index')

const app = new Koa();

app.keys = ['my keys'];

app.use(bodyparser());
app.use(serve(path.join(__dirname, './public')));
app.use(views(path.join(__dirname, './views'), { extension: 'ejs' }));

app.use(indexRouter.routes(), indexRouter.allowedMethods());

app.listen(3001, () => {
    console.log('server is running', new Date());
});
