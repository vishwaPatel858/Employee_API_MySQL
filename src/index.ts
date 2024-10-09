import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/employee.routes.ts";
const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listning on port ${PORT}`);
});
app.use("/employee",router);
