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
      case "championship":
        $("#teams tbody tr").remove()
        for(var i=0;i<rows.length;i++){
          table_row="<tr><td>"+rows[i].id+"</td><td>"+rows[i].name+"</td></tr>"
          $("#teams tbody ").append(table_row).css({
            cursor:"pointer"
          });
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
    socket.emit('getHowManyTeams');
    socket.on("hereHowManyTeams",function(nrTeams){
      console.log(nrTeams);
      $("#nrTeams").html(nrTeams[0].count)
    });
  });
  $("#createSeason").click(function(){
    socket.emit('createSeason', {
      list: $("#seasonYear").value()
    });
  });
  
});

//Unire matches, match days e teams in "gestisci campionato"
//si devono poter inserire le squadre, creare automaticamente la stagione e poter inserire delle accoppiate
//(gia create in automatico dal software), solo la giornata (numero, fuoricasa in casa e stagione). 
//Bisogna scegliere la stagione e sotto devono comparire le accoppiate.