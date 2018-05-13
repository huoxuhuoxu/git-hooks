// color

const util = require("util");

const log = (...args) => {

    console.log(args);

    let aFormat = args.splice(0, 2);
    let sFormat = util.format(aFormat);

    console.log(aFormat, sFormat, ".....");

    console.log(sFormat, ...args);
};

exports.info = (...args) => {
    log("\x1b[32m", ...args, "\x1b[0m");
}

