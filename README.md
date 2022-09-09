# CS279r Homework 1: To-Do App in Node/MongoDB

This code creates a basic to-do list web app using Node.js and MongoDB. In addition to the basic functionality of adding and checking off todos, it also allows users to edit
their todos after adding them.

## Reflection

One of the most significant contributions of Node.js and MongoDB is the connection from client to server that is created, and thus the use of HTTP GET/POST requests to submit forms, as well as the use of a collection stored in a MongoDB database. Previously, todo-list items were just displayed on the website, not stored or retrieved from any other place. Additionally, the use of EJS allowed a better and easier integration of Javascript into HTML, whereas previously, there were some workarounds and repeated JS code necessary to integrate JS into plain HTML/CSS. Overall, this set of technologies is more versatile and allows for information to be shared and saved -- for instance, now, whenever the website is restarted and opened, the data is maintained, as it is stored in MongoDB, while this was not the case previously.

## Usage

Clone this repository (from the command line or using GitHub Desktop). If from the command line, use the following command:

`git clone https://github.com/19katz/node_js_mongodb.git`

Once cloned locally, navigate to `file:///<path-to-directory>/node_js_mongodb/` in a shell and then enter the command `heroku local`.

This should start an instance on `localhost:5000`. 

Otherwise, use the heroku app [link](https://fast-retreat-75756.herokuapp.com/).

## Citations

This code was created using the following [tutorial](https://medium.com/@diogo.fg.pinheiro/simple-to-do-list-app-with-node-js-and-mongodb-chapter-1-c645c7a27583).

