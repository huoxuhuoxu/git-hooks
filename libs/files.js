/**
 *  @readme
 *      提供文件相关的拓展方法
 * 
 */

const fs = require("fs");

module.exports.is_exists = (real_path) => {

    const exists = fs.existsSync(real_path);
    if (!exists) return false;

    try {
        fs.accessSync(real_path, fs.constants.R_OK);
        return true;
    } catch(err){
        return false;
    }

};


