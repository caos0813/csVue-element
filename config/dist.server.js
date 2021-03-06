var express = require('express');
var app = express();
console.log(process.env.NODE_ENV)
//指定启动服务器到哪个文件夹，我这边指的是dist文件夹
app.use(express.static(`./${process.env.NODE_ENV}`))
//监听端口为8080
var server = app.listen(8080,function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
})
