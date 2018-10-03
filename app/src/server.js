var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var portNum = 3591;
var mongoose = require('mongoose');
var mongoUrl = 'mongodb://localhost:27017/MEAN-Gulp';
mongoose.connect(mongoUrl);
var collectDBName = 'profil_pengguna';
var dataSchema = new mongoose.Schema({
    nama_lengkap: String,
    status_pegawai: String,
    lama_bekerja: String
}, { collection: collectDBName });

var dataDb = mongoose.model('dataDb', dataSchema);
dataDb.find(function receiveData(err, data) {
    // console.log(err);
    console.log(JSON.stringify(data, null, 4));
});

// app.use("/public", express.static(path.join(__dirname, '../')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
    next();
});

app.get('/api/form/:id', function (req, res) {
    req.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    dataDb.findById(req.params.id, function (err, data) {

    });
});

function addData(namaLengkap, statusPegawai, lamaBekerja) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log('addData dengan Nama Lengkap    : ' + namaLengkap);
    console.log('addData dengan Status Pegawai  : ' + statusPegawai);
    console.log('addData dengan Lama Bekerja    : ' + lamaBekerja);
    var dataDb = new dataDb({ nama_lengkap: namaLengkap, status_pegawai: statusPegawai, lama_bekerja: lamaBekerja })
    dataDb.save();
}

app.post('api/form', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log('app.post() --> Create');
    var dataDb = new dataDb({ nama_lengkap: req.body.namaLengkap, status_pegawai: req.body.statusPegawai, lama_bekerja: req.body.lamaBekerja });
    dataDb.save();
    console.log('req.body.namaLengkap : ' + req.body.namaLengkap);
    console.log('req.body.statusPegawai : ' + req.body.statusPegawai);
    console.log('req.body.lamaBekerja : ' + req.body.lamaBekerja);
});

app.get('/api/form', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log('app.get() -> Read');
    dataDb.find(function (err, data) {
        res.json(data);
        console.log(data);
    });
});

app.put('/api/form/:id', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log('FU app.put() -> Update with id = ' + req.params.id);
    if (!req.body) {
        return res.send(400);
    }
    else {
        //console.log('req.body = '+ JSON.stringify(req));
        console.log('req.body = ' + JSON.stringify(req.body));
    }



    //https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
    dataDb.findById(req.params.id, function (err, form) {
        if (err) {
            console.log('err');
        }
        else {
            console.log('name = ' + req.body.name + ', created = ' + req.body.created);
            form.name = req.body.name;
            form.save();
            dataDb.find(function (err, data) {
                res.json(data);
            });
        }
    });
});

app.delete('/api/form/:id', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log('app.delete() -> Delete with id = ' + req.params.id);
    dataDb.remove({ _id: req.params.id }, function (err, doc) {
        dataDb.find(function (err, data) {
            res.json(data);
        });
    });
});

app.listen(portNum);
console.log('server is listen on port ' + portNum);
console.log('Use browser to open http://<hostname>:' + portNum + '/public/');
