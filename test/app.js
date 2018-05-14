// test server

const url = require("url");
const queryString = require("querystring");
const http = require("http");

const Express = require("express");
const app = new Express();
const port = 20001;

app.post("/postTest", (req, res) => {
    const chunks = [];
    req.on("data", chunk => {
        if (chunk !== null){
            chunks.push(chunk);
        }
    });
    req.on("end", () => {
        const postData = chunks.join("");
        const data = JSON.parse(postData);
        console.log("[info]", data);
        res.set({
            "Content-Type": "application/json"
        });
        res.end("succ");
    });
});

app.get("/getTest", (req, res) => {
    console.log("[info]", queryString.parse(url.parse(req.url).query));
    res.set({
        "Content-Type": "application/json"
    });
    res.end("succ");
});

app.get("/getTestContentTypeError", (req, res) => {
    console.log("[info]", queryString.parse(url.parse(req.url).query));
    res.end("succ");
});

app.get("/getTes404", (req, res) => {
    console.log("[info]", queryString.parse(url.parse(req.url).query));
    res.statusCode = 404;
    res.end("succ");
});

http.createServer(app).listen(port, () => {
    console.log("[test service] starting, port: %s", port);
});

