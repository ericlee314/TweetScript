var string = "> If (#stanfurd is 0) (Return 1)";

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
