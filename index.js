// express library
const express = require("express");
const app = express();
// path library so we can use join.path
const path = require("path");
// use template system
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/render"));
// use static files like .css & .js & images and video
app.use(express.static(path.join(__dirname, "public")));
// so i can use req.body
app.use(express.urlencoded({ extended: true }));
// so i can use patch method in form
// action="/details/<%= thisTweet.id  %>?_method=PATCH" method="POST"
const methodoverride = require("method-override");
app.use(methodoverride("_method"));
// to make random id in string use uuid
const { v4: uuid } = require("uuid");
uuid();
// -----------------------------------------------------------------------
// dummy tweets .
let tweets = [
  {
    // id: 1,
    id: uuid(),
    userName: "ali ",
    tweet: "new comment 1 ",
  },
  {
    id: uuid(),
    userName: "mohamed ",
    tweet: "new comment 2 ",
  },
  {
    id: uuid(),
    userName: "medo ",
    tweet: "new comment 3 ",
  },
  {
    id: uuid(),
    userName: "said ",
    tweet: "new comment 4 ",
  },
  {
    id: uuid(),
    userName: "user 5",
    tweet: "new comment 5 ",
  },
];
// -----------------------------------------------------------------------
app.get("/home", (req, res) => {
  res.render("./home");
});
// -----------------------------------------------------------------------
app.get("/admin", (req, res) => {
  res.render("./admin", { tweets });
});
// -----------------------------------------------------------------------
app.get("/create", (req, res) => {
  res.render("./create");
});
// -----------------------------------------------------------------------
app.post("/admin", (req, res) => {
  const { userName, tweet } = req.body;
  tweets.push({ userName, tweet, id: uuid() });
  res.redirect("/admin");
});
// -----------------------------------------------------------------------
app.get("/details/:id", (req, res) => {
  const { id } = req.params;
  const thisTweet = tweets.find((ele) => ele.id === id);
  res.render("./details", { thisTweet });
});
// -----------------------------------------------------------------------
// edit tweet  with patch
// 1- make edit view
// 2- make patch request in edit view.ejs method
// action="/details/<%= thisTweet.id  %>?_method=PATCH" method="POST"
app.get("/tweet/:id/edit", (req, res) => {
  const { id } = req.params;
  const thisTweet = tweets.find((ele) => ele.id === id);
  res.render("./edit", { thisTweet });
});
// action="/details/<%= thisTweet.id  %>?_method=PATCH" method="POST"
// we use find by id to get tweet and modify it
app.patch("/details/:id", (req, res) => {
  const { id } = req.params;
  const updatedtweet = req.body.tweet;
  const findObjectbyId = tweets.find((ele) => ele.id === id);
  findObjectbyId.tweet = updatedtweet;
  res.redirect("/admin");
});
// -----------------------------------------------------------------------
app.delete("/tweet/:id", (req, res) => {
  const { id } = req.params;
  const all_tweet_without_this_tweet = tweets.filter((ele) => ele.id !== id);

  tweets = all_tweet_without_this_tweet;
  res.redirect("/admin");
});
app.listen("3000", () => {
  console.log("starting .....server ... port 3000");
});
