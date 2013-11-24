$(document).ready(function() {
	// Clicking the Get Started button
	$("#getstarted").click(function() {
		$('#header').addClass('mini');
		switch_to('interpreter');
	});
	// Pressing Enter when composing a tweet
	$("#composer textarea").keypress(function(event) {
		if(event.which == 13) {
			event.preventDefault();
			process_composed();
		}
	});
	// Pressing the Tweet button
	$("#composer .button").click(process_composed);
});

// Switch tabs to the specified name
function switch_to(target) {
	$('#screens > div').hide();
	$('#'+target).show();
	$('#tabs > div').css('background', '#666');
	$('#'+target+'-tab').css('background', '#ccc');
}

// Renders an array of tweets in the specified HTML element.
function display_tweets(user_tweets, element) {
	for(var i = 0; i < user_tweets.length; i++) {
		$(element).append('<div class="tweet" id="'+user_tweets[i]["id"]+'">'+user_tweets[i]["text"]+'<div class="tweets"></div></div>');
		display_tweets(user_tweets[i]["children"], '#'+user_tweets[i]["id"]+' > .tweets');
	}
}

// Renders output text to the interpreter.
function output(text) {
	if(!($('#interpreter > .tweets > div:last').hasClass('output'))) {
		$('#interpreter > .tweets').append('<div class="output"><div>'+text+'</div></div>');
	}
	else {
		$('#interpreter > .tweets > div:last').append('<div>'+text+'</div>');
	}
}

function process_composed() {
	var text = $('#composer textarea').val();
	$('#composer textarea').val('> ');
	display_tweets([build_tweet(text)], '#interpreter > .tweets');
	output(read_tweet(text).toString());
	//alert(text);
}