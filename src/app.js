var promise = require('bluebird')
var option = {
    promiseLib: promise
};
var pgp = require('pg-promise')(option);
var conString = "postgres://postgres:root@localhost:5432/postgres"
var db = pgp(conString);
var path = require('path');
var express = require('express');
var bodyparser = require('body-parser')
// var router = express.Router();
var app = express();

app.use(bodyparser.urlencoded({ limit: '20mb', extended: true }))
app.use(bodyparser.json({ limit: '20mb', extended: true }))


app.use(express.static(path.join(__dirname, "pics")))
app.all('*', function (req, res, next) {

    res.header("Access-Control-Allow-Origin", '*');

    res.header("Access-Control-Allow-Headers", "Cache-Control,Pragma, Origin, Authorization, Content-Type, X-Requested-With");

    res.header("Access-Control-Allow-Methods", "*");

    return next();
});

app.set('port', process.env.PORT || 4536);

app.get('/getdetails', (req, res, next) => {
    db.any('select * from employee').then((data) => {
        res.send(data);
    })
})

app.get('/getbyid/:id', (req, res, next) => {
    var eid = req.params.id;
    db.any("select * from employee where id=$1", eid).then((data) => {
        res.send(data);
    })
})

app.get('/deleteemp/:id', (req, res, next) => {
    var eid = req.params.id;
    db.any("delete from employee where id=$1", eid).then((data) => {
        res.send(data);
    })
})

app.post('/adddetails', (req, res, next) => {
    var ename = req.body.ename;
    var dob = req.body.dob;
    var address = req.body.address;
    var role = req.body.role;
    var salary = req.body.salary;
    var experience = req.body.experience;
    db.any('insert into employee(ename,dob,address,role,salary,experience) values($1,$2,$3,$4,$5,$6)', [ename, dob, address, role, salary, experience]).then((data) => {
        res.send(data);
    })
})

app.post('/updateemp/', (req, res, next) => {
    var eid =req.body.id;
    var ename = req.body.ename;
    var dob = req.body.dob;
    var address = req.body.address;
    var role = req.body.role;
    var salary = req.body.salary;
    var experience = parseInt(req.body.experience);
    db.any('update employee set ename=$1,dob=$2,address=$3,role=$4,salary=$5,experience=$6 where id=$7', [ename,dob, address, role, salary, experience, eid]).then((data) => {
        res.send(data);
    })
})


app.listen(app.get('port'), (err) => {
    if (err) {
        console.log("server error..")
    }
    else {
        console.log("server is started...  http://localhost:" + app.get('port'))
    }
})