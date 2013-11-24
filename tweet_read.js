var string = "If ((#n is 0) or (#n is 1)) (Return 1)";
// If ((#n is 0) or (#n is 1)) (Return 1)
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
// Above is basically tokenize. After tokenize, the input string should be ['If', '(', '(', '#n', 'is', '0', ')', 'or', '(', '#n', 'is', '1', ')', ')', '(', 'Return', '1', ')'].

var new_list = [];
var temp_list = [];



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
//read_after_parenths will return an array, with the first element being the list of stuff between the parenthesis, and the second element being the position of the next itme.
//My logic:
//If the current item is not '(', we can just add the item to the final list (we call it new_list). 
// If the current item is a '(', then we have to make a list of the items between '(' and it's corresponding ')'
// We do this by calling read_after_parenths, which will hopefully be able to return an array and the position of the next item after the closing parenth
// read_after_parenths should be able to recursively deal with '(' found between the starting '(' and it's corresponding ')'
var i = 0;
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
//Final goal is ['If', [['#n', 'is', '0'], 'or', ['#n', 'is', '1']], ['Return', '1']]