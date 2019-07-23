var express = require('express'),
    router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
var passwordHash = require('password-hash');
var crypto = require('crypto-js');

const upload = multer({
    dest: "public/uploads/profile"
});

router

    .get('/byUsername', function (req, res) {

        var query = "SELECT * FROM user where username = ?"
        con.query(query, req.headers.username, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });

    })

    .post('/login', function (req, res) {



        var query = "SELECT * FROM user where username = ?"
        con.query(query, req.body.username, function (err, result, fields) {
            if (err) throw err;
            
            if(result[0]){
                var ciphertext = crypto.HmacSHA1(req.body.password, result[0].hash).toString();

                if(ciphertext == result[0].password){
                    res.send(result[0]);
                }else{
                    res.send(null);
                }
            }else{
                res.send(null);
            }
            
        });

    })

    .post('/getUser', function (req, res) {

        var query = "SELECT * FROM user where id_user = ?"
        con.query(query, [req.body.id], function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });

    })

    .post('/follow', function (req, res) {
        var query = "SELECT * FROM seguir where id_seguidor = ? and id_seguido = ?"
        con.query(query, [req.body.id_seguidor,req.body.id_seguido], function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });

    })

    .post('/createFollower', function (req, res) {
        var follow = {
            'id_seguidor': req.body.id_seguidor,
            'id_seguido': req.body.id_seguido
        }

        var query = "INSERT INTO seguir SET ?"
        con.query(query, follow, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    })

    .delete('/unFollow',function (req, res) {
        var query = "DELETE FROM seguir where id_seguidor = ? and id_seguido = ?"
        con.query(query, [req.body.id_seguidor,req.body.id_seguido], function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    })

    .post('/getFollowers', function (req, res) {
        var query = "SELECT id_user,username,foto FROM user,seguir WHERE user.id_user = seguir.id_seguidor AND id_seguido = ?"
        con.query(query, [req.body.id_user], function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });

    })

    .post('/getFollowing', function (req, res) {
        var query = "SELECT id_user,username,foto FROM user,seguir WHERE user.id_user = seguir.id_seguido AND id_seguidor = ?"
        con.query(query, [req.body.id_user], function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });

    })

    .post('/getUserByName', function (req, res) {

        var query = "SELECT * FROM user where username = ?"
        con.query(query, [req.body.username], function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });

    })

    .post('/search', function (req, res) {

        var query = "SELECT * FROM user where username like '%" + req.body.texto + "%' or nome like '%" + req.body.texto + "%'"
        con.query(query, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });

    })

    .post('/insertUser', function (req, res) {

        var date = new Date();
        var dataregis = date.toLocaleString();
        var hash = Math.random().toString(36).substring(2);

        var ciphertext = crypto.HmacSHA1(req.body.password, hash).toString();

        var user = {
            'e-mail': req.body.email,
            'password': ciphertext,
            'hash': hash,
            'data_nascimento': "null",
            'data_registo': dataregis,
            'nome': req.body.nome,
            'foto': "null",
            'username': req.body.username
        }


        var query = "INSERT INTO user SET ?"
        con.query(query, user, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });

    })

    .put('/editUser', function (req, res) {


        var user = req.body.id_user;
        console.log(user)
        var query = "UPDATE user SET `e-mail`=?, data_nascimento=?,nome=?,username=? where id_user = ?"
        con.query(query, [req.body.email,req.body.datanascimento, req.body.nome,req.body.username,user], function (err, result, fields) {
            if (err) throw err;
            console.log(result)
            res.send(result);
        });

    })


    .post(
        "/uploadProfilePic",
        upload.single("file"),
        (req, res) => {

            var query = "SELECT * FROM user where username = ?"
            con.query(query, req.body.user, function (err, result, fields) {
                if (err) throw err;
                const tempPath = req.file.path;
                const targetPath = path.join(__dirname, "../public/uploads/profile/" + result[0].hash +".png");
    
                fs.rename(tempPath, targetPath, err => {
                    if (err) return console.log(err);
    
                    res
                        .status(200)
                        .contentType("text/plain")
                        .redirect(req.headers.origin)
                });
            });



        }
    );

module.exports = router;