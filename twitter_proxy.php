<?php
$config = array(
	'oauth_access_token' => '790331540-Vey97OdU8b8x0MFLLyvlEglomtT13u5LLZulLDAQ',
	'oauth_access_token_secret' => 'LDpRqgn9dLJBMAfHKn82cw7lzc2NEiwHZmePfOVnLOOux',
	'consumer_key' => 'KEAjXPet9laBl7MXVxfVPA',
	'consumer_secret' => 'rR19iplH8U4VhEVFnvEBwy4uSIH1EHIJk2m7N5dmJU',
	'use_whitelist' => false, // If you want to only allow some requests to use this script.
	'base_url' => 'http://api.twitter.com/1.1/'
);

$whitelist = array(
	'statuses/user_timeline.json?screen_name=...'=>true
);

if(!isset($_GET['url'])){
	die('No URL set');
}

$url = $_GET['url'];

if($config['use_whitelist'] && !isset($whitelist[$url])){
	die('URL is not authorised');
}

// Figure out the URL parmaters
$url_parts = parse_url($url);
parse_str($url_parts['query'], $url_arguments);

$full_url = $config['base_url'].$url; // Url with the query on it.
$base_url = $config['base_url'].$url_parts['path']; // Url without the query.

function buildBaseString($baseURI, $method, $params) {
	$r = array();
	ksort($params);
	foreach($params as $key=>$value){
	$r[] = "$key=" . rawurlencode($value);
	}
	return $method."&" . rawurlencode($baseURI) . '&' . rawurlencode(implode('&', $r));
}

function buildAuthorizationHeader($oauth) {
	$r = 'Authorization: OAuth ';
	$values = array();
	foreach($oauth as $key=>$value)
	$values[] = "$key="" . rawurlencode($value) . """;
	$r .= implode(', ', $values);
	return $r;
}

// Set up the oauth Authorization array
$oauth = array(
	'oauth_consumer_key' => $config['consumer_key'],
	'oauth_nonce' => time(),
	'oauth_signature_method' => 'HMAC-SHA1',
	'oauth_token' => $config['oauth_access_token'],
	'oauth_timestamp' => time(),
	'oauth_version' => '1.0'
);
	
$base_info = buildBaseString($base_url, 'GET', array_merge($oauth, $url_arguments));
$composite_key = rawurlencode($config['consumer_secret']) . '&' . rawurlencode($config['oauth_access_token_secret']);
$oauth_signature = base64_encode(hash_hmac('sha1', $base_info, $composite_key, true));
$oauth['oauth_signature'] = $oauth_signature;

// Make Requests
$header = array(
	buildAuthorizationHeader($oauth), 
	'Expect:'
);
$options = array(
	CURLOPT_HTTPHEADER => $header,
	//CURLOPT_POSTFIELDS => $postfields,
	CURLOPT_HEADER => false,
	CURLOPT_URL => $full_url,
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_SSL_VERIFYPEER => false
);

$feed = curl_init();
curl_setopt_array($feed, $options);
$result = curl_exec($feed);
$info = curl_getinfo($feed);
curl_close($feed);

// Send suitable headers to the end user.
if(isset($info['content_type']) && isset($info['size_download'])){
	header('Content-Type: '.$info['content_type']);
	header('Content-Length: '.$info['size_download']);

}

echo($result);
?>