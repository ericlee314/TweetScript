TweetScript
===========

Programming language composed entirely of Tweets. Created for BearHack 2013.

Below is some sample code. Each line is a tweet, and indentation indicates that the tweet is a reply.



This is the Hello World function!
	This is a comment in the Hello World function.
	Actually, comments and function definitions are basically the same thing.
	If a tweet (or reply tweet) has no body (replies), then it's just a null function that does nothing.
	A tweet that actually does something must begin with a greater-than sign: >
	The Hello World function takes in no parameters, returns nothing, and prints the phrase: "Hello, world!"
	> Print "Hello, world!"
	This line called the built-in function "print #something".
	"Hello, world!" is a string, one of the two supported data types (the other is numbers).

Increment #n by one
	Hashtags are variables. Theres one hashtag here, so this function takes one parameter.
	> Return (#n plus 1)
	This line called the built-in function "return #something".
	The variable #something was bound to the value of (#n plus 1)--which itself is a call to the addition function "#a plus #b".
	Parentheses let you make a function call within a function call.

Give me number #n in the Fibonacci series
	> If ((#n is 0) or (#n is 1)) (Return 1)
	> Set #oneprev to (Give me number (#n minus 1) in the Fibonacci series)
	> Set #twoprev to (Give me number (#n minus 2) in the Fibonacci series)
	Built-in function "set #name to #value". Also, recursion, yay!
	> Return (#oneprev plus #twoprev)

Can't wait for the big game! #cal can beat #stanfurd any day.
	As you can see, functions can be named pretty much anything, with hashtags anywhere.
	> If (#stanfurd is 0) (Return 1)
	> Return (#cal * (Can't wait for the big game! #cal can
		> beat (#stanfurd - 1) any day.))
		A code reply to another line of code is simply an extension. You know, in case 140 characters isn't enough.
	This is the power function, if you couldn't tell.



You can also run lines of code at the global level. The return values are included below each tweet.

> Increment 5 by one
6

> Can't wait for the big game! 2 can beat 10 any day.
1024

> import @eric
> @eric Do something
...

In that last example, we called a function from someone else by importing their Twitter profile, then calling one of their function with their username in front.