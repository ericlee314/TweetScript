var tweets = new Object();

/**
 * Loads a user's tweets from Twitter.
 */
function load_user(user) {
	$('#message').html('Loading '+user+'...');
	$.get('twitter/index.php?screen_name='+user, function(data) {
		var obj = jQuery.parseJSON(data);
		$("#message").html("");
		$("#screens").append('<div id="'+user+'"><div class="tweets"></div></div>');
		$("#tabs").append('<div id="'+user+'-tab" onclick="switch_to(\''+user+'\')">@'+user+'</div>');
		make_tweet_objects(user, obj);
	});
}

/**
 * Takes the raw tweet data from Twitter and processes it.
 */
function make_tweet_objects(user, raw_tweets) {
	var user_tweets = [];
	
	// Create new tweet objects
	for(var i = raw_tweets.length-1; i >= 0; i--) {
		var tweet = new Object();
		tweet["id"] = raw_tweets[i]["id"];
		tweet["parent"] = raw_tweets[i]["in_reply_to_status_id"];
		tweet["text"] = raw_tweets[i]["text"];
		tweet["tokenized"] = read_tweet(tweet["text"]);
		tweet["children"] = [];
		tweet["remove"] = false;
		user_tweets.push(tweet);
	}
	
	// Bind the children to their parents
	for(var j = 0; j < user_tweets.length; j++) {
		if(user_tweets[j]["parent"]) {
			for(var k = j - 1; k >= 0; k--) {
				if(user_tweets[j]["parent"] == user_tweets[k]["id"]) {
					user_tweets[k]["children"].push(user_tweets[j]);
					user_tweets[j]["remove"] = true;
				}
			}
		}
	}
	
	// Filter out duplicate reply tweets
	user_tweets = user_tweets.filter(function(tweet) {
		return !(tweet["remove"]);
	});
	
	console.log(user_tweets);
	tweets[user] = user_tweets;
	display_tweets(user_tweets, "#"+user+" > .tweets");
}

/**
 * Builds a standalone tweet from scratch.
 */
var index = 0;
function build_tweet(text) {
	var tweet = new Object();
	tweet["id"] = 'custom'+index;
	index++;
	tweet["parent"] = null;
	tweet["text"] = text;
	tweet["children"] = [];
	tweet["remove"] = false;
	return tweet;
}