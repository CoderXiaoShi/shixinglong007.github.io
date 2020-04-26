# 免费 https 申请步骤
![](https://xinglong.tech/access/003/demo_03_01.jpeg)

不适用 https 加密的网站，基本上就等于在裸奔。

来，开始开始动手做

我的系统是 CentOS6

## 第一步：安装Certbot
Certbot可以用于管理(申请、更新、配置、撤销和删除等)Let's Encrypt证书。这里安装的是带nginx插件的certbot：

wget https://dl.eff.org/certbot-auto
sudo mv certbot-auto /usr/local/bin/certbot-auto
sudo chown root /usr/local/bin/certbot-auto
sudo chmod 0755 /usr/local/bin/certbot-auto

## 第二步：拿到证书
这条命令只是拿到证书，剩下的步骤手动完成

    $ /usr/local/bin/certbot-auto certonly --standalone --email lpjustdoit@163.com --agree-tos -d demo_01.xinglong.tech -d demo_02.xinglong.tech -d demo_03.xinglong.tech

查看证书

    $ ls /etc/letsencrypt/live/

在nginx配置证书

    ssl_certificate /etc/letsencrypt/live/cdw.me/fullchain.pem;#证书位置
    ssl_certificate_key /etc/letsencrypt/live/cdw.me/privkey.pem;# 私钥位置

启动nginx

## 设置自动续订

```
编写更新脚本renew-cert.sh

#!/bin/bash

# 停止nginx
service nginx stop

# 续签
# --force-renew 强制更新
/root/certbot-auto renew --force-renew

# 启动nginx
service nginx start
a+x renew-cert.sh

自动更新https证书 在crontab 服务中正价 定时任务

#每两个月 自动 更新 证书
* * * */2 * /root/renew-cert.sh >> /root/crontab.log 2>&1

Let’s Encrypt 生成的免费证书为3个月时间，但是我们可以无限次续签证书
```

> 作者：[石兴龙](https://xinglong.tech/)<br/>
> 来源：[GitHub](https://github.com/shixinglong007/shixinglong007.github.io)<br/>
>  <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br/>
>  本作品采用<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议</a>进行许可。