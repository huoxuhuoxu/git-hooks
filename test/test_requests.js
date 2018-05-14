// test tools-requests
const requests = require("../tools/requests");

{
    (async () => {
       
        {
            console.log("\r\n[info] test requests - get");
            let resul = await requests("http://localhost:20001", "/getTest", {name: "peter", age: 12});
            console.log(resul);
        }
        
        {   
            console.log("\r\n[info] test requests - get: 404");
            try {
                await requests("http://localhost:20001", "/getTest404", {name: "peter", age: 12});
            } catch (err){
                console.log(err.toString());
            }
        }

        {
            console.log("\r\n[info] test requests - post");
            let resul = await requests("http://localhost:20001", "/postTest", {name: "peter", age: 12}, "POST");
            console.log(resul);
        }

        {   
            console.log("\r\n[info] test requests: Content-Type error");
            try {
                await requests("http://localhost:20001", "/getTestContentTypeError", {name: "peter", age: 12});
            } catch (err){
                console.log(err.toString());
            }
        }

        {   
            console.log("\r\n[info] test requests: origin format error");
            try {
                await requests("localhost:20001", "/getTest404", {name: "peter", age: 12});
            } catch (err){
                console.log(err.toString());
            }
        }

    })();
}





