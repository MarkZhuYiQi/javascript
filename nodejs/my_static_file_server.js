/**
 * Created by Administrator on 2016/9/26.
 */
var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'));

app.listen(8888);