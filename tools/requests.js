// requests
const http = require("http");
const https = require("https");

class DiyRequest {

    constructor (origin, body = {}, method = "GET"){

        this.method = method;
        this.body = body;
        this.origin = origin;

    }

    __getOptions (){
        let arr = this.origin.match(/(https?):\/\/(.*)*?(?::(\d+))/);
        if (arr.length < 4) throw Error("origin format error!");
        return [
            arr[1],
            {
                hostname: arr[2],
                post: arr[3],
                path: "/pushGitService",
                method: this.method
            }
        ];
    }

    __dateToURI (){
        let s = "";
        for (let [k, v] in Object.entries(this.body)){
            s += `&${k}=${v}`;
        }
        return s.substr(1);
    }

    exec (){
        let [ sProtocol, options ] = this.__getOptions(this.url);
        let oProtocol = sProtocol === "http" ? http : https;
        let req, sPostData;

        if (this.method.toLowerCase === "get"){

            let sData = this.__dateToURI();
            options.path += `?${sData}`;
            req = oProtocol.request(options);

        } else {
            sPostData = JSON.stringify(body);
            options.headers = {
                'Content-Type': "application/json",
                'Content-Length': Buffer.byteLength(sPostData)
            };
            req = oProtocol.request(options);
            req.write(sPostData);
        }

        req.on("error", () => {
            console.log("[error] 出现了错误...");
        });
        sPostData || req.write(sPostData);

        req.end();
        
    }

}

