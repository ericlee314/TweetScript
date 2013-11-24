var string = "If ((#n is 0) or (#n is 1)) (Return 1)";

console.log(string);

string = string.replace(/[(]/g, " ( ", "gi");
string = string.replace(/[)]/g, " ) ");
console.log(string);

var list = string.split(" ");
for(var i = list.length - 1; i >= 0; i--) {
    if(list[i] === "") {
       list.splice(i, 1);
    }
}
console.log(list);

var new_list = [];
var temp_list = [];


var i = 0;
var read_after_parenths = function (segment, starting_number) {
    var temp_list = [];
    var j = 0;
    while (segment[j] !== ')') {
        if (segment[j] == '(') {
            nested_list_values = read_after_parenths(segment.slice(j, segment.length+1));
            nested_list = nested_list_values[0];
            next_item = nested_list_values[1] + 1;
            temp_list.push(nested_list);
            j = next_item;
        }
        else {
            temp_list.push(segment[j]);
            j++;
        }
    }
    return [temp_list, j];
};
    
while (i <= list.length) {
    if (list[i] == '(') {
        nested_list_values = read_after_parenths(list.slice(i, list.length+1));
        nested_list = nested_list_values[0];
        next_item = nested_list_values[1] + 1;
        list.push(nested_list);
        i = next_item;
    }
    else {
        new_list.push(list[i]);
        i++;
    }
}
console.log(list);
    