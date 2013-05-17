//replace '/' or seriealive-ffander.rhcloud.com with localhost for local testing

for (var i=0; i<10; i++) {
	$('#collapse'+i).collapse("hide");
}

$(document).ready(function(){

	var socket = io.connect(socketURI);
	var seasons = [];

	socket.emit("getSeasons");
	socket.on("hereSeasonsList", function (data) {
		for (var i=0; i<data.length; i++) {
			var datas = {
				season: data[i].season
			};
			$('#selectSeason')
				.append($('<option>', { "value" : datas.season })
					.text(datas.season + '/' + (datas.season+1)));
			seasons.push(datas.season);
			console.log(seasons);
		};
	});

	socket.emit("getLatestMatch");

	//$(window).load(function() { $("#selectSeason").trigger("change", seasons[0]) });
	window.setTimeout(function() {
		$("#selectSeason").trigger("change", seasons[0]);
	}, 300);
	
	var matchesdata;
	var days = [];

	$("#selectSeason").change(function(e,d){
		d = d || $(this).val();
		socket.emit("getAllTheSeason",{
			//season: $("#selectSeason").val()
			season: d
		});
		socket.on("hereTheScores",function(data){
			matchesdata = data; 
			$("#selectDay").empty();
			var insertedDays = [];
			var teams = [];
			insertedDays.push({ day: "-1", flag: "-1"});
			for (var i=0; i<matchesdata.length; i++) {
				var talready = false;
				var team = matchesdata[i].home_team;
				for (var j=0; j<teams.length; j++) {
					if (teams[j] == team)
						talready = true;
				}
				if (!talready)
					teams.push(team);
			}
			for (var i=0; i<matchesdata.length; i++) {
				var already = false;
				var datas = {
					day: matchesdata[i].matchdays_number,
					flag: matchesdata[i].matchdays_flag,
				};
				if (matchesdata[i].past != 0) {
					for (var j=0; j<insertedDays.length; j++) {
						if (insertedDays[j].day == datas.day) {
							if (insertedDays[j].flag == datas.flag) {
								already = true; 
							}
						}
					}
					if (!already) {
						insertedDays.push({day: datas.day, flag: datas.flag});
						days.push(datas.day);
						dayd = datas.day;
						var leg = ((datas.flag === 0) ? "Andata" : "Ritorno");
						$('#selectDay')
						.append($('<option>', { "value" : datas.day+"-"+datas.flag })
							.text((dayd + 1) + "° Giornata - " + leg));
					} 
				}//h
			};
		});
	});

	//$(window).load(function() { $("#selectDay").trigger("change", {s:2035, d:4}) });
	window.setTimeout(function() {
		$("#selectDay").trigger("change", {s:seasons[0], d:days[0]});
		console.log("hhh2+++ "+days[0]); 
	}, 700);

	$("#selectDay").change(function(e,p){
		//console.log(p.d+" rrrrrr "+$(this).val() + " llll "+p.s);
		if (p != undefined) {
			d = p.d;
			s = p.s;
		}
		else {
			d = $(this).val();
			s = $("#selectSeason").val();
		}
		//console.log("~~~ " + d + " ~~~~ " + s);
		//var day = $("#selectDay").val();
		//var seasonn = $("#selectSeason").val();
		socket.emit("getMatchday", {
			//matchday_number: day.substring(0,1),
			//season: seasonn
			matchday_number: d,
			season: s
		})
		socket.on("hereSelectMatchdayChange", function(data){
			console.log("DATALENGTH---"+data[0].length);
			var matcheslist = [];
			for (var i=0; i<data[0].length; i++) {
				var match = new Object();
				match.id = data[0][i].id;
				match.home_team = data[0][i].home_team;
				match.away_team = data[0][i].away_team;
				match.home_team_name = data[0][i].home_team_name;
				match.away_team_name = data[0][i].away_team_name;
				match.goals = [];
				for (var n=0; n<data[1].length; n++) {
					if (data[1][n].id === match.id) {
						goal = new Object();
						goal.time = data[1][n].time;
						goal.player = data[1][n].player;
						goal.score_id = data[1][n].score_id;
						goal.score_flag = data[1][n].score_flag;
						match.goals.push(goal);
					}
				}
				matcheslist.push(match);
			}
			$(".container").empty();
			for (var j=0; j<matcheslist.length; j++) {
				$(".container").append('<div class="row accordion" id="accordion'+j+'"></div>');
				$("#accordion"+j).append('<div class="dsowag span10 offset1 well accordion-group" id="dsowag'+j+'" matchid="'+matcheslist[j].id+'"></div>');
				$("#dsowag"+j).append('<div class="drah row accordion-heading clickable" id="drah'+j+'"></div');
				$("#drah"+j).append('<a class="accordion-toggle" id="toggle'+j+'" data-toggle="collapse" data-parent="#accordion'+j+'" href="#collapse'+j+'"></a>');
				var d = createMatch(matcheslist[j],j);
				$("#toggle"+j).append(d.d1);
				$("#dsowag"+j).append('<div id="collapse'+j+'" class="collapsed accordion-body collapse in span10"></div>');
				for (var k=0; k<d.d2.length; k++) {
					$("#collapse"+j).append(d.d2[k]);
				}
			}
			for (var i=0; i<10; i++) {
				$('#collapse'+i).collapse("hide");
			}
		})
	});

	socket.on("updateScoresView", function(data){
		console.log("DATA!!!!!!"+data);
		var l = data.length;
		console.log("L è: "+l+", data è: "+data[l-1]+" "+data[l-2]);
		if ($("#selectSeason").val() == data[0][0].matchdays_season)
			console.log("season ok");
			console.log(data[l-1]+"-----v-----"+$("#selectDay").val().substring(0,1));
			if ($("#selectDay").val().substring(0,1) == data[l-1]) {
				console.log("$('div[matchid='"+data[l-2]+"']')==="+$('div[matchid="'+data[l-2]+'"]').html());
				console.log(data[1][0].time + "oooo" + data[1][0].player);
				var id = $('div[matchid="'+data[l-2]+'"]').attr('id').substring(6,7);
				var len = $("#collapse"+id).children().length; //numero di righe
				var newid = id.toString() + len;
				var homescore = 0;
				var awayscore = 0;
				for (var i=1; i<data[1].length; i++) {
					console.log("FLAG "+data[1][i].score_flag+"///"+data[1][i].id+"///"+data[l-2]);
					if (data[1][i].id == data[l-2]) {
						if (data[1][i].score_flag === 0)
							homescore++;
						else
							awayscore++;
					}
				}
				if (homescore > awayscore) {
					if (data[1][0].score_flag == 1) {
						var count = 0;
						for (var j=0; j<len; j++) {
							if ($("#row"+id+j).attr("rowcomplete") == "yes")
								count++;
						}
						console.log("COUNT+"+count);
						$("#awayscore"+id+count).text(data[1][0].time + "\' " + data[1][0].player);
					}
					else {
						$("#collapse"+id).append('<div id="row'+id+len+'" class="row accordion-inner" rowcomplete="no"><div class="span1"></div><div id="homescore'+id+len+'" class="span3 offset1 score">'+data[1][0].time+'\' '+data[1][0].player+'</div><div class="span2 score"></div><div id="awayscore'+id+len+'" class="span3 offset2 score"> </div><div class="span1"></div></div>');
					}
				}
				else if (awayscore > homescore) {
					if (data[1][0].score_flag == 0) {
						var count = 0;
						for (var j=0; j<len; j++) {
							if ($("#row"+id+j).attr("rowcomplete") == "yes")
								count++;
						}
						console.log("COUNT+"+count);
						$("#homescore"+id+count).text(data[1][0].time + "\' " + data[1][0].player);
					}
					else {
						$("#collapse"+id).append('<div id="row'+id+len+'" class="row accordion-inner" rowcomplete="no"><div class="span1"></div><div id="homescore'+id+len+'" class="span3 offset1 score"> </div><div class="span2 score"></div><div id="awayscore'+id+len+'" class="span3 offset2 score">'+data[1][0].time+'\' '+data[1][0].player+'</div><div class="span1"></div></div>');
					}
				}
				else {
					if (data[1][0].score_flag === 0) {
						$("#collapse"+id).append('<div id="row'+newid+'" class="row accordion-inner" rowcomplete="no"><div class="span1"></div><div id="homescore'+newid+'" class="span3 offset1 score">'+data[1][0].time+'\' '+data[1][0].player+'</div><div class="span2 score"></div><div id="awayscore'+newid+'" class="span3 offset2 score"> </div><div class="span1"></div></div>');
					}
					else {
						$("#collapse"+id).append('<div id="row'+newid+'" class="row accordion-inner" rowcomplete="no"><div class="span1"></div><div id="homescore'+newid+'" class="span3 offset1 score"> </div><div class="span2 score"></div><div id="awayscore'+newid+'" class="span3 offset2 score">'+data[1][0].time+'\' '+data[1][0].player+'</div><div class="span1"></div></div>');
					}

				}
				if (data[1][0].score_flag == 0)
					homescore++;
				else
					awayscore++;
				$('p[id="match'+id+'"]').text(homescore+" - "+awayscore);
				$('#drah'+id).addClass('animated flash');
			}
	});

	//NOTA IMPORTANTE:
	//Questa implementazione prevede che i risultati siano aggiornati UNO ALLA VOLTA e IN ORDINE TEMPORALE 
	//(ovvero "seguendo le partite", ogni volta che c'è un gol si aggiorna, supponendo che tutte le partite della
	//stessa giornata comincino e finiscano alla stessa ora! Se no è un casino!)Questo perché controller.js
	//restituisce le score ordinate per "time" (minuto del gol).
	//Se si vuole mettere risultati di giornate vecchie invece non è un problema, tanto la view
	//viene costruita correttamente ad ogni richiesta

	$("#loginform").submit(function() {

		$("#loginerror").css("display", "none");
		$("#login").css("display", "none");
		var user = $("#user").val();
		var password = $("#password").val();
		
		socket.emit("doLogin", {
			"user": user,
			"password": password
		});
		
		$("#loading").css("display", "block");
		
		socket.on('loginerror', function (data) {
			console.log(data);
			$("#loading").css("display", "none");
			$("#loginerror").css("display", "block");
			$("#loginerror").addClass("alert alert-error");
			$("#loginerror").html(data);
			$("#login").css("display", "block");		
		});
		
		socket.on('successfullogin', function (data) {
			console.log(data);
			window.location.replace("/admin");
		})
	});

	$(document).on('click','.clickable',function() {
    	var idd = this.id;
    	$('div[id="'+idd+'"]').removeClass("animated flash");
	});

});

var createMatch = function(match,number) {
	var homeGoals = [];
	var awayGoals = [];
	for (var l=0; l<match.goals.length; l++) {
		if (match.goals[l].score_flag === 0)
			homeGoals.push(match.goals[l]);
		else
			awayGoals.push(match.goals[l]);
	}
	homeGoals.sort(function(a,b) {return (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0);} );
	awayGoals.sort(function(a,b) {return (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0);} );
	divs = new Object();
	divs.d1 = '<div class="span1 scudo"> <img src="/'+match.home_team_name+'.png" alt="" /></div><p class="span3 team">'+match.home_team_name+'</p><p id="match'+number+'" class="span2 team">'+homeGoals.length+' - '+awayGoals.length+'</p><p class="span3 team">'+match.away_team_name+'</p><div class="span1 scudo"> <img src="/'+match.away_team_name+'.png" alt="" /></div>'
	var d2 = [];
	if (homeGoals.length > awayGoals.length) {
		var diff = homeGoals.length - awayGoals.length;
		var o = 0;
		for (o; o<awayGoals.length; o++) {
			var dd = '<div class="row accordion-inner" id="row'+number+o+'" rowcomplete="yes"><div class="span1"></div><div id="homescore'+number+o+'" class="span3 offset1 score">'+homeGoals[o].time+'\' '+homeGoals[o].player+'</div><div class="span2 score"></div><div id="awayscore'+number+o+'" class="span3 offset2 score">'+awayGoals[o].time+'\' '+awayGoals[o].player+'</div><div class="span1"></div></div>';
			d2.push(dd);
		}
		for (o; o<homeGoals.length; o++) {
			var dd = '<div class="row accordion-inner" id="row'+number+o+'" rowcomplete="no"><div class="span1"></div><div id="homescore'+number+o+'" class="span3 offset1 score">'+homeGoals[o].time+'\' '+homeGoals[o].player+'</div><div class="span2 score"></div><div id="awayscore'+number+o+'" class="span3 offset2 score"> </div><div class="span1"></div></div>';
			d2.push(dd);
		}
	}
	else if (homeGoals.length < awayGoals.length) {
		var diff = awayGoals.length - homeGoals.length;
		var o = 0;
		for (o; o<homeGoals.length; o++) {
			var dd = '<div class="row accordion-inner" id="row'+number+o+'" rowcomplete="yes"><div class="span1"></div><div id="homescore'+number+o+'" class="span3 offset1 score">'+homeGoals[o].time+'\' '+homeGoals[o].player+'</div><div class="span2 score"></div><div id="awayscore'+number+o+'" class="span3 offset2 score">'+awayGoals[o].time+'\' '+awayGoals[o].player+'</div><div class="span1"></div></div>';
			d2.push(dd);
		}
		for (o; o<awayGoals.length; o++) {
			var dd = '<div class="row accordion-inner" id="row'+number+o+'" rowcomplete="no"><div class="span1"></div><div id="homescore'+number+o+'" class="span3 offset1 score">  </div><div class="span2 score"></div><div id="awayscore'+number+o+'" class="span3 offset2 score">'+awayGoals[o].time+'\' '+awayGoals[o].player+'</div><div class="span1"></div></div>';
			d2.push(dd);
		}
	}
	else {
		for (var o=0; o<homeGoals.length; o++) {
			var dd = '<div class="row accordion-inner" id="row'+number+o+'" rowcomplete="yes"><div class="span1"></div><div id="homescore'+number+o+'" class="span3 offset1 score">'+homeGoals[o].time+'\' '+homeGoals[o].player+'</div><div class="span2 score"></div><div id="awayscore'+number+o+'" class="span3 offset2 score">'+awayGoals[o].time+'\' '+awayGoals[o].player+'</div><div class="span1"></div></div>';
			d2.push(dd);
		}
	}
	divs.d2 = d2;
	console.log(divs);
	return divs;
};