# module3-assignment
Module 3 Coding Assignment
=======
[Click here to SIGN UP for the ***Single Page Web Applications with AngularJS*** course on Coursera](https://www.coursera.org/learn/single-page-web-apps-with-angularjs). It's FREE!
**Time to put all that knowledge to code!**

## Time to Complete
It should take about an 1 hour or less. (This is just an estimate. People's backgrounds differ, so for some people it will take longer to complete.)
It should take about 1 hour or less. (This is just an estimate. People's backgrounds differ, so for some people it will take longer to complete.)

**Ask questions in [Week 3 Discussion Forum](https://www.coursera.org/learn/single-page-web-apps-with-angularjs/discussions/weeks/3) if you get stuck! We are all learning, and going through getting stuck and then unstuck (even with someone’s help) can be a very valuable learning experience!**

### **DO NOT be scared by the length of this assignment! It’s actually a fairly short one. I just wanted to explain everything as clearly as I could and break it down into smaller steps for your benefit.**
## Assignment Instructions
### General Idea
You are going to be building a much simplified search of the menu item descriptions using the restaurant server REST API we used in Lecture 25, Part 2.
The idea here is for the user to search the descriptions of menu items. Then, given the list of matches of his search, give the user the ability to throw the items they for sure don't want off the list, thus narrowing it down to what they do want.
Your task is create a text box and a button with the label "Narrow It Down For Me!".
Initially, the user should just see a screen with the textbox and the "Narrow It Down For Me!" button. Once the user enters something into the textbox and clicks the button, your app will reach out to the server and retrieve the list of menu items for the entire menu. Once retrieved, your task is to loop through all the items and, for each item, do a simple check if the string being searched for by the user appears anywhere in the description of the item. If it does, that item gets placed in a special `found` array. If it doesn't, you simply move on to the next item.
Once your app goes through all the items, it should display the `found` list of items. Each item in the list should show the name of the menu item, its short_name, and the description. You can display the items in a simple unordered list, with each piece of information separated by a comma. OR be fancier and use some sort of a grid. Either way is fine. We are not concentrating on style in this class.
You should also provide a "Don't want this one!" button next to each item in the list to give the user the ability to remove an item from that list.
If nothing is found as a result of the search OR if the user leaves the textbox empty and clicks the "Narrow It Down For Me!" button, you should simply display the message "Nothing found".
