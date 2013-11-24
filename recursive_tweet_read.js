var string = "> If (#stanfurd is 0) (Return 1)";
// When we input this into tweet_read:
//"> If (#stanfurd is 0) (Return 1)"
//We will output:
//[">", "If", ["#stanfurd", "is", 0], ["Return", 1]]
//---------------------------------------------------------
var tokenize = function(tweet) {
        tweet = tweet.toLowerCase().replace(/[(]/g, " ( ", "gi");
    tweet = tweet.replace(/[)]/g, " ) ", "gi");
    var list = tweet.split(" ");
    for(var i = list.length - 1; i >= 0; i--) {
        if(list[i] === "") {
            list.splice(i, 1);
        }
        if(is_number(list[i])) {
            list[i] = Number(list[i]);
        }
    }
    return list;
};
//console.log(tokenize(string));
//[ '>', 'if', '(', '#stanfurd', 'is', 0, ')', '(', 'return', 1, ')' ]
var is_number = function(token) {
    return !isNaN(token);
}

var tweetread = function(tokens, arr)
{
    if (tokens.length === 0)
    {
        return arr;
    }
    if (tokens[0] === "(")
    {
        arr.push(readtail(tokens.slice(1)));
        while(tokens[0] !== ")")
        {
            tokens.shift();
        }
        tokens.shift();
        arr.push(tweetread(tokens, arr));
    }
    if (tokens[0] === ")")
    {
        return arr;
    }
    else
    {
        arr.push(tokens[0]);
        return tweetread(tokens.slice(1), arr);
    }
};

var readtail = function(tokens)
{
    if (tokens.length === 0)
    {
        return;
    }
    return tweetread(tokens, []);    
};

console.log(tokenize(string));
console.log(tweetread(tokenize(string), []));