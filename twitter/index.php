<?php
ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "790331540-0oezQGyeyBsuWI7XVNDp2hWeszKhoEYRhun0aNOK",
    'oauth_access_token_secret' => "XO2sfuroxQa3aKgzgxUXyTTBgs6EDp7gECCYJkc1fGqu4",
    'consumer_key' => "eMhyKLtbJ72eEUcMUuv1Ug",
    'consumer_secret' => "5hl3JwQ5yGUbMLWmvHYYr6glFYp0PEyDMZBhaeg4k"
);

/** Perform a GET request and echo the response **/
/** Note: Set the GET field BEFORE calling buildOauth(); **/
$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
$getfield = '?screen_name='.$_GET['screen_name'];
$requestMethod = 'GET';
$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();
