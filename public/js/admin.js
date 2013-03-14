//Abilita le tab
$('#mytab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
  var which = $(this).attr("href").replace("#","");
  console.log(which)

  var socket = io.connect('http://localhost');
  socket.emit('getList', {
    list: which
  });
  socket.on('hereYourList', function (data) {
    var table = data.table;
    var rows = data.rows;
    switch(table){
      case "teams":
        $("#teamsTable tr").remove()
        var row = "";
        for(var i=0;i<rows.length;i++){
          row='<tr><td>'+rows[i].name+'</td><td><a id=team-'+rows[i].id+' href="#deleteConfirmation" role="button" class="btn-mini btn-danger removeTeam" data-toggle="modal">Remove</a></td></tr>';
          $("#teamsTable").append(row);
        }
        $(".removeTeam").click(function(e){
          var id = $(this).attr("id").replace("team-","");
          var data = new Object;
          data.id = id;
          $("#removeTeam-confirmation").click(function(e){
            socket.emit("removeTeam",data);
            socket.on("teamRemoved",function(){
              $("#deleteConfirmation").modal("hide");
              socket.emit("getList",{
                list:"championship"
              });
            });
          });
        });
        
        
        break;
      case "matchdays"  :
        $("#selectSeason option").remove();
        $("#selectSeason").append('<option value="-1">Select the season</option>')
        var option = "";
        for(var i=0;i<rows.length;i++){
          option = '<option value="'+rows[i].season+'">'+rows[i].season+'</option>';
          $("#selectSeason").append(option);
        }
        break;
      default:
        break;
    }
    console.log(data);
  });
});

$(document).ready(function(){
  var socket = io.connect('http://localhost');
  $(".table tbody tr").css({
    cursor:"pointer"
  });
  $("#createSeason-btn").click(function(){
    socket.emit('getChampionshipModalData');
    socket.on("hereChampionshipModalData",function(teams){
      $("#selectTeams tr").remove();
      for(var i=0;i<teams.length;i++)
        $("#selectTeams").append('<tr><td><input value="'+teams[i].id+'" class="selectedTeamsSeason" type="checkbox"></td><td> '+teams[i].name+"</td></tr>");
    });
  });
  $("#createSeason").click(function(){
    console.log($("#seasonYear").val());
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
  
  socket.on("teamAdded",function(){
    socket.emit("getList",{
      list:"championship"
    });
    $("#teamName").val("");
    $("#addTeam-return>img").attr("src","/ok_icon.png")
    $("#addTeam-return>span").html("Team added")
    $("#addTeam-return").fadeIn().delay(1000).fadeOut();
    
  });
  
  socket.on("seasonCreated",function(){
    $("#createSeasonModal").modal("hide");
    socket.emit('getList', {
      list:"championship"
    });
  });
  
  $("#selectSeason").change(function(){
    //quì va l'emit dell'evento necessario a reperire le info e creare l'interfaccia 
    //necessarie alla modifica della stagione.
    socket.emit("getAllTheSeason",{
      season: $("#selectSeason").val()
    });
    socket.on("hereAllTheSeason",function(data){
      /*Il server restituisce tutta la stagione selezionata.
       * Viene creata una ulteriore select che racchiude il numero di giornate.
       * Si seleziona la giornata, vengono visualizzate le partite di quella giornata*/
      console.log(data);
      var accordion = '<h3>Scores</h3><div class="row accordion" id="accordion££accordion_nr££"><div class="span8 well accordion-group"><div class="row accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion££accordion_nr££" href="#collapse££accordion_nr££"><div class="span1 scudo"> <img src="/££home_team_shield££.png" alt="" /></div><p class="span2 team">££home_team££</p><p class="span2 team" id="scores">££score££</p><p class="span2 team">££away_team££</p><div class="span1 scudo"> <img src="/££away_team_shield££.png" alt="" /></div>			</a></div><div id="collapse££accordion_nr££" class="collapsed accordion-body collapse in span8"><div class="accordion-inner" id="inner_accordion_££accordion_nr££"><div class="floatl"><input id="home_team_time" class="time" type="text"></div><div class="floatl"><input id="home_team_player" class="player" type="text"></div><div class="floatl separator_scores"></div><div class="floatl"><input id="away_team_time" class="time" type="text"></div><div class="floatl "><input id="away_team_player" class="player" type="text"></div><div class="clr"></div></div></div></div></div>';
      var tmp;
      for(var i=0;i<data.length;i++){
        tmp = accordion;
        tmp = tmp.replace(/\£\£accordion_nr\£\£/g,data[i].id);
        tmp = tmp.replace("££home_team££",data[i].home_team_name);
        tmp = tmp.replace("££away_team££",data[i].away_team_name);
        tmp = tmp.replace("££home_team_shield££",data[i].home_team);
        tmp = tmp.replace("££away_team_shield££",data[i].away_team);
        $("#accordions").append(tmp);
      }
      });
  });
});
