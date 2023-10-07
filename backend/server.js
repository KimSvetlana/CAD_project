const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// app.use(bodyParser.json);





app.use(express.static("../frontend/dist/"));

app.get("/api/data", (req, res) => {
    let conePrams = req.query;
    console.log(`i have params: ${JSON.stringify(conePrams)}`)


    res.json({
        name: 'Sveta',        
    })
})


const port = 4000;
app.listen(port,  () => {
  console.log(`server running on  http://localhost:${port}`);
});