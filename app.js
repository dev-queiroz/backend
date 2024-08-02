const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mailRouter = require("./routes/index");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/mail", mailRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
