/* Express is a Node framework for creating web apps that provides
mechanisms to handle different HTTP actions, set settings like the port to connect to,
etc. 

The first few lines "require" or import the express module and create an
express application.

The app object has all the capabilities for routing different HTTP requests
as well as other functionalities offered by express.
 */
const express = require("express");
const app = express();

// Imports Mongoose for using MongoDB
const mongoose = require("mongoose");

// Imports TodoTask schema from models folder
const TodoTask = require("./models/TodoTask");

// The use keyword here is used to serve some static assets
// (in this case, a CSS stylesheet)
app.use("/static", express.static("public"));

// The use keyword here is being used for middleware functions, or
// functions that are called between processing the request and sending the response
// in the application.
// 
// In this case, express.urlencoded is being used to recognize the incoming
// request object as a string or array and add it to the body of the request.
// 
// In our specific use, data from the form is sent to the server through a 
// POST request enclosed in its body.
app.use(express.urlencoded({ extended: true }));

// This sets the template engine for viewing our HTML file 
// to EJS, so that the HTML can be rendered.
app.set("view engine", "ejs");

// When a GET request is made to the homepage, render the 
// file containing the templated HTML for the todo list (todo.ejs)
// and renders the list of tasks.
// The find below retrieves all the tasks with the TodoTask schema
// and uses these tasks as the parameter todoTasks in our EJS
// file for the homepage.
app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.render("todo.ejs", { todoTasks: tasks });
    });
});

// When a POST request is made to the homepage, the data from 
// the form is submitted to the web server for storing.
// We use the TodoTask model schema to store each new todo,
// which is made with the POST request, in a collection in the
// MongoDB server.
app.post('/', async (req, res) => {
    // create a new TodoTask by taking the content from the 
    // body of the request.
    const todoTask = new TodoTask({
        content: req.body.content
    });
    try {
        // try to save to the database.
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});

// Code for updating a todo task when the "edit" button has been clicked.
// In our HTML, "edit" is just a styled link that appends a suffix of "/edit/task._id"
// to the homepage. and leads to a rendered version of todoEdit.ejs, the
// page that describes the HTML layout for the todo app when a task is being edited.
// 'app.route' specifies the functionality of "get" for this particular
// page of the site.
// When data is fetched using GET for this page, we fetch the id from the 
// request parameters.
// When data is changed on the server using POST, we utilize a method called
// findByIdAndUpdate to update the task's content with data from the body
// of the request.
app
    .route("/edit/:id")
    // GET request is used to render the website when task "id" is being edited.
    // The id of the task to be edited is in the request params/link
    // Passes the id of the task and all TodoTasks (found from the MongoDB collection)
    // to the rendering of todoEdit.ejs, which will look for the task corresponding
    // to the given id and render a new interface for updating that task only.
    .get((req, res) => {
        const id = req.params.id;
        TodoTask.find({}, (err, tasks) => {
            res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
        });
    })
    // POST request is used when submitting a modification to the content of task "id"
    // The id of the task to be edited is in the request params/link
    // Passes the id and the content of the body of the request (which contains the
    // new content for the task). findByIdAndUpdate is used to update the content
    // of the todo task in the collection.
    .post((req, res) => {
        const id = req.params.id;
        TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });

// Code for removing a task by id when the "remove" button is clicked.
// Uses findByIdAndRemove to remove the task with that id from the MongoDB
// collection and then redirect to the homepage, which will re-render the HTML.
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});

const PORT = process.env.PORT || 3000;

// Start connection to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connected to db!");

    // The listen function binds and listens to the connections on the
    // specified host and port. We also log to the console to
    // confirm that the website is up and running.
    // We only call listen once a connection to the MongoDB server is made.
    app.listen(PORT, () => console.log("Server Up and running on " + PORT));
});