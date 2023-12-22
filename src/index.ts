import express from "express";
import { environment } from "./validation/env.validation";


const app = express();
const port = environment.PORT;


app.get("/", (req,res) =>{
  res.send("Chal ja bsdk")
} )

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
