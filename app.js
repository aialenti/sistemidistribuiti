
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
var cookie = require("cookie");

var app = express();

//Session store - Memorystore is OK for development only since it can't store persistent data
var MemStore = express.session.MemoryStore;

app.configure(function(){
  app.set('port', 3001);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.cookieParser());  
  app.use(express.session({secret: 'secret', key: 'express_sid', store: MemStore({reapInterval: 60000 * 10})}));
  app.use(app.router);
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

//Home page
app.get('/', function(req,res){
  res.render('matchview');
});

//Creazione utente
app.get('/newUser', controller.createNewUser);

//Accesso alla pagina amministratore
app.get('/admin', function(req,res) {
  //Verifica autorizzazione
  var auth = controller.authorize(req.cookies.express_sid);
  if (auth)
    controller.getAdminPage(req,res);
  else
    res.redirect('/');
});

// dispatching public files (css, js, imgs) requests
app.get('/*.(js)', function(req, res){
  res.sendfile("./public/js"+req.url);
});
app.get('/*.(css)', function(req, res){
  res.sendfile("./public/stylesheets"+req.url);
});
app.get('/*.(jpg|png|gif)', function(req, res){
  res.sendfile("./public/img"+req.url);
});


serv = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(serv);
var handshake = new Object;

//Socket.io authorization protocol
io.configure(function() {
  io.set('authorization', function (handshakeData, accept) {
    handshake = handshakeData;
    if (handshakeData.headers.cookie) {
      handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);
      handshakeData.sessionID = cookie.parse(handshakeData.cookie['express_sid'], 'secret');
      if (handshakeData.cookie['express_sid'] == handshakeData.sessionID) {
        return accept('Cookie is invalid.', false);
        console.log("****AUTH****");
      }
    } else {
      return accept('No cookie transmitted.', false);
    } 
    accept(null, true);
    console.log("----AUTHEND-- "+ handshakeData.headers.cookie);
  });
});

io.of('/admin').authorization(function (handshakeData, callback) {
  console.log("ACCESSING NAMESPACE /admin");
  console.dir(handshakeData);
  handshakeData.foo = 'baz';
  callback(null, true);
}).on('connection', function (socket) {
  console.dir(socket.handshake.foo);
});

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
  socket.on('doLogin', function (data) {
    data.sessionid = cookie.parse(handshake.headers.cookie);
    console.log(data.sessionid.express_sid);
    //controller.doLogin(handshakeData.cookie,data,socket);
    controller.doLogin(data,socket);
  });
  socket.on("getAllTheSeason",function(data){
    controller.getAllTheSeason(data.season)
  });
});

