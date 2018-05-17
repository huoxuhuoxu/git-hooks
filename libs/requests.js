// requests
const http = require("http");
const https = require("https");
const { URL } = require("url");
const assert = require("assert");

const get = async (protocol, url, callback) => {
    return new Promise((resolve, reject) => {
        protocol.get(url, callback.bind(null, resolve, reject))
                .on("error", (e) => {
                    reject(e);
                });
    });
};

const post = async (protocol, options, data, callback) => {
    return new Promise((resolve, reject) => {
        const req = protocol.request(options, callback.bind(null, resolve, reject));
        req.on("error", (e) => { reject(e); });
        req.write(data);
        req.end();
    }); 
};

const getOptions = (origin, path, body, method) => {
    const originArr = origin.split("://");
    const pathArr = originArr[1].split(":");
    let hostname = pathArr[0], 
        port = originArr[0] === "http" ? 80 : 443;
    if (pathArr.length > 1) {
        port = pathArr[1];
    }

    const postData = JSON.stringify(body);
    const options = {
        hostname,
        port,
        path,
        method,
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(postData)
        }
    };
    return [ options,  postData];
};

const callback = async (resolve, reject, res) => {

    const { statusCode } = res;
    const contentType = res.headers["content-type"];

    let error;
    if (statusCode !== 200){
        error = new Error("请求失败\n" + `状态码: ${statusCode}`);
    } else if (!/application\/json/.test(contentType)){
        error = new Error("无效 content-type\n" + `期望: application/json, 实际获取: ${contentType}`);
    }

    if (error){
        res.resume();
        reject(error);
        return ;
    }

    const chunks = [];
    res.setEncoding("utf8");
    res.on("data", chunk => {
        if (chunk !== null){
            chunks.push(chunk);
        }
    });
    res.on("end", () => {
        resolve(chunks.join(""));
    });
    res.on("error", (e) => {
        console.error("[error] 错误: ", error.message);
        reject(e);
    });
};

module.exports = async (origin, pathname, body = {}, method = "GET") => {

    assert(/https?:\/\/.*/.test(origin), "origin-format error");

    let protocol = http;
    /^https/.test(origin) && (protocol = https);

    if (method.toLowerCase() === "get") {
        let search = "";
        for (let [k, v] of Object.entries(body)){
            search += `&${k}=${v}`;
        }
        return await get(protocol, `${new URL(pathname, origin).href}?${search.substr(1)}`, callback);
    }

    const [ options, data ] = getOptions(origin, pathname, body, method);
    return await post(protocol, options, data, callback);

}; 



