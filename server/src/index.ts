import app from "./server";
import * as dotenv from "dotenv";
dotenv.config();
app.listen(3001, (req, res) => {
  console.log("hello from 3001");
});
