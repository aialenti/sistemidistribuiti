
/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path');

var mysql      = require('mysql');
var controller = require("./node_modules/application/controller.js");


var app = express();

app.configure(function(){
  app.set('port', 3001);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// dispatcher

//Modifica, creazione e eliminazione di entità
app.get('/managematch', controller.manageMatch);
app.get('/managematchday', controller.manageMatchDay);
app.get('/managescore', controller.manageScore);
app.get('/manageteam', controller.manageTeam);




app.get("/",controller.getList)

//Home page
app.get('/', controller.getIndex);
//Login
app.get('/login', controller.doLogin);
app.get('/doLogin', controller.doLogin);
//Creazione utente
app.get('/newUser', controller.createNewUser);

//Accesso alla pagina amministratore
app.get('/admin',controller.getAdminPage);

// dispatching public files (css, js, imgs) requests
app.get('/*.(js)', function(req, res){
  res.sendfile("./public/js"+req.url);
});
app.get('/*.(css)', function(req, res){
  res.sendfile("./public/stylesheets"+req.url);
});
app.get('/*.(jpg|png)', function(req, res){
  res.sendfile("./public/img"+req.url);
});


serv = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(serv);

//Reperimento delle informazioni sul database

io.sockets.on('connection', function (socket) {
  socket.on('getList', function (data) {
    controller.getList(data,socket);
  });
  socket.on('createSeason', function (data) {
    controller.createSeason(data,socket);
  });
  socket.on('getChampionshipModalData', function (data) {
    controller.getChampionshipModalData(data,socket);
  });
  socket.on('addTeam', function (data) {
    data.action = "create";
    controller.manageTeam(data,socket);
  });
  socket.on('removeTeam', function (data) {
    data.action = "delete";
    console.log(data)
    controller.manageTeam(data,socket);
  });
});

