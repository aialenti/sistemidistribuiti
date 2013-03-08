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
    console.log("djaisbdkjas")
    console.log(data);
  });
});

$(document).ready(function(){
  $(".table tr").css({
    cursor:"pointer"
  });
  
});

