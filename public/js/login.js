$(document).ready(function(){
	$("#loginform").submit(function() {
		$("#loginerror").css("display", "none");
		$("#login").css("display", "none");
		var user = $("#user").val();
		var password = $("#password").val();
		console.log(user + "---" + password);
		var socket = io.connect('http://localhost:3001');
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
	});
});