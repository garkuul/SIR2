const express = require("express");
const io = require("socket.io")(http);
router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const upload = multer({
  dest: "public/uploads/posts"
});

router

  .get("/getAll/:id_user", function(req, res) {
    var query =
      "SELECT publicacao.id_publicacao,publicacao.data,descricao,publicacao.foto as fotopub," +
      "localizacao,user.foto as fotouser,user.username,COUNT(gosto.id_publicacao) as nr_gostos, SUM(gosto.id_user= ?) as hasGosto " +
      "FROM publicacao LEFT JOIN gosto on publicacao.id_publicacao = gosto.id_publicacao " +
      "LEFT JOIN user on publicacao.id_user=user.id_user WHERE publicacao.estado = 1 " +
      "and publicacao.id_user in (Select id_seguido from seguir where id_seguidor = ?) GROUP BY 1 ORDER BY publicacao.data DESC";
    con.query(query, [req.params.id_user, req.params.id_user], function(
      err,
      result,
      fields
    ) {
      if (err) throw err;
      res.send(result);
    });
  })

  .get("/getPostDetails/:id_user/:id_publicacao", function(req, res) {
    var query =
      "SELECT publicacao.id_publicacao,publicacao.data,descricao,publicacao.foto as fotopub,localizacao,user.foto as" +
      " fotouser,user.username,COUNT(gosto.id_publicacao) as nr_gostos, SUM(gosto.id_user= ?) as hasGosto FROM publicacao LEFT JOIN " +
      "gosto on publicacao.id_publicacao = gosto.id_publicacao LEFT JOIN user on publicacao.id_user=user.id_user WHERE " +
      "publicacao.id_publicacao=? GROUP BY 1 ORDER BY publicacao.data DESC";
    con.query(query, [req.params.id_user, req.params.id_publicacao], function(
      err,
      result,
      fields
    ) {
      if (err) throw err;
      res.send(result);
    });
  })

  .get("/getPostsUser/:id_user", function(req, res) {
    var query =
      "SELECT *,(SELECT COUNT(*) from comentario WHERE comentario.id_publicacao = publicacao.id_publicacao) as coments,(SELECT COUNT(*) FROM gosto WHERE gosto.id_publicacao = publicacao.id_publicacao) as gostos FROM (SELECT DISTINCT id_publicacao,foto as fotopub,descricao FROM publicacao WHERE id_user = ? ORDER BY data DESC) publicacao";
    con.query(query, req.params.id_user, function(err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  })

  .get("/getPostByUser/:id_publicacao/:id_user", function(req, res) {
    var query =
      "SELECT * from publicacao where id_publicacao = ? and id_user = ?";
    con.query(query, [req.params.id_publicacao, req.params.id_user], function(
      err,
      result,
      fields
    ) {
      if (err) throw err;
      res.send(result);
    });
  })

  .get("/getComments/:id_pub", function(req, res) {
    var query =
      "SELECT id_comentario,id_publicacao,comentario,username from comentario,user where comentario.id_user = user.id_user and id_publicacao = ?";
    con.query(query, req.params.id_pub, function(err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  })

  .get("/getLikes/:id_pub", function(req, res) {
    var query =
      "SELECT id_publicacao,username,user.foto,gosto.id_user from gosto,user WHERE gosto.id_user = user.id_user and id_publicacao = ?";
    con.query(query, req.params.id_pub, function(err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  })

  .post("/insertLike", function(req, res) {
    var like = {
      data: req.body.data,
      id_user: req.body.id_user,
      id_publicacao: req.body.id_publicacao
    };
    var query = "INSERT INTO gosto SET ?";
    con.query(query, like, function(err, result, fields) {
      if (err) throw err;
      res.send(result);
    });

    io.emit("like", {
      id_user: req.body.id_user,
      id_publicacao: req.body.id_publicacao
    });
  })

  .post("/insertComment", function(req, res) {
    var comment = {
      comentario: req.body.comentario,
      id_user: req.body.id_user,
      id_publicacao: req.body.id_publicacao
    };
    var query = "INSERT INTO comentario SET ?";
    con.query(query, comment, function(err, result, fields) {
      if (err) throw err;
      res.send(result);
    });

    io.emit("comment", {
      id_user: req.body.id_user,
      id_publicacao: req.body.id_publicacao,
      comentario: req.body.comentario
    });
  })

  .delete("/deleteLike", function(req, res) {
    var query = "DELETE FROM gosto where id_publicacao = ? and id_user = ?";
    con.query(query, [req.body.id_publicacao, req.body.id_user], function(
      err,
      result,
      fields
    ) {
      if (err) throw err;
      res.send(result);
    });
  })

  .post("/insertPost", function(req, res) {
    var hash = Math.random()
      .toString(36)
      .substring(2);

      var date = new Date();
      var dataregis = date.toLocaleString()

    var post = {
      descricao: req.body.descricao,
      data: dataregis,
      foto: req.body.foto,
      localizacao: req.body.localizacao,
      estado: 1,
      id_user: req.body.id_user
    };

    var query = "INSERT INTO publicacao SET ?";
    con.query(query, post, function(err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  })

  .post("/uploadPostPic", upload.single("file"), (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "../public/uploads/posts/" + req.body.foto + ".png");

    fs.rename(tempPath, targetPath, err => {
      if (err) return console.log(err);
      console.log(req.headers.origin);
      res
        .status(200)
        .contentType("text/plain")
        .redirect(req.headers.origin);
    });
  });

module.exports = router;
