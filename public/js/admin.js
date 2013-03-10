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
  })
});
