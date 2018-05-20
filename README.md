####  Global template: git-hooks


##### Rely on
----
    nodeJs Version 8.0.0


##### Flow chart
----
![流程图](https://github.com/huoxuhuoxu/git-hooks/blob/master/images/nodeJs%E5%AE%9E%E7%8E%B0Git%E5%88%86%E5%B8%83%E5%BC%8F%E8%87%AA%E5%8A%A8%E5%8C%96%E9%83%A8%E7%BD%B2%E7%B3%BB%E7%BB%9F.png "Node.js Git分布式自动化部署系统 流程图")


##### Global env
----
    eslint Version 3.0.0
    cnpm/npm Version 5.0.0
    nginx
    docker



##### Using
----

1. 在git服务器上部署此项目
2. 删除仓库内的hooks文件，将此项目下hooks文件与仓库建立 *软链接*


##### Realization
----




##### Testing
----

1. npm run test_service: 测试服务器
2. npm run test: 启动测试

