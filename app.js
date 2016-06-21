/**
 *
 * 项目名称：Node_Express
 * 类描述：
 * 创建人：N.Sun
 * 创建时间：16/6/20 下午12:53
 * 修改人：N.Sun
 * 修改时间：16/6/20 下午12:53
 * 修改备注：
 * @version
 *
 */
var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
    res.render('home');
});

var fortunes = [
    'meizu',
    'xiaomi',
    'huawei',
    'oppo',
    'lenovo',
    'huasuo',
    'apple',
    'htc'
];
app.get('/about', function (req, res) {
    var randomFortunes = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortunes: randomFortunes});
});

app.use(function (err, req, res) {
    res.status(404);
    res.render('404', {
        message: 'http status 404',
        err: err
    });
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500', {
        message: 'http status 500',
        err: err
    });
});

app.listen(app.get('port'), function (err) {
    if (err) {
        console.log("server is down");
    } else {
        console.log("server is listening to " + app.get('port'));
    }
});
