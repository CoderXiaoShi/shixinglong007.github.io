# koa+mysql实现增删改查-全栈之路（001）

以前很少写文章。从今天开始我要挑战一下自己，连续输出100篇技术类文章。这100篇文章我尽量以实战案例为主。

如果你觉得本文还不错，记得关注或者给个 star，你们的赞和star是我编写更多更精彩文章的动力！
[GitHub 地址](https://github.com/shixinglong007)

## 本文重点内容
* 从 0 到 1 集成 node + mysql + ejs 用户管理系统
* 上手 sequelize 不使用sql操作数据库
* 熟悉 MVC 开发模式

## 成品演示
- 线上地址
- xxx
### 关键技术点
        
- 1.1 数据库操作
- 1.2 MVC模式是什么？
> 1.1 数据库操作

```javascript
// 使用 sequelize 代理数据库操作

const { Sequelize, Model, DataTypes } = require('sequelize');
const config = require('./config')

// 配置数据库连接
const sequelise = new Sequelize(
    dbName,
    username, password,
    {
        host: host,
        dialect: 'mysql', // 配置方言
})
class User extends Model {}

// 创建表
User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

sequelize.sync() // 生成数据表
  .then(() => User.create({ // 插入数据
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });
```

> 1.2 MVC模式是什么？

    MVC即Model、View、Controller即模型、视图、控制器

    Module     - 对象和业务逻辑
    View       - 用户界面
    Controller - 用来调度 View 和 Model

## 开始撸代码

先来初始化下目录结构：

    $ mkdir demo_001 && cd demo_001
    $ npm init -y
    $ npm i -s nodemon better-npm-run
    $ npm i -s koa koa-views @koa/router koa-bodyparser
    $ npm i -s ejs sequelize mysql2

添加 npm scripts 到 package.json：

    "scripts": {
      "start": "npm run dev",
      "dev": "better-npm-run dev",
      "prd": "better-npm-run prd"
    },
    "betterScripts": {
      "dev": {
        "command": "nodemon app.js",
        "env": {
          "NODE_ENV": "development"
        }
      },
      "prd": {
        "env": {
          "NODE_ENV": "production"
        },
        "command": "pm2 start app.js"
      }
    },

### 实现 view 层
新建 app.js 
```javascript
// app.js 代码
const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const bodyparser = require('koa-bodyparser');

const app = new Koa();

app.keys = ['my keys'];

app.use(bodyparser());
app.use(views(path.join(__dirname, './views'), { extension: 'ejs' }));

app.listen(3000, () => {
    console.log('server is running', new Date());
});
```
    让代码跑起来
    $ npm start
新建 views 目录结构
```
  demo_001
  ├── router
  │   └── index.js
  ├── views
  │   ├── index.ejs
  │   ├── header.ejs
  │   ├── create.ejs
  │   └── edit.ejs
  └── app.json
  └── package.json
```
view 层核心代码：

```html
<!-- views/header.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>node + mysql 实现增删改查</title>
</head>
<body>
```
```html
<!-- views/index.ejs -->
<% include('./header.ejs') %>
    <h1>
        <%= title %>
        <small>实现增删改查</small>
    </h1>
    <a href="/user/create">添加用户</a>
    <style>
        table{
            border-color: #ccc;
        }
        table td, th{
            background: #fff;
        }
    </style>
    <table cellspacing="1"  cellpadding="15" bgcolor="#000"  >
        <thead>
            <tr>
                <th>username</th>
                <th>pwd</th>
                <th>phone</th>
                <th>age</th>
                <th>gender</th>
                <th>操作</th>
            </tr>
        </thead>
        <% for (const user of users) { %>
            <tr>
                <td><%= user.username %></td>
                <td><%= user.pwd %></td>
                <td><%= user.phone %></td>
                <td><%= user.age %></td>
                <td><%= user.gender %></td>
                <td>
                    <a href="/user/edit?id=<%= user.id %>">修改</a>
                    <a href="/user/del?id=<%= user.id %>">删除</a>
                </td>
            </tr>
        <% } %>
    </table>
</body>
</html>
```
```html
<!-- views/create.ejs -->
<% include('./header.ejs') %>
    <style>
        label{
            width: 80px;
            display: inline-block;
            text-align: right;
            padding-right: 10px;
        }
    </style>
    <h1>
        <%= title %> <small><a href="/">返回首页</a></small>
    </h1>
    <form action="/user/create" method="POST" >
        <fieldset>
            <label>username</label>
            <input value="" name="username" />
        </fieldset>
        <fieldset>
            <label>pwd</label>
            <input value="" name="pwd" />
        </fieldset>
        <fieldset>
            <label>phone</label>
            <input value="" name="phone" />
        </fieldset>
        <fieldset>
            <label>age</label>
            <input value="" name="age" />
        </fieldset>
        <fieldset>
            <label>gender</label>
            <input value="" name="gender" />
        </fieldset>
        <fieldset>
            <button type="submit">Submit</button>
        </fieldset>
    </form>
</body>
</html>
```
```html
<!-- views/edit.ejs -->
<% include('./header.ejs') %>
    <style>
        label{
            width: 80px;
            display: inline-block;
            text-align: right;
            padding-right: 10px;
        }
    </style>
    <h1>
        <%= title %> <small><a href="/">返回首页</a></small>
    </h1>
    <form action="/user/edit" method="POST" >
        <input value="<%= user.id %>" name="id" type="hidden" />
        <fieldset>
            <label>username</label>
            <input value="<%= user.username %>" name="username" />
        </fieldset>
        <fieldset>
            <label>pwd</label>
            <input value="<%= user.pwd %>" name="pwd" />
        </fieldset>
        <fieldset>
            <label>phone</label>
            <input value="<%= user.phone %>" name="phone" />
        </fieldset>
        <fieldset>
            <label>age</label>
            <input value="<%= user.age %>" name="age" />
        </fieldset>
        <fieldset>
            <label>gender</label>
            <input value="<%= user.gender %>" name="gender" />
        </fieldset>
        <fieldset>
            <button type="submit">Submit</button>
        </fieldset>
    </form>
</body>
</html>
```
路由部分核心代码：
```javascript
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
```
目前为止所有的路由已经准备好了，需要挂载到 koa 实例上

```javascript
// 修改 app.js
// 引入路由部分
const indexRouter = require('./router/index')
// 挂载到 koa 实例
app.use(indexRouter.routes(), indexRouter.allowedMethods());
```

到这一步我们已经把页面做好了

打开浏览器输入 http://localhost:3000

看到这两个页面说明已经成功了

![查询页面](http://xinglong.tech/access/001_微信截图_20200423173714.png)
![新增页面](http://xinglong.tech/access/001_微信图片_20200423173813.png)


## 实现 module 层

连接数据库
创建 module
联调 曾
联调 查
联调 改
联调 删

### 总结
### 后记，联系我

```javascript

```
