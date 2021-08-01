require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

app.use("/dashboard", require("./routes/dashboard"));

//admin
app.use("/admin", require("./routes/admin"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
