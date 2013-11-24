/*
input string:
> Print "Hello World!"
output array:
[">", "Print", "\"Hello World!\""]

The backslash is an escape. It indicates that the double-quote is actually part of the string.

*/
var tokenize = function (tweet) {
    tweet = tweet.replace(/[(]/g, " ( ", "gi");
    tweet = tweet.replace(/[)]/g, " ) ", "gi");
    var list = tweet.split(" ");
    for (var i = list.length - 1; i >= 0; i--) {
        if (list[i] === "") {
            list.splice(i, 1);
        }
        if (is_number(list[i])) {
            list[i] = Number(list[i]);
        }
    }
    return list;
};

var is_number = function (token) {
    return !isNaN(token);
}

    function read_tweet(text) {
        var string = text; //"> If (#stanfurd is (print 5) 0) (Return 1)";
        // When we input this into tweet_read:
        //"> If (#stanfurd is 0) (Return 1)"
        //We will output:
        //[">", "If", ["#stanfurd", "is", 0], ["Return", 1]]
        //---------------------------------------------------------
        //console.log(tokenize(string));
        //[ '>', 'if', '(', '#stanfurd', 'is', 0, ')', '(', 'return', 1, ')' ]


        var number_of_parens = 0;

        var paren_destroyer = function (number, tokenarr) {
            for (var counter = 0; counter < number; counter++) {
                while (tokenarr[0] !== ")") {
                    if (tokenarr.length === 0) {
                        break;
                    }
                    tokenarr.shift();
                }
                tokenarr.shift();
            }
            return tokenarr;
        }


        var tweetread = function (tokens, arr) {
            if (tokens.length === 0) {
                return arr;
            }
            if (tokens[0] === "(") {
                arr.push(readtail(tokens.slice(1)));
                parens = number_of_parens + 1
                number_of_parens++
                tokens = paren_destroyer(parens, tokens);
                tweetread(tokens, arr);
                return arr;
            }
            if (tokens[0] === ")") {
                tokens.shift
                return arr;
            } else {
                arr.push(tokens[0]);
                return tweetread(tokens.slice(1), arr);
            }
        };

        var readtail = function (tokens) {
            if (tokens.length === 0) {
                return;
            }
            return tweetread(tokens, []);
        };

        var quote_destroyer = function (tokens) {
            var insidequotes = false;
            var temparray = [];
            var tempstring = ""
            for (var z = 0; z < tokens.length; z++) {
                if (typeof tokens[z] === "string" || typeof tokens[z] === "number") {
                    if (typeof tokens[z] === "number") {
                        tokens[z] = tokens[z].toString()
                    }
                    if (tokens[z].charAt(0) === "\"") {
                        insidequotes = true;
                    }
                    if (tokens[z].charAt(tokens[z].length - 1) === "\"") {
                        tempstring += tokens[z];
                        temparray.push(tempstring);
                        tempstring = "";
                        insidequotes = false;
                    } else {
                        if (insidequotes) {
                            tempstring += (tokens[z] + " ");
                        } else {
                            temparray.push(tokens[z]);
                        }
                    }
                } else {
                    temparray.push(quote_destroyer(tokens[z]));
                }
            }
            return temparray;
        }

        var we_are_number = function (tokens) {
            for (var counter = 0; counter < tokens.length; counter++) {
                if (typeof tokens[counter] === "string") {
                    if (is_number(tokens[counter])) {
                        tokens[counter] = Number(tokens[counter]);
                    }
                } else {
                    we_are_number(tokens[counter])
                }
            }
            return tokens
        }


        //console.log(tokenize(string));
        //console.log(tweetread(tokenize(string), []));
        return we_are_number(quote_destroyer(tweetread(tokenize(string), [])));
    }
var string = "> If ((#n is 0) or (#n is 1)) (Return http://www.google.com)";
//console.log(read_tweet(string));
var string2 = "> If ((#n is 0) or (#n is 1)) (@Pokemon))";
//console.log(read_tweet(string));


var filter_web_links = function (tweet) {
    var tokens = tokenize(tweet);
    for (var i = 0; i < tokens.length; i++) {
        if (typeof tokens[i] === 'string') {
            if (tokens[i].indexOf("http://") === 0) {
                tokens[i] = tokens[i].link(tokens[i]);
            }
            else if (tokens[i].indexOf("@") === 0){
            tokens[i] = tokens[i].link("http://www.twitter.com/" + tokens[i].substring(1,tokens[i].length) );
            }
        }
    }
    return tokens_to_string(tokens)
}

var tokens_to_string = function (tokens) {
    tempstring = ""
    for (var i = 0; i < tokens.length; i++) {
        if (typeof tokens[i] === "string") {
            tempstring += (tokens[i] + " ")
            if (tokens[i] === "(") {
                tempstring = tempstring.substring(0, tempstring.length - 1)
            }
            if (tokens[i] === ")") {
                tempstring = (tempstring.substring(0, tempstring.length - 3) + tempstring.substring(tempstring.length - 2))
            }

        } else if (typeof tokens[i] === "number") {
            tempstring += (tokens[i].toString() + " ")
        } else {
            tempstring += tokens_to_string(tokens[i])
        }
    }
    return tempstring;
}
