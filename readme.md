#switchIt

switchIt is a two-step matching game:
1. Switch your key piece (ouside the box) with any piece on the board
2. Match pieces along the entire row or column to get points! (no diagonals in this version)


Play switchIt for a fun distraction and a simple brain stretch!

##Technologies Used
* JQuery
* Sweet Alert

## My Approach 
From the beginning my goal was to reduce the hardcoding down to a minimum and set the game up to be scalable by only adding to the monsters array and the 2 levels array. 

I went for a clean look and feel UI-wise, and focused on making a game that can progress and grow with the user. 

Some cool features are:
* Dynamically created gameArray and HTML board
* Multiple Levels
* Ability to add levels and monsters easily and have them referenced in the game


## Installation Instructions
Fork to your own repository and clone to your computer to play with the code.

### Make sure you have the following:
These ref links in the apropriate format in the header of your HTML
* rel="stylesheet" type="text/css" href="dist/sweetalert.css"

These script links in the appropriate format at the bottom of your HTML in the body
* src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"
* src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js" integrity="sha256-xNjb53/rY+WmG+4L6tTl9m6PpqknWZvRt0rO1SRnJzw=" crossorigin="anonymous"
* src="dist/sweetalert.min.js"

##Reach Goals
* Add double points for combos
* Add more levels with:
** more monsters
** bad guys or danger issues; ie. bombs
** different score goals or moves
* Add more UI; ie. level menu
* Add more animation

##Unsolved Problems

##Getting Started

* Run `npm install` to install dependencies

##Commands
* `npm start` - start the BrowserSync server
* `npm run lint:css` - lint CSS
* `npm run lint:js` - lint JS
