// === app.js ===
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let items = []; // Format: { task: "Task Name", priority: "High" }

app.get("/", function (req, res) {
    const filter = req.query.priority;
    const filteredItems = filter && filter !== "All" ? items.filter(item => item.priority === filter) : items;
    res.render("list", { ejes: filteredItems });
});

app.post("/", function (req, res) {
    const task = req.body.ele1.trim();
    const priority = req.body.priority || "Low";
    if (task.length > 0) {
        items.push({ task, priority });
    }
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    const index = parseInt(req.body.index);
    if (!isNaN(index)) items.splice(index, 1);
    res.redirect("/");
});

app.post("/edit", (req, res) => {
    const { index, edited } = req.body;
    if (edited.trim()) items[parseInt(index)].task = edited.trim();
    res.redirect("/");
});

app.listen(8000, () => {
    console.log("Server started on port 8000");
});