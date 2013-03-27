var hereYourList = function(data,socket){
  console.log("here")
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
            socket.emit("getChampionship");
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
}

var hereChampionshipModalData = function(teams){
  $("#selectTeams tr").remove();
  for(var i=0;i<teams.length;i++)
    $("#selectTeams").append('<tr><td><input value="'+teams[i].id+'" class="selectedTeamsSeason" type="checkbox"></td><td> '+teams[i].name+"</td></tr>");
}

var teamAdded = function(){
  $("#teamName").val("");
  $("#addTeam-return>img").attr("src","/ok_icon.png")
  $("#addTeam-return>span").html("Team added")
  $("#addTeam-return").fadeIn().delay(1000).fadeOut();
}

var seasonCreated = function(){
  $("#createSeasonModal").modal("hide");
}

var hereTheScores = function(data,socket){
  /*Il server restituisce tutta la stagione selezionata.
   * Viene creata una ulteriore select che racchiude il numero di giornate.
   * Si seleziona la giornata, vengono visualizzate le partite di quella giornata*/
  $("#selectMatchdayContainer").remove();
  $("#accordions div,#accordions h3").remove();
  var p = 0;
  var matchdays = new Array();
  for(var i=0;i<data.length;i++){
    if(matchdays.indexOf(data[i].matchdays_number) == -1){
      matchdays[p] = data[i].matchdays_number;
      p++;
    }
  }
  var select = '<div id="selectMatchdayContainer"><h3>Matchdays</h3><select id="selectMatchday"><option value="-1">Select Matchday</option>';
  for(var i=matchdays.length;i>=0;i--){
    select = select + '<option value="'+matchdays[i]+'">Matchday '+matchdays[i]+'</option>';
  }
  select = select +'</select></div>';
  $("#selectSeason").after(select);
  $("#selectMatchday").change(function(){
    socket.emit("getMatchday",{
      matchday_number: $("#selectMatchday").val(),
      season: data[0].matchdays_season
    });
  });
}
var selectMatchdayChange = function(data,socket){
  console.log(data)
  var scores = data[1];
  data = data[0];
  var id = $("#selectMatchday").val();
  $("#accordions div,#accordions h3,button").remove();
  $("#accordions").append('<h3>Scores</h3><button class="activateSeasonBtn" id="activateSeasonBtn'+id+'_'+data[0].matchdays_season+'" class="btn">End matchday</button><br/><br/>')
  $(".activateSeasonBtn").click(function(){
	  var id = $(this).attr("id").replace("activateSeasonBtn","").split("_");
	  var data = new Object;
	  data.number = id[0];
	  data.season = id[1];
	  socket.emit("activateMatchday",data);
	  
  });

  var accordion = '<div class="row accordion" id="accordion££accordion_nr££"><div class="span8 well accordion-group"><div class="row accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion££accordion_nr££" href="#collapse££accordion_nr££"><div class="span1 scudo"><img src="/££home_team_shield££.png" alt=""/></div><p class="span2 team">££home_team££</p><p class="span2 team" id="scores">££score££</p><p class="span2 team">££away_team££</p><div class="span1 scudo"><img src="/££away_team_shield££.png" alt=""/></div></a></div><div id="collapse££accordion_nr££" class="collapsed accordion-body collapse in span8"><div class="accordion-inner" id="inner_accordion_££accordion_nr££"><div id="goal££accordion_nr££_££index££"><div class="home_team_scores floatl"><div><div class="floatl"><input id="home_team_time££accordion_nr££_££index££" class="time" type="text"></div><div class="floatl"><input id="home_team_player££accordion_nr££_££index££" class="player" type="text"></div><div class="clr"></div></div></div><div class="floatl separator_scores"></div><div class="away_team_scores floatl"><div><div class="floatl"><input id="away_team_time££accordion_nr££_££index££" class="time" type="text"></div><div class="floatl"><input id="away_team_player££accordion_nr££_££index££" class="player" type="text"></div><div class="clr"></div></div></div><div class="clr"></div></div></div></div></div></div>';
  var score_input = ' <div id="scoreid££scoreid££" ><div class="floatl"><input id="££home_away££_team_time££accordion_nr££_££index££" class="time" type="text"></div><div class="floatl"><input id="££home_away££_team_player££accordion_nr££_££index££" class="player" type="text"></div><div class="clr"></div></div>';
  
  var tmp,score_tmp;
  for(var i=0;i<data.length;i++){
    if(data[i].matchdays_number == id && data[i].away_team != 0 && data[i].home_team != 0){
      tmp = accordion;
      tmp = tmp.replace(/\£\£accordion_nr\£\£/g,data[i].id);
      tmp = tmp.replace("££home_team££",data[i].home_team_name);
      tmp = tmp.replace("££away_team££",data[i].away_team_name);
      tmp = tmp.replace("££home_team_shield££",data[i].home_team);
      tmp = tmp.replace("££away_team_shield££",data[i].away_team);
      
      tmp = tmp.replace(/\£\£index\£\£/g,"0");

      var home_score = 0,away_score = 0;
      var index = 1; // mi serve per contare l'index dei gol segnati in una
						// certa partita e creare le caselle di input
      var scores_array = new Array();
      for(var j=0;j<scores.length;j++){
        score_tmp = score_input;
        console.log(score_tmp);
        if(scores[j].id == data[i].id){
          if(scores[j].score_flag == 0)
            home_score++;
          else 
            away_score++;
          
          score_tmp = score_tmp.replace(/\£\£accordion_nr\£\£/g,data[i].id);
          score_tmp = score_tmp.replace(/\£\£index\£\£/g,index);
          score_tmp = score_tmp.replace("££scoreid££",scores[j].score_id);
          if(scores[j].score_flag == "0")
            score_tmp = score_tmp.replace(/\£\£home\_away\£\£/g,"home");
          else
            score_tmp = score_tmp.replace(/\£\£home\_away\£\£/g,"away");
          
          scores_array[index] = new Array();
          scores_array[index]['template'] = score_tmp;
          scores_array[index]['time'] = scores[j].time;
          scores_array[index]['player'] = scores[j].player;
          scores_array[index]['home_away'] = scores[j].score_flag;
          index++;
        }
      }
      tmp = tmp.replace("££score££",home_score+" - "+away_score);
      tmp = tmp.replace("££score££",home_score+" - "+away_score);
      $("#accordions").append(tmp);
      for(var k=1;k<scores_array.length;k++){
            if(scores_array[k]['time'] == 0)
              scores_array[k]['time'] = "";
        if($("#goal"+data[i].id+"_"+k).attr("id") != "goal"+data[i].id+"_"+k)
          if(scores_array[k]['home_away'] == "0"){
            $("#inner_accordion_"+data[i].id+" .home_team_scores").prepend(scores_array[k]['template']);
            if(scores_array[k]['time'] == 0)
              scores_array[k]['time'] = "";
            $("#home_team_time"+data[i].id+"_"+k).val(scores_array[k]['time']);
            $("#home_team_player"+data[i].id+"_"+k).val(scores_array[k]['player']);
          }
          else{
            $("#inner_accordion_"+data[i].id+" .away_team_scores").prepend(scores_array[k]['template']);
            $("#away_team_time"+data[i].id+"_"+k).val(scores_array[k]['time']);
            $("#away_team_player"+data[i].id+"_"+k).val(scores_array[k]['player']);
          }
      }
    }
  }
  // a questo punto attivo le input text per l'aggiornamento
  $(".player,.time").keypress(function(ev){
    var data = new Object;
    var flag;
    var id = $(this).attr("id");
    var matchid = id.replace("away_team_time","").replace("away_team_player","").replace("home_team_player","").replace("home_team_time","").replace(/\_[0-9]/,"");
    console.log(matchid)
    if(ev.which == 13){
      // se è il primo, invia un addScore
      if($(this).attr("id").match(/^(away|home)\_team\_(player|time)+[0-9]+\_0$/)){
        console.log($(this).attr("id"))
        if(id.match(/away/)){
          data.values = [
          ["flag","1"],
          ["player",$("#away_team_player"+matchid+"_0").val()],
          ["time",$("#away_team_time"+matchid+"_0").val()],
          ["match_id",matchid+""]
          ];
        }
        else {
          data.values = [
          ["flag","0"],
          ["player",$("#home_team_player"+matchid+"_0").val()],
          ["time",$("#home_team_time"+matchid+"_0").val()],
          ["match_id",matchid+""]
          ];
        }
        console.log(data)
        data.matchid = matchid;
        socket.emit("addScore",data);
      }
      // se non è il primo, invia un update/delete
      else{
        var scoreid = $(this).parent().parent().attr("id").replace("scoreid","");
        var last_part = id.replace("away_team_time","").replace("away_team_player","").replace("home_team_player","").replace("home_team_time","");
        data.scoreid = scoreid;
        data.matchid = matchid;
        var ha = "home";
        if(id.match(/away/)){
          ha = "away";
        }
        var player = $("#"+ha+"_team_player"+last_part).val();
        var time = $("#"+ha+"_team_time"+last_part).val();
        if((player == "" && time=="") || (player == undefined && time == undefined)){
          socket.emit("deleteScore",data);
        }
        else{
          data.player = false;
          data.time = false;
          if(player != undefined && player != "")
            data.player = player;
          if(time != undefined && time != "")
            data.time = time;
          socket.emit("updateScore",data);
        }
      }
      
    }
  });
}