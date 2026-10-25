import path from "path";
import express from "express";
import hbs from "hbs";
import { geoCode } from "./geocode.js";

const app = express();

// Define paths for express config

const publicDirectoryPath = path.join(import.meta.dirname, "../public");
const viewsPath = path.join(import.meta.dirname, "./templates");
const partialsPath = path.join(import.meta.dirname, "./templates/partials");
/*
const publicDirectoryPath = path.resolve(__dirname, "../public");
const viewsPath = path.resolve(__dirname, "templates");
const partialsPath = path.resolve(viewsPath, "partials");*/

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("../templates/index.hbs", {
    title: "weather app",
    name: "Me",
  });
});

app.get("/help", (req, res) => {
  res.render("../templates/help.hbs", {
    title: "help",
    helpText: "This is a message of Help",
    name: "Me",
  });
});

app.get("/about", (req, res) => {
  res.render("../templates/about.hbs", {
    title: "about",
    text: "this page is about us",
    name: "Me",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ errorMessage: "You must provide an address" });
  } else if (req.query.address) {
    //   res.send({
    //   location: "texas",
    //   forecast: "rainy",
    //   address: req.query.address
    // });
    geoCode(req.query.address, (error, { weatherData } = {}) => {
      // console.log(weatherData.days[0])
      if (error) {
        return res.send({ error });
      } else {
        return res.send({
          location: weatherData.address,
          forecast: weatherData.days[0].description,
          temperature: weatherData.days[0].temp,
          address: req.query.address,
        });
      }
    });
  }
});

app.get("/help/{*splat}", (req, res) => {
  res.render("404", { title: "404", errorMeesage: "Help article not found" });
});

app.get("/{*splat}", (req, res) => {
  res.render("404", { title: "404", errorMessage: "Page not found" });
});

// --------------------
// Start server
// --------------------

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log('Server is running at http://localhost:'+ PORT);
});
/*
app.listen(3000, () => {
  console.log("server load up at 3000 port");
});
*/
