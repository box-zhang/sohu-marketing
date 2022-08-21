var express = require('express')
var app = express();

app.get('/xxx', function(req, res) {
    res.send('data数据')

})
app.listen(5632, function() {
    console.log("5632中间件已经在运行")

})