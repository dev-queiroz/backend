const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes/index");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", routes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
