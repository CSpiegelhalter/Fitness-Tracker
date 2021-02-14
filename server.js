const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan")

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public"));

require("./controllers/html-routes.js")(app);
require("./controllers/api-routes.js")(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
