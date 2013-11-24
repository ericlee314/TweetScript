var global_frame = new Object();
global_frame["parent"] = null;
global_frame["variables"] = new Object();
var function_names = [];
var function_defs = [];

var make_child_frame = function(parent){
	frame = new Object();
	frame["parent"] = parent;
	frame["variables"] = new Object();
	return frame;
}

function lookup(frame, var_name) {
		console.log(frame);
	if(var_name in frame["variables"]) {
		return frame["variables"][var_name];
	}
	else if(frame["parent"]) {
		lookup(frame["parent"], var_name);
	}
	else {
		// do nothing
	}
}


var tweeteval = function(tweet, frame) 
{
		console.log(frame);
    var body = tweet["tokenized"];
    var children = tweet["children"];
	
    if(body[0] == ">" || body[0] == '&gt;')
    {
		console.log(frame);
        var x = tweeteval_child(body.slice(1), frame);
		if(x) {
			return eval(x, frame);
		}
    }
    
    else
    {
        function_names.push(body);
		function_defs.push(children);
		console.log(frame);
    }
}

var tweeteval_child = function(body, frame)
{
		console.log(frame);
	
	var index = matching_index(body, function_names);
	
    if(index >= 0)
    {
		var the_function = function_defs[index];
		var the_frame = make_child_frame(frame);
		for(var i = 0; i < function_names[index].length; i++) {
			var token = function_names[index][i];
			console.log(token);
			if(typeof token == 'string' && token[0] == '#') {
				the_frame["variables"][token] = eval(body[i], frame);
				console.log(the_frame);
			}
		}
		for(var j = 0; j < the_function.length; j++) {
			var x = tweeteval(the_function[j], the_frame);
			console.log(the_frame);
			if(x) {
				return x;
			}
		}
    }
	else {
		console.log(frame);
		return tweeteval_builtin(body, frame);
	}
}
    
// As a last-ditch effort, tries to find a matching built-in function to call
function tweeteval_builtin(body, frame) {
		console.log(frame);
	console.log("BUILT-IN FUNCTION:");
	console.log(body);
	
	var functions = [
	["#something"],
	["import", "#someone"],
	["print", "#something"],
	["return", "#something"],
	["set", '#var', 'to', '#value'],
	["#a", "plus", "#b"],
	["#a", "minus", "#b"],
	["#a", "times", "#b"],
	["#a", "divided", "by", "#b"],
	["if", "#pred", "#value"],
	["not", "#x"],
	["#a", "and", "#b"],
	["#a", "or", "#b"],
	["#a", "is", "#b"],
	];
	
	var index = matching_index(body, functions);

	console.log(index);
	switch(index) {
	case 0: // Identity
	var s = eval(body[0], frame);
	output(s);
		
	case 1: // Import
	var s = body[1].slice(1);
	load_user(s);
	break;
		
	case 2: // Print
	var s = body[1];
	if(s[0] == '"') {
		s = s.slice(1, s.length - 1)
	}
	output(s);
	break;
	
	case 3: // Return
	return body[1];
	
	case 4: // Variable binding
	frame["variables"][body[1]] = eval(body[3], frame);
	break;
	
	case 5: // Addition
	var a = eval(body[0], frame);
	var b = eval(body[2], frame);
	console.log(a);
	console.log(b);
	if(typeof a == 'number' && typeof b == 'number') {
		return a + b;
	}

	case 6: // Subtraction
	var a = eval(body[0], frame);
	var b = eval(body[2], frame);
	if(typeof a == 'number' && typeof b == 'number') {
		return a - b;
	}
	
	case 7: // Multiplication
	var a = eval(body[0], frame);
	var b = eval(body[2], frame);
	if(typeof a == 'number' && typeof b == 'number') {
		return a * b;
	}
	
	case 8: // Division
	var a = eval(body[0], frame);
	var b = eval(body[3], frame);
	if(typeof a == 'number' && typeof b == 'number' && b != 0) {
		return a / b;
	}
	
	case 9: // If statement
	if(eval(body[1], frame)) {
		var value = eval(body[2], frame);
		return value;
	}
	break;

	case 10: // Not
	var pred = eval(body[1], frame);
	return !pred;
	
	case 11: // And
	if(eval(body[0], frame) && eval(body[2], frame)) {
		return true;
	}
	else {
		return false;
	}
	
	case 12: // Or
	if(eval(body[0], frame) || eval(body[2], frame)) {
		return true;
	}
	else {
		return false;
	}
	case 13: // Is
	return eval(body[0], frame) == eval(body[2], frame);
	}
}
    
    
// True if x is a regular word string, false otherwise
function is_word(x) {
	return (typeof x == 'string') && (x[0] != '#') && (x[0] != '@') && (x[0] != '"');
}

// Takes in a function call BODY (an array), and an array of valid function
// names (a 2D array).
// Returns the index of the first matching function, or -1 if not found.
function matching_index(body, names) {
	var index = -1;
	for(var i = 0; i < names.length; i++) {
		f = names[i];
		//console.log(f);
		var valid = true;
		for (var j = 0; j < body.length; j++) {
            if (is_word(body[j]))
            {
				//console.log(body[j]);
				//console.log(f[j]);
                if(f && body[j] != f[j]) {
                	valid = false;
					break;
                }
            }
            else
            {
				//console.log(f[j]);
				//console.log('#');
                if(f && f[j] && f[j][0] != "#") {
                	valid = false;
					break;
                }
            }
		}
		if(valid) {
			index = names.indexOf(f);
			break;
		}
	}
	return index;
}

function eval(x, frame) {
		console.log(frame);
	if(typeof x == 'number' || typeof x == 'boolean') {
		return x;
	}
	else if(typeof x == 'object') {
		return tweeteval_child(x, frame);
	}
	else if(x[0] == '#') {
		return lookup(frame, x);
	}
	else {
		return x;
	}
}