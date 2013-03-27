for (var i=0; i<10; i++) {
	$('#collapse'+i).collapse("hide");
}

$(document).ready(function(){

	var socket = io.connect('http://localhost:3001');

	socket.emit("getSeasons");
	socket.on("hereSeasonsList", function (data) {
		for (var i=0; i<data.length; i++) {
			var datas = {
				season: data[i].season
			};
			$('#selectSeason')
				.append($('<option>', { "value" : datas.season })
					.text(datas.season));
		};
	});

	socket.emit("getLatestMatch");

	$(window).load(function() { $("#selectSeason").trigger("change", 2035) });
	
	var matchesdata;

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
			console.log("TEAMS: "+teams);
			for (var i=0; i<matchesdata.length; i++) {
				var already = false;
				var datas = {
					day: matchesdata[i].matchdays_number,
					flag: matchesdata[i].matchdays_flag,
				};
				console.log("MATCH: "+datas.day+"-"+datas.flag+", PAST?"+matchesdata[i].past);
				if (matchesdata[i].past != 1) { //h IN REALTÀ VA INVERTITO !=0
					for (var j=0; j<insertedDays.length; j++) {
						console.log("Comparing ID " + insertedDays[j].day + "-" + insertedDays[j].flag + " with day " + datas.day + "-" + datas.flag);
						if (insertedDays[j].day == datas.day) {
							if (insertedDays[j].flag == datas.flag) {
								console.log("already in");
								already = true; 
							}
						}
					}
					if (!already) {
						insertedDays.push({day: datas.day, flag: datas.flag});
						console.log(insertedDays);
						dayd = (datas.day % (matchesdata.length/teams.length))+1;
						console.log("DAY-- " + datas.day + " LEN-- " +matchesdata.length);
						var leg = ((datas.flag === 0) ? "Andata" : "Ritorno");
						$('#selectDay')
						.append($('<option>', { "value" : datas.day+"-"+datas.flag })
							.text(dayd + "° " + leg));
					} 
				}//h
			};
		});
	});

	$(window).load(function() { $("#selectDay").trigger("change", 2035, 1) });

	$("#selectDay").change(function(e,s,d){
		d = d || $(this).val();
		s = s || $("#selectSeason").val();
		console.log("~~~ " + d + " ~~~~ " + s);
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
				$("#accordion"+j).append('<div class="dsowag span10 offset1 well accordion-group" id="dsowag'+j+'"></div>');
				$("#dsowag"+j).append('<div class="drah row accordion-heading" id="drah'+j+'"></div');
				$("#drah"+j).append('<a class="accordion-toggle" id="toggle'+j+'" data-toggle="collapse" data-parent="#accordion'+j+'" href="#collapse'+j+'"></a>');
				var d = createMatch(matcheslist[j]);
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
});

var createMatch = function(match) {
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
	divs.d1 = '<div class="span1 scudo"> <img src="/'+match.home_team+'.png" alt="" /></div><p class="span3 team">'+match.home_team_name+'</p><p class="span2 team">'+homeGoals.length+' - '+awayGoals.length+'</p><p class="span3 team">'+match.away_team_name+'</p><div class="span1 scudo"> <img src="/'+match.away_team+'.png" alt="" /></div>'
	var d2 = [];
	if (homeGoals.length > awayGoals.length) {
		var diff = homeGoals.length - awayGoals.length;
		var o = 0;
		for (o; o<awayGoals.length; o++) {
			var dd = '<div class="row accordion-inner"><div class="span1"></div><div class="span3 offset1 score">'+homeGoals[o].time+'\' '+homeGoals[o].player+'</div><div class="span2 score"></div><div class="span3 offset2 score">'+awayGoals[o].time+'\' '+awayGoals[o].player+'</div><div class="span1"></div></div>';
			d2.push(dd);
		}
		for (o; o<homeGoals.length; o++) {
			var dd = '<div class="row accordion-inner"><div class="span1"></div><div class="span3 offset1 score">'+homeGoals[o].time+'\' '+homeGoals[o].player+'</div><div class="span2 score"></div><div class="span3 offset2 score"> </div><div class="span1"></div></div>';
			d2.push(dd);
		}
	}
	else if (homeGoals.length < awayGoals.length) {
		var diff = awayGoals.length - homeGoals.length;
		var o = 0;
		for (o; o<homeGoals.length; o++) {
			var dd = '<div class="row accordion-inner"><div class="span1"></div><div class="span3 offset1 score">'+homeGoals[o].time+'\' '+homeGoals[o].player+'</div><div class="span2 score"></div><div class="span3 offset2 score">'+awayGoals[o].time+'\' '+awayGoals[o].player+'</div><div class="span1"></div></div>';
			d2.push(dd);
		}
		for (o; o<awayGoals.length; o++) {
			var dd = '<div class="row accordion-inner"><div class="span1"></div><div class="span3 offset1 score">  </div><div class="span2 score"></div><div class="span3 offset2 score">'+awayGoals[o].time+'\' '+awayGoals[o].player+'</div><div class="span1"></div></div>';
			d2.push(dd);
		}
	}
	else {
		for (var o=0; o<homeGoals.length; o++) {
			var dd = '<div class="row accordion-inner"><div class="span1"></div><div class="span3 offset1 score">'+homeGoals[o].time+'\' '+homeGoals[o].player+'</div><div class="span2 score"></div><div class="span3 offset2 score">'+awayGoals[o].time+'\' '+awayGoals[o].player+'</div><div class="span1"></div></div>';
			d2.push(dd);
		}
	}
	divs.d2 = d2;
	console.log(divs);
	return divs;
};