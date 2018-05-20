##### 依赖
----
    nodeJs Version 8.0.0


##### 流程图
----
![流程图](https://github.com/huoxuhuoxu/git-hooks/blob/master/resources/nodeJs%E5%AE%9E%E7%8E%B0Git%E5%88%86%E5%B8%83%E5%BC%8F%E8%87%AA%E5%8A%A8%E5%8C%96%E9%83%A8%E7%BD%B2%E7%B3%BB%E7%BB%9F.png "Node.js Git分布式自动化部署系统 流程图")


##### 流程图说明
----
>   分为两个部分:   
>   hooks部分，也就是这个项目   
>   监听进程部分[前往仓库](https://github.com/huoxuhuoxu/hooks-service "监控进程部分仓库")

    hooks部分负责存在push时执行脚本
        post-receive 
            1. 部署此项目自身（你得给这个项目建立个仓库）
            2. 通知各主机的监控进程有仓库存在新的提交
        update
            检查提交文件的语法规范，存在不符合的，提交失败
    
    监控进程部分负责等待hooks部分通知 某项目/某分支 存在新的提交，拉取代码并重启项目



##### 使用的环境变量
----
    eslint Version 3.0.0
    cnpm/npm Version 5.0.0



##### 安装
----
    1. 在git服务器上部署此项目, 并执行 npm install, 需要全局安装 eslint
    2. 新建仓库 
        e.g git init --bare test.git
    3. 进入test.git, 删除仓库内的hooks文件，将此项目下hooks文件与仓库建立 *软链接* 
        e.g ln -s /xx/git-hooks/hooks /xx/xx/test.git
    4. 修改hooks/post-receive文件40行，将其改成当前此项目在你主机上的路径
    5. 建议将此项目部署在 git仓库 所在的同一用户下


##### 配置
----
    config.yaml
        ips: 有项目提交需要通知运行了监控进程的主机
        api_post_receive: hooks - post-receive 触发时调用监控进程的接口
        api_is_running: 检查监控进程是否正常运作接口，用于自动化部署监控进程项目导致其重启后检查是否成功重启
        git_hooks_env: git的hooks有独立的环境变量，需要把实际用到的环境变量在运行命令时导入进去

    deploy.yaml
        run: 自动化部署此项目时需要运行的脚本, 最终以数组形式遍历执行




##### 说明
----
    hooks
        post-receive:   push成功后通知各主机更新项目
        update:         push时检测语法

    post-receive:
        1. 提交的项目就是此项目，切换目录执行git pull
        2. 提交的项目是监控进程项目，通知所有主机更新，并且通知完成后等待5秒，检查监控进程是否成功重启
        3. 提交的项目为其他时, 通知所有主机有项目更新了，传递仓库名称，分支

    update:
        找出提交时的commit id与版本库<head>的commit id存在差异的文件，对这些文件进行语法检查,只有检查全部通过，push才会成功

        目前只检查*.js文件: hooks/update 34行配置




##### 测试
----

    1. npm run test_service:    启动测试服务器
    2. npm run test:            启动测试


##### 后续待开发与改进的内容
----
1.  执行hooks: update时, 检查差异文件的大小，过大的情况下不检查，防止卡死/检查速度过慢
2.  目前只对master进行自动化部署, 之后增加其他分支的自动化部署
3.  目前默认语法检查只有.js, 之后时情况新增默认检查

