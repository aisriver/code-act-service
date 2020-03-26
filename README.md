# Code Act Service

配合命令行工具 codeact 使用的一项辅助开发的解决方案

![md_1](https://github.com/aisriver/code-act-service/raw/master/docs/images/01.jpg)

![md_1](https://github.com/aisriver/code-act-service/raw/master/docs/images/02.jpg)

## 使用方法

- npm install -g codeact

- 到工程文件下执行 codeact 即可

## 文件操作类接口说明

- baseUrl http://localhost:7001

- Folder 相关

| 地址              | 类型 |                            参数 |                     说明 |
| :---------------- | :--: | ------------------------------: | -----------------------: |
| /folder/add       | GET  |                path、folderName |               新增文件夹 |
| /folder/delete    | GET  |                path、folderName |               删除文件夹 |
| /folder/rename    | GET  | path、folderName、newFolderName |             文件夹重命名 |
| /folder/structure | GET  |                                 | 获取工程下的文件结构数据 |

- File 相关

| 地址         | 类型 |           参数 |         说明 |
| :----------- | :--: | -------------: | -----------: |
| /file/add    | GET  | path、fileName |     新增文件 |
| /file/delete | POST |           path |     删除文件 |
| /file/read   | GET  |           path | 文件内容读取 |
| /file/modify | GET  |     path、text | 文件内容修改 |

### 拓展及说明

- codeact 会生成配置文件 你可以自己搭建一个服务关联到 codeact，一切都可以自定义

- 本服务添加了一个代码生成器与文件直接关联的示例（Grid 布局生成器），其他生成器可自行拓展

- 保存快捷键与常用编辑器一致

- [codeact](https://github.com/aisriver/codeact.git)

##### 遇到问题？或者你有更好的建议，欢迎一起讨论

- WeChat：mrliaojun Email：767882503@qq.com

### github

[Jared](https://github.com/aisriver/code-act-service.git)
