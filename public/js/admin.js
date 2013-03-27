$('#mytab a').click(function (e) {
  e.preventDefault();
  $(this).tab("show");
  var socket = io.connect('http://localhost');
  socket.emit('getChampionship');
});

$(document).ready(function(){
  var socket = io.connect('http://localhost');
  $('#mytab a').click(function (e) {
    e.preventDefault();
    socket.emit('getChampionship');
  });
  $(".table tbody tr").css({
    cursor:"pointer"
  });
  $("#createSeason-btn").click(function(){
    socket.emit('getChampionshipModalData');
  });
  $("#createSeason").click(function(){
    var l = $(".selectedTeamsSeason:checked");
    var list = new Array();
    for(var i=0;i<l.length;i++){
      list[i] = $(l[i]).val();
    }
    socket.emit('createSeason', {
      year: $("#seasonYear").val(),
      list: list
    });
  });
  $("#addTeam").click(function(e){
    var data = new Object;
    data.name = $("#teamName").val();
    socket.emit("addTeam",data);
  });
  $("#selectSeason").change(function(){
    //quì va l'emit dell'evento necessario a reperire le info e creare l'interfaccia 
    //necessarie alla modifica della stagione.
    socket.emit("getAllTheSeason",{
      season: $("#selectSeason").val()
    });
  });
});



//eventi
$(document).ready(function(){
  var socket = io.connect('http://localhost');
  socket.on('hereYourList', function (data) {
    hereYourList(data,socket);
  });
  socket.on("teamAdded",function(){
    socket.emit("getChampionship");
    teamAdded();
  });
  socket.on("seasonCreated",function(){
    socket.emit('getChampionship');
    seasonCreated();
  });
  socket.on("hereTheScores",function(data){
    hereTheScores(data,socket);
  });
  socket.on("hereChampionshipModalData",function(teams){
    hereChampionshipModalData(teams,socket);
  });
  // socket.on("updateScoresView",function(data){
  //   updateTheScores(data,socket);
  // });
  socket.on("selectMatchdayChange",function(data){
    selectMatchdayChange(data,socket);
  });
  socket.on("getMatchday",function(data){
    getMatchday(data,socket);
  });
  socket.on("hereSelectMatchdayChange",function(data){
    selectMatchdayChange(data,socket);
  });
  socket.on("updateScoresView",function(data){
    selectMatchdayChange(data,socket);
  });
});

//errors handling
$(document).ready(function(){
  var socket = io.connect('http://localhost');
  socket.on("errorOnSentData",function(data){
    console.log(data)
    switch(data.caller){
      case "createSeason":
        var group = $("#seasonYear").closest(".control-group");
        var error = "";
        if(data.year.message == "no_four_digits"){ //anno stagione errato
          $(group).addClass("error");
          error += "The year must be a four digits number<br/>";
        }
        if(data.year.message.match(/needed/)){ //anno stagione errato
          $(group).addClass("error");
          error += "You must insert an year<br/>";
        }
        if(data.list.message=="empty_list"){
          error += "You have to choose at least two teams<br/>";

        }
        $(group).find(".help-inline").html(error);
        break;
      default:
        break;
    }
    
  });
});