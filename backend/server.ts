import express, { Express, Request, Response , Application } from 'express';
import { triangulate } from "./triangulation"

const app: Application = express();

interface IConeParams {
  height: number,
  radius: number,
  numSegments: number
}

app.use(express.static("../frontend/dist/"));

app.get("/api/data", (req: Request, res: Response) => {
    let coneParams = req.query as unknown as IConeParams;
    let objData = triangulate(coneParams.height, coneParams.radius, coneParams.numSegments);
    res.send(objData);
})


const port = 4000;
app.listen(port,  () => {
  console.log(`server running on  http://localhost:${port}`);
});