import express from "express";
import router from "./router/index.js";

const app = express();

app.use(express.static("public"));
app.use("/api", router);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
