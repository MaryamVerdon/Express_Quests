require("dotenv").config();
const express = require("express");
const { validateUser, validateMovie } = require("./validators.js");

const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
//Routes Movies
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
//created movies
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
//update movies
app.put("/api/movies/:id", validateMovie, movieHandlers.putMovie);
//delete movies
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

const usersHandlers = require("./usersHandlers");
//Routes Users
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersId);
//created users
app.post("/api/users", validateUser, usersHandlers.postUser);
//update users
app.put("/api/users/:id", validateUser, usersHandlers.putUser);
//delete users
app.delete("/api/users/:id", usersHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
