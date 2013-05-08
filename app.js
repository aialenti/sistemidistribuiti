
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
var argv = require('optimist').argv;

var app = express();

//Session store - Memorystore is OK for development only since it can't store persistent data
var MemStore = express.session.MemoryStore;

app.configure(function(){
  app.set('ip', process.env.OPENSHIFT_INTERNAL_IP || '127.0.0.1');
  app.set('port', process.env.OPENSHIFT_INTERNAL_PORT || 3001);
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

// How we pass our websocket URL to the client.
app.use('/varSocketURI', function(req, res) {
    var port = argv['websocket-port'];
    // Modify the URI only if we pass an optional connection port in.
    var socketURI = port ? ':'+port+'/' : '/';
    res.set('Content-Type', 'text/javascript');
    res.send('var socketURI="'+socketURI+'";');
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
    res.render('admin');
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

serv = http.createServer(app).listen(app.get('port'), app.get('ip'));

var io = require('socket.io').listen(serv);
var handshake = new Object;

//Socket.io authorization protocol
io.configure(function() {
  // Logging: 3 = debug (default), 1 = warn
  var logLevel = (argv["log-level"] === undefined) ? 3 : argv["log-level"];
  io.set("log level", logLevel);
  io.set('authorization', function (handshakeData, accept) {
    handshake = handshakeData;
    if (handshakeData.headers.cookie) {
      handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);
      handshakeData.sessionID = cookie.parse(handshakeData.cookie['express_sid'], 'secret');
      if (handshakeData.cookie['express_sid'] == handshakeData.sessionID) {
        return accept('Cookie is invalid.', false);
      }
    } else {
      return accept('No cookie transmitted.', false);
    } 
    accept(null, true);
  });
});

io.sockets.on('connection', function (socket) {
  socket.on('getChampionship', function (data) {
    controller.getChampionship(data,socket);
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
socket.on('updateTeam', function(data) {
		data.action = "edit";
		controller.manageTeam(data, socket);
	});
  socket.on('addScore', function (data) {
    data.action = "create";
    controller.manageScore(data,socket);
  });

  socket.on('deleteScore', function (data) {
    data.action = "delete";
    controller.manageScore(data,socket);
  });
  socket.on('updateScore', function (data) {
    data.action = "update";
    controller.manageScore(data,socket);
  });
  socket.on('removeTeam', function (data) {
    data.action = "delete";
    controller.manageTeam(data,socket);
  });
  socket.on('doLogin', function (data) {
    data.sessionid = cookie.parse(handshake.headers.cookie);
    controller.doLogin(data,socket);
  });
  socket.on("getAllTheSeason",function(data){
    controller.getAllTheSeason(data,socket);
  });
  socket.on("getMatchday",function(data){
    controller.getMatchday(data,socket);
  });
  socket.on("activateMatchday",function(data){
	  data.action="activate";
	    controller.manageMatchDay(data,socket);
	  });
  socket.on("deactivateMatchday",function(data){
	  data.action="deactivate";
	    controller.manageMatchDay(data,socket);
	  });
  socket.on("getSeasons",function (data) {
    controller.getSeasons(data,socket);
  });
socket.on("getTeamName",function(data){
		controller.getTeamName(data,socket);
	});
});

