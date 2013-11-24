var global_frame = new Object();
global_frame["parent"] = null;
global_frame["variables"] = new Object();
global_frame["function_names"] = [];
global_frame["function_defs"] = [];

var make_child_frame = function(parent){
	frame = new Object();
	frame["parent"] = parent;
	frame["variables"] = new Object();
	frame["function_names"] = [];
	frame["function_defs"] = [];
	return frame;
}

function lookup(frame, var_name) {
	if(var_name in frame["variables"]) {
		return frame["variables"][var_name];
	}
	else if(frame["parent"]) {
		lookup(frame["parent"]);
	}
	else {
		// do nothing
	}
}


var tweeteval = function(tweet, frame) 
{
	console.log('tweeteval:');
	console.log(tweet["text"]);
    var body = tweet["tokenized"];
    var children = tweet["children"];
	
    if(body[0] == ">" || body[0] == '&gt;')
    {
        tweeteval_child(body.slice(1), frame);
    }  
    
    else
    {
        frame["function_names"].push(body);
		frame["function_defs"].push(children);
		console.log(frame);
    }
}

var tweeteval_child = function(body, frame)
{
	console.log('tweeteval_child: ');
	console.log(body);
    function_names = frame["function_names"];
    function_defs = frame["function_defs"];
	console.log(function_names);
	console.log(body.length);
	var index = -1;
	for(var i = 0; i < function_names.length; i++) {
		f = function_names[i];
		var valid = true;
		for (var j = 0; j < body.length; j++) {
            if (typeof body[j] == 'string')
            {
				console.log(body[j]);
				console.log(f[j]);
                if(body[j] != f[j]) {
                	valid = false;
					break;
                }
            }
            else
            {
				console.log(f[j]);
				console.log('#');
                if(f[j][0] != "#") {
                	valid = false;
					break;
                }
            }
		}
		if(valid) {
			index = function_names.indexOf(f);
			console.log(index);
			break;
		}
	}
    /*for (var i = 0; i < body.length; i++)
    {
        functions = functions.filter(function(f)
        {
            if (typeof body[i] == 'string')
            {
				console.log(body[i]);
				console.log(f[i]);
                return body[i] == f[i];
            }
            else
            {
				console.log(f[i]);
				console.log('#');
                return f[i][0] == "#";
            }
        });
    }*/
    if(index >= 0)
    {
		var the_function = function_defs[index];
		var the_frame = make_child_frame(frame);
		for(var j = 0; j < the_function.length; j++) {
			tweeteval(the_function[j], the_frame);
		}
    }
	else if(frame["parent"]) {
		tweeteval_child(body, frame["parent"]);
	}
	else {
		tweeteval_builtin(body);
	}
}
    
function tweeteval_builtin(body) {
	console.log("BUILT-IN FUNCTION:");
	console.log(body);
}
    
    
    
    