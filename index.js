const fs = require("fs");
const { promisify } = require("util");
// const https = require("https");
const express = require("express");
const pug = require("pug");
const PORT = process.env.port || 3000;

// const readFile = promisify(fs.writeFile);
// const writeFile = promisify(fs.writeFile);
// const appendFile = promisify(fs.appendFile);

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/register-client", function (req, res) {
  const newClientData = req.body;
  function saveNewClientData() {
    fs.readFile("mainData.json", function (err, data) {
      if (err) {
        if (err.code === "ENOENT") {
          const newDataString = JSON.stringify([newClientData]);
          fs.writeFile("mainData.json", newDataString, function (err) {
            if (err) {
              console.error(err);
            } else {
              console.log("file not found, created new 'mainData.json' file.");
              console.log(`Registered new client: ${newClientData.cName}`);
            }
          });
        } else {
          console.error(err);
        }
      }
      if (data) {
        fs.readFile("mainData.json", function (err, data) {
          if (err) console.error(err);
          const dataJson = JSON.parse(data);
          dataJson.push(newClientData);
          const dataString = JSON.stringify(dataJson);
          fs.writeFile("mainData.json", dataString, function (err) {
            if (err) console.log(err);
            console.log(`Registered new client: ${newClientData.cName}`);
          });
        });
      }
    });
  }
  saveNewClientData();
  res.redirect("/");
});

app.get("/existing-clients", function (req, res) {
  res.send;
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}..`);
});
