const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public"));

require("./controllers/html-routes.js")(app);
require("./controllers/api-routes.js")(app);


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
