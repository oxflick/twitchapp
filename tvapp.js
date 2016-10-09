
$(document).ready(function() {
  // array of stream users we are interested to display
  var streamers = ["freecodecamp", "storbeck", "terakilobyte", "LiveWithJazza", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","ESL_SC2", "OgamingSC2", "brunofin"]	
  // loop try json calls with each users
  for (var j=0; j < streamers.length; j++) {
  	var twUrl = 'https://api.twitch.tv/kraken/channels/' + streamers[j] + '?client_id=iuy5ubr0o42ch85ghs8wmzklvdkpz1q&callback=?' + '';
  	$.getJSON(twUrl, {

  	})
  	.done(function(data) {
      //console.log(data);
      var names = [];
  	  var logos = [];
  	  var links = [];
  	  names.push(data.display_name);
  	  logos.push(data.logo);
  	  links.push(data.url);
  	  //console.log(names);

       // append results to the page
      $('.result').append('<a class="eachresult" href="' + links[0] + '" target="_blank"><p class="name"> <img class="logo thumbnail" src="' + logos[0] + '" alt="logo"><span>' + names[0] + '</span></p></a>');

      // if null or empty add placeholder to logo image
      $(".logo").each(function() {

       	if($(this).attr("src") == "null" || $(this).attr("src") == '') {

       	  $(this).attr("src", "http://placehold.it/50x50/11d476/fff");
       	}

      });
    })
    // handle the errors for users who does not have account or suspended
    .fail(function(jqxhr, textStatus, error) {
         
         var jsonResponse = [];
         jsonResponse.push(JSON.parse(jqxhr.responseText));

         for (var z = 0; z < jsonResponse.length; z++) {
         	
         	$('.result').append('<a class="eachresult" href="https://www.twitch.tv/" target="_blank"><p class="name"> <img class="logo thumbnail" src="http://placehold.it/50x50/11d476/fff" alt="logo"><span>' + jsonResponse[z].message + '</span></p></a>')
         }
    });

  }

  // json call to retrieve if user online or offline
  var strUrl = 'https://api.twitch.tv/kraken/streams?channel=' + streamers + '';
  $.getJSON(strUrl, {

  })
  .done(function(json) {
	var displayname = [];

    for (var i = 0; i < json.streams.length; i++) {
    	displayname.push([json.streams[i].channel.display_name, json.streams[i].channel.status]);
    	//description.push(json.streams[i].channel.status);
        //console.log(displayname);

    }

    // find out if display name is in the response change the color to green to online color
    for (var u=0; u < displayname.length; u++) {
    	$(".name span").each(function( i ) {
    		if ( $(this).text() == displayname[u][0] ) {
    			this.style.color = "green";
    			$(this).append('<p class="description"> About:' + ' ' + displayname[u][1] + '</p>');
    		}
    	});
    }   
  });

  // listen for click events on status buttons
  $(".online" ).click(function() {
    $(".name span").each(function(i) {
    	if ( this.style.color != "green") {
    		$(this).parent().hide();
    	} else {
    		$(this).parent().show();
    	}

    })
  });

  $(".offline" ).click(function() {
    $(".name span").each(function(i) {
    	if ( this.style.color == "green") {
    		$(this).parent().hide();
    	} else {
    		$(this).parent().show();
    	}
    })
  });

  $(".allstates" ).click(function() {
    $(".name span").each(function(i) {
    	$(this).parent().show();
    })
  });

}); 


