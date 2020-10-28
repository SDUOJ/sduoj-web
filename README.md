# Shandong University Online Judge - Front End

## Get started 
Make sure that `node v12.18.2` and `npm v6.14.5` or their higher version are installed.

### Development on Linux or macOS
```
npm install

# Your server address
export OJ_SERVER=oj.xxxx.com.cn
# Your server address that listen webSocket, it is not required and can be same as `OJ_SERVER`
# export OJ_WS=

# serve with hot reload at localhost:8080
npm run serve
```

### Production
```
npm run build
```

We will give a template of nginx config file later.

## LICENSE
[GNU General Public License v3.0](https://github.com/SDUOJ/sduoj-web/blob/master/LICENSE)
