import app from "./server";
import * as dotenv from "dotenv";
dotenv.config();
app.listen(process.env.PORT, (req, res) => {
  console.log("CONNECTED TO SERVER...");
});
