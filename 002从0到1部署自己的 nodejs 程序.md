# 实战：一步步教你部署自己的Nodejs应用
> Date: 2020-4-24

    如果你也有自己的小网站，自己的域名。请让它跑起来，让它穿梭在互联网中，陌生人的微信，抖音，浏览器在这巨大的信息流中留下你的足迹。

    接下来，我教你上线自己的网站

    如果看完这篇文章，你的网站也上线了。请你联系我，让我一起和你分享这份喜悦。
    wx: guzhan321

## 先看效果

[在线演示](http://demo_01.catok.top/)

# 目录

1. <a href="#关键技术点">关键技术点</a>
2. <a href="#开始动手">开始动手</a>
    1. <a href="#购买域名，虚拟机">购买域名，虚拟机</a>
    2. <a href="#安装生产环境套件">安装生产环境套件</a>
    3. <a href="#启动自己的项目">启动自己的项目</a>
    4. <a href="#编写 nginx 配置">编写 nginx 配置</a>
    5. <a href="#重启 nginx">重启 nginx</a>
    6. <a href="#配置域名映射">配置域名映射</a>
3. <a href="#总结">总结</a>
4. <a href="#后记">后记</a>

## <a id="关键技术点">关键技术点</a>
    1. 怎样通过域名访问到我的主机（配置域名DNS解析）
    2. 服务器套件 mysql nginx nodejs 等 如何安装

> 怎样通过域名访问到我的主机

    其实这是最简单的一步啦，购买域名的厂商都会有一个域名解析的页面比如阿里云的 云解析DNS

![阿里云的 云解析DNS](https://xinglong.tech/access/002/demo_002_01.png)

> 服务器套件 mysql nginx nodejs 等 如何安装

    最简单的办法，安装 宝塔 linxu 面板（图形工具）
    官网：https://www.bt.cn/download/linux.html

    建议不要重度依赖宝塔，自己还是要系统的学习 linux 知识，然后才能更好的使用工具。我之后也会出一些 linux 的文章。

## <a id="开始动手">开始动手</a>

1. <a id="购买域名，虚拟机">购买域名，虚拟机</a>

    【域名】 我推荐 阿里云，阿里云是国内最大的云计算提供商。自己的域名我建议不要买 .com 的。比如我这个 xinglong.tech 10年才199元。

![阿里云的 云解析DNS](https://xinglong.tech/access/002/demo_002_02.png)

    【虚拟机】就是一台虚拟的电脑，云计算服务商从一台超大型计算机中虚拟一台主机给你，国内云计算厂商的都会给你分配公网IP, 我推荐买最低配的1核1GB内存，腾讯云 新用户首年99元。

![阿里云的 云解析DNS](https://xinglong.tech/access/002/demo_002_03.png)

2. <a id="安装生产环境套件">安装生产环境套件</a>
    1. 安装 宝塔 Linux面板 [安装教程](https://www.bt.cn/bbs/thread-19376-1-1.html)
    2. 图形界面安装各个软件

![阿里云的 云解析DNS](https://xinglong.tech/access/002/demo_002_07.png)

3. <a id="启动自己的项目">启动自己的项目</a>

    大部分项目启动的方法都不太一样。你自己的代码你当然是知道怎么启动啦。不过要注意 配置 production 环境

4. <a id="编写 nginx 配置">编写 nginx 配置</a>

    来，上手最简单的 nginx 配置

    1. 在你电脑上新建文件 demo.conf
    2. 打开这个文件写入
        ```
        server  {
            listen 80;
            server_name 你的域名; # 注意！！这里需要替换掉

            location / {
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $host;

                proxy_pass http://localhost:你项目的启动端口/; 
                # 注意！！这里需要替换掉
            }
        }
        ```
    3. 把这个文件上传到你的虚拟机的 /www/server/panel/vhost/nginx/ 目录下


5. <a id="重启 nginx">重启 nginx</a>

    4. 重启 nginx 使用宝塔图形界面。我还是要建议你学习 nginx 命令，要多多学习 nginx 知识不要对图形界面产生依赖

![阿里云的 云解析DNS](https://xinglong.tech/access/002/demo_002_06.png)

    使用 ngixn 常用命令

    $ nginx            #启动
    $ nginx -t         #测试所有的 nginx　配置是否正确
    $ nginx -s reload　#重启 nginx
    $ nginx -s stop    #停止 nginx

6. <a id="配置域名映射">配置域名映射</a>

这是最简单的一步。

![阿里云的 云解析DNS](https://xinglong.tech/access/002/demo_002_04.png)
![阿里云的 云解析DNS](https://xinglong.tech/access/002/demo_002_05.png)

    配置好以后在浏览器里输入你的域名试试看，应该就可以访问到你的网站了。

## 总结

    这是最简单的上线过程，如果你遇到困难了记得联系我 wx: guzhan321

    我们安装程序的时候严重依赖了宝塔，但是这是不好的习惯。我还是建议你多访问各大软件的官网，看看官网的安装方法以及文档

    Nodejs 官网：http://nodejs.cn/
    Mysql 官网：https://www.mysql.com/
    Nginx 官网：http://nginx.org/

## 后记

    一边实战一边查阅文档是一个很不错的学习方法。借此机会，打开这些工具的官方文档，他们的文档就是最好的学习资料。

> 联系我
- 个人微信: guzhan321
- [GitHub](https://github.com/shixinglong007/shixinglong007.github.io)
- 个人公众号: 搜索“石兴龙”

> 资源分享：
-  Xshell 免费破解版 链接: https://pan.baidu.com/s/1S_tG3r90EnvGdxuY0TrnDw 提取码: 5vgq
- Navicat 免费破解版 链接: https://pan.baidu.com/s/1cj0WV_pmEvklt9OSl4lu1Q 提取码: qxfj 


如果你看完了我的文章，并且有所收获的话，

我希望能给我一点点打赏

让我知道你在看。我会持续输出更多优质内容

![微信](https://xinglong.tech/access/wechart.jpg)
![支付宝](https://xinglong.tech/access/zhifubao.jpg)
