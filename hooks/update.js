#!/usr/local/node/bin/node

require("dotenv").config({path: "/home/git/product/git-hooks/.env"});

const execSync = require("child_process").execSync;
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const { is_exists } = require("../libs/files");
const { info, warn, error } = require("../libs/colors");

/**
 *  @describe
 *      push代码时进行语法检测
 * 
 *      lint: 需要检查的文件类型
 *      ignore: 过滤，不需要进行检查的项目
 *      
 * 
 */


const lint = {
    ".js": {
        name: "eslint"
    }
}


const ignore = [];

const main = () => {

    const config_pathanme = path.resolve(process.env.hooks_dirname, process.env.config_filename); 

    const [ , , branch, old_commit, new_commit ] = process.argv;
    const paths = process.cwd().split("/");
    const warehourse = paths[paths.length - 1].split(".git")[0];
    
    if (is_exists(config_pathanme)){
        
        if (ignore.includes(warehourse)){
            return warn("[warning] 项目 %s 不需要进行语法检测 ...", warehourse);
        }
        info("[info] 对项目 %s, 分支: %s 进行检查 ...", warehourse, branch);

        const f = fs.readFileSync(config_pathanme);
        const { git_hooks_env } = yaml.safeLoad(f); 

        // 获取有修改的文件，e.g "hooks/update\nhooks/post-receive\n"
        const s_change_file = execSync(`${git_hooks_env} 'git diff --name-only ${old_commit} ${new_commit}'`).toString();
        const files = s_change_file.split("\n");

        for (let i=0, l=files.length - 1; i<l; i++ ){
            const file_path = files[i];
            info("[info] 检查文件 %s", file_path);
            try {
                error(execSync(`\
                    ${git_hooks_env} \
                    'git show ${new_commit}:${file_path} | \
                    eslint \
                    --stdin \
                    --stdin-filename="" \
                    --no-inline-config \
                    --ignore-path /home/git/product/git-hooks/.eslintignore \
                    -c /home/git/product/git-hooks/.eslintrc.js | cat'\
                `).toString());
            }catch(err){
                console.log("..", err.message || err.toString());
            }        
        }

        // return info()

    }

    error("[error] 配置文件不存在或无读取权限, 检查项目 %s 失败", warehourse);
    
};


{
    if ( !module.parents ){

        (() => {
            try {
                main();
            } catch(err){
                error("[error] 发生了错误", err.toString());
            }

        })();

    }
}
