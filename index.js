import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3030;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//renders index on / request
app.get("/", (req, res) => {
    res.render("index.ejs");
});

//renders home list and sends the current home data (let homeUserTasks = [])
app.get("/home", (req, res) => {
    res.render("home.ejs", 
    {
        homeTasks: homeUserTasks
    });
});

//renders work list and sends stored work data (let workUserTasks = [])
app.get("/work", (req, res) => {
    res.render("work.ejs",
    {
        workTasks: workUserTasks
    });
});

// arrays to store user inputted data depending on which form submitted the post request
let homeUserTasks = [];
let workUserTasks = [];

app.post("/submit", (req, res) => {
    //if the user submitted data through req.body.userInputHome (home list):
    if (req.body.userInputHome) {
        // if the newest task is = to the last stored task
        if (homeUserTasks[homeUserTasks.length -1] === req.body.userInputHome) {
            // do nothing, preventing repeat items when page refreshed
        } else {
            // otherwise, add the new task to server storage (homeUserTasks)
            homeUserTasks.push(req.body.userInputHome);
        }
        //renders the home list and passes the homeUserTask array to client
        res.render("home.ejs", 
        {
            homeTasks: homeUserTasks
        });
    // as above, but relating to the work page form
    } else if (req.body.userInputWork) {
        if (workUserTasks[workUserTasks.length -1] === req.body.userInputWork) {
            // do nothing
        } else {
            workUserTasks.push(req.body.userInputWork);
        }
        res.render("work.ejs", 
        {
            workTasks: workUserTasks
        });
    }
});

//listens to the previously defined port for incoming requests
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});
