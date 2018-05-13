####  全局git-hooks模版
    
    线上项目的git-hooks使用的脚本

##### 流程简述

    1. git-hooks项目服务器端hooks
    2. git-hooks项目线上目录
    3. git-hooks项目线上目录作为git-hooks的模版目录
    git-hooks项目push时，由服务器端hooks下post-receive监控, 前往git-hooks项目向上目录下执行git pull, 之后前往git用户下的git仓库文件目录, 在需要更新hooks脚本的.git仓库下执行 git init 更新hooks脚本
    
    问: 需要测试, 服务器端的hooks文件会不会被 global配置的hooks文件更新


