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

	$("#selectSeason").change(function(){
	    socket.emit("getAllTheSeason",{
	    	season: $("#selectSeason").val()
	    });
	    socket.on("hereAllTheSeason",function(data){
	    	$("#selectDay").empty();
	    	var insertedDays = [];
	    	insertedDays.push({ day: "0", flag: "0"});
	    	for (var i=0; i<data.length; i++) {
	    		var already = false;
	    		var datas = {
	    			day: data[i].matchdays_number,
	    			flag: data[i].matchdays_flag
	    		};
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
	    			$('#selectDay')
	    				.append($('<option>', { "value" : datas.day+"-"+datas.flag })
	    					.text(datas.day+"-"+datas.flag));
	    		}
	    	};
	    });
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