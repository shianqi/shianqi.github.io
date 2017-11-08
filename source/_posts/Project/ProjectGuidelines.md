---
title: 项目指引
date: 2017-07-10 19:57:36
tags:
    - Project
---

# 项目指引

- [Git](#git)
- [Environments](#environments)
- [Dependencies](#dependencies)
- [Testing](#testing)
- [Structure and Naming](#structure-and-naming)
- [Code style](#code-style)
- [Logging](#logging)
- [API Design](#api-design)
- [Licensing](#licensing)

## 1. Git <a name="git"></a>
### 1.1 Some Git Rules
有一套要牢记的规则：
* 在 `feature` branch 进行工作.

    _why:_
    > 因为这样，所有的工作都是在一个专门的分支而不是主分支上隔离完成的。 它允许您提交多个拉请求而不会混淆。 您可以迭代，而不会污染具有潜在不稳定的未完成代码的主分支。 [read more...](https://www.atlassian.com/git/tutorials/comparing-workflows#feature-branch-workflow)

* 从 `develop` 拓展分支

    _why:_
    > 这样，您可以确保master中的代码几乎总是无问题地构建，并且可以直接用于发行版（对于某些项目而言，这可能是过度的）。

* 不要`develop`或`master`上push分支。 做一个拉请求。

    _why:_
    > 它通知团队成员已完成功能。 它还能够轻松地对代码进行同行评审，并专门讨论论坛讨论所提出的功能

* 在 push 你的 `feature` 并且提交一个 `Pull Request` 的时候，你应该先更新你本地 `develop` 分支，并且做一次交互式 `rebase`

    _why:_
    > Rebasing将在请求的分支（`master`或`develop`）中合并，并将您本地进行的提交应用于历史的顶端，而不创建合并提交（假设没有冲突）。 产生一个漂亮和干净的历史。[read more ...](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)

* 在 `Pull Request` 前，解决潜在冲突，并且 `rebasing`

* 合并后删除本地和远程功能分支。

    _why:_
    > 它会使您的分支列表中的死枝混乱，确保您只将合并到（`master`或`develop`）一次。 功能部门只能在工作进行中存在。
* 在 `Pull Request` 前，确保你的 `feature` 分支可以构建成功并且通过所有测试（包括代码风格）

* 使用 [.gitignore](./.gitignore).

* 保护你的 `develop` 和 `master` 分支 .

### 1.2 书写良好的 commit messages

 * **将主体与身体之间用换行符分开**
 * 用一个空行隔开标题和正文
 * 限制标题字数在 50 个字符内
 * 标题行的首字母大写
 * 不要用句号结束标题行
 * 在标题行使用祈使语气
 * 正文在 72 个字符处换行
 * 使用正文解释是什么和为什么，而不是如何做

## 3. 环境<a name="environments"></a>

### 3.1 一致的开发环境:
* 在 `package.json` 的 `engines` 中配置你所用的 `node` 版本
    ```
    { "engines" : { "node" : ">=0.10.3 <0.12" } }
    ```
    _why:_
    > 让他人知道你所用的 node.js 版本 [read more...](https://docs.npmjs.com/files/package.json#engines)

* 另外，使用 `nvm` 并在您的项目根目录中创建一个 `.nvmrc`。 不要忘了在文档中提及它

    _why:_
    > 所有使用 `nvm` 的人都可以简单的使用 `nvm use` 去选择合适的 node 版本 [read more...](https://github.com/creationix/nvm)

* 您还可以使用 `preinstall` 脚本来检查节点和npm版本

    _why:_
    > 当使用新的版本node时，有些项目可能会失败

* 使用 Docker images，只要它不会使事情更复杂

    _why:_
    > 它可以在整个工作流程中为您提供一致的环境。 没有太多的需要解决libs，依赖或配置。[read more...](https://hackernoon.com/how-to-dockerize-a-node-js-application-4fbab45a0c19)

* 使用本地模块，而不是使用全局安装的模块

    _why:_
    > 让你与你的同事分享你的工具，而不是期望他们在他们的系统上。

## 4. 依赖 <a name="dependencies"></a>
在使用包之前，请检查它的GitHub。 查找开放问题的数量，每日下载次数和贡献者数量以及上次更新软件包的日期。

* 如果不太了解依赖关系，请在使用之前与团队进行讨论。
* 跟踪您当前可用的包： e.g： `npm ls --depth=0`. [read more...](https://docs.npmjs.com/cli/ls)
* 看看您的任何包裹是否已被使用或不相关: `depcheck`. [read more...](https://www.npmjs.com/package/depcheck)
* 检查下载统计信息，查看依赖关系是否被社区大量使用: `npm-stat`. [read more...](https://npm-stat.com/)
* 检查依赖关系是否具有良好的成熟版本发布频率与大量的维护者: e.g., `npm view async`. [read more...](https://docs.npmjs.com/cli/view)
* 始终确保您的应用程序适用于最新版本的依赖关系而不会中断: `npm outdated`. [read more...](https://docs.npmjs.com/cli/outdated)
* 检查包是否有已知安全漏洞, e.g, [Snyk](https://snyk.io/test?utm_source=risingstack_blog).

### 4.1 一致的依赖:
* 在 `npm@5` 或者更高版本上使用 `package-lock.json`
* 对于旧版本的 `npm`, 当安装新的依赖时使用 `--save --save-exact` 并且发布前创建一个 `npm-shrinkwrap.json`
* 或者你可以使用 `Yarn` 并且确保在 `README.md` 中提及. 你的 lock 文件和 `package.json` 在每次依赖关系更新后应该具有相同的版本。
* 多读读这里： [package-locks | npm Documentation](https://docs.npmjs.com/files/package-locks)

## 5. 测试 <a name="testing"></a>
* 如果需要，请使用测试模式环境。
* 使用 `*.test.js` 或 `*.spec.js` 命名约定将测试文件放在测试模块旁边
* 将其他测试文件放入一个单独的测试文件夹以避免混淆。
* 写可测试代码，避免副作用，提取副作用，写纯函数
* 不要写太多的测试来检查类型，而是使用静态类型检查器
* 做任何  对 `develop` 的 `pull requests` 前进行测试
* 文档化您的测试，并附上说明。

## 6. 结构和命名 <a name="structure-and-naming"></a>
* 围绕产品功能/页面/组件组织您的文件，而不是角色

**Bad**

```
    .
    ├── controllers
    |   ├── product.js
    |   └── user.js
    ├── models
    |   ├── product.js
    |   └── user.js
```

**Good**

```
    .
    ├── product
    |   ├── index.js
    |   ├── product.js
    |   └── product.test.js
    ├── user
    |   ├── index.js
    |   ├── user.js
    |   └── user.test.js
```
* 使用 `./config` 文件夹。 配置文件中使用的值由环境变量提供。
* 将脚本放在 `./scripts` 文件夹中。 这包括用于数据库同步，构建和捆绑等的 `bash` 和 `node` 脚本。
* 将构建输出放在 `./build` 文件夹中。 将 `build/` 添加到 `.gitignore`。
* 使用 `PascalCase`（帕斯卡拼写法） 和 `camelCase`（驼式命名法） 作为文件名和目录名。 使用 `PascalCase` 仅用于组件名。
* `CheckBox/index.js` 应该有 `CheckBox` 组件， 但 **不是** `CheckBox/CheckBox.js` 或者 `checkbox/CheckBox.js`，这些是冗余的。
* 理想情况下，目录名称应与 `index.js` 默认导出的名称相匹配。

## 7. 代码风格 <a name="code-style"></a>
* 为新项目使用 `stage-1` 和更高版本的JavaScript（现代）语法。 对于旧项目，与现有语法保持一致，除非您打算使项目现代化。
* 在构建过程之前包括代码样式检查
* 使用 [ESLint - Pluggable JavaScript linter](http://eslint.org/) 来强制执行代码样式。
* 使用 [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) 的JavaScript样式指南，[阅读更多](https://www.gitbook.com/book/duk/airbnb-javascript-guidelines/details)。使用项目或您的团队所需的JavaScript风格指南。
* 使用 [Flow type style check rules for ESLint.](https://github.com/gajus/eslint-plugin-flowtype) ，当使用 [FlowType](https://flow.org/)时
* 使用 `.eslintignore` 从代码样式检查中排除文件或文件夹。
* 删除任何 `eslint` 禁用注释，然后再执行 `Pull Request` 。
* 始终使用 `//TODO:` 评论来提醒自己和他人关于未完成的工作。
* 始终评论并保持与代码更改相关。
* 尽可能删除注释的代码块。
* 避免生产中的js警报。
* 避免不相关或有趣的评论，日志或命名（源代码可能会交给另一家公司/客户，他们可能不会分享同样的笑声）。
* 编写可测试代码，避免副作用，提取副作用，写纯函数。
* 使您的名字可以搜索到有意义的区别，避免缩短名称。 对于函数使用长的描述性名称。 功能名称应该是一个动词或动词短语，需要传达其意图。
* 按照降档规则在文件中组织您的功能。 较高级别的职能应在上下级以上。 这样读取源代码就更为自然了。

## 8. 日志 <a name="logging"></a>
* 避免生产中的客户端控制台日志
* 生产可读的生产日志。 理想地使用在生产模式下使用的日志记录库（[winston](https://github.com/winstonjs/winston) 或
[node-bunyan](https://github.com/trentm/node-bunyan)）

## 9. API 设计 <a name="api-design"></a>
遵循资源导向的设计。 这有三个主要因素：resources, collection, 和 URLs.
* 资源具有数据，与其他资源的关系以及对其进行操作的方法
* 一组资源称为集合
* URL标识资源的在线位置


### 9.1 API Naming

#### 9.1.1 Naming URLs
* `/users` 一组用户（复数名词）。
* `/users/id` 具有特定用户信息的资源。
* 资源始终应该是URL中的复数。 将动词从资源网址中删除。
* 使用动词非资源。 在这种情况下，您的API不会返回任何资源。 而是执行一个操作并将结果返回给客户机。 因此，您应该在URL中使用动词而不是名词来清楚地区分与资源相关的响应中的非资源响应。

GET 	`/translate?text=Hallo`

#### 9.1.2 Naming fields
* 请求体或响应类型是JSON，请遵循 `camelCase` 来保持一致性。
* 公开资源，而不是数据库模式详细信息。 您不必使用您的 `table_name` 作为资源名称。 与资源属性相同，它们不应与您的列名称相同。
* 仅在您的网址命名中使用名词，不要尝试解释其功能，只能解释资源（优雅）


### 9.2 Operating on resources

#### 9.2.1 Use HTTP methods
Only use nouns in your resource URLs, avoid endpoints like `/addNewUser` or `/updateUser` .  Also avoid sending resource operations as a parameter. Instead explain the functionalities using HTTP methods:

* **GET**		Used to retrieve a representation of a resource.
* **POST**	Used to create new resources and sub-resources
* **PUT**		Used to update existing resources
* **PATCH**	Used to update existing resources.  PATCH only updates the fields that were supplied, leaving the others alone
* **DELETE**	Used to delete existing resources

### 9.3 Use sub-resources
Sub resources are used to link one resource with another, so use sub resources to represent the relation.
An API is supposed to be an interface for developers and this is a natural way to make resources explorable.
If there is a relation between resources like  employee to a company, use `id` in the URL:

* **GET**		`/schools/2/students	`	Should get the list of all students from school 2
* **GET**		`/schools/2/students/31`	Should get the details of student 31, which belongs to school 2
* **DELETE**	`/schools/2/students/31`	Should delete student 31, which belongs to school 2
* **PUT**		`/schools/2/students/31`	Should update info of student 31, Use PUT on resource-URL only, not collection
* **POST**	`/schools `					Should create a new school and return the details of the new school created. Use POST on collection-URLs

### 9.4 API Versioning
When your APIs are public for other third parties, upgrading the APIs with some breaking change would also lead to breaking the existing products or services using your APIs. Using versions in your URL can prevent that from happening:
`http://api.domain.com/v1/schools/3/students	`

### 9.5 Send feedbacks
#### 9.5.1 Errors
Response messages must be self descriptive. A good error message response might look something like this:
```json
{
"code": 1234,
"message" : "Something bad happened",
"description" : "More details"
}
```
or for validation errors:

```json
{
  "code" : 2314,
  "message" : "Validation Failed",
  "errors" : [
    {
      "code" : 1233,
      "field" : "email",
      "message" : "Invalid email"
    },
    {
       "code" : 1234,
       "field" : "password",
       "message" : "No password provided"
    }
  ]
}
```
Note: Keep security exception messages as generic as possible. For instance, Instead of saying ‘incorrect password’, you can reply back saying ‘invalid username or password’ so that we don’t unknowingly inform user that username was indeed correct and only password was incorrect.

#### 9.5.2 Align your feedback with HTTP codes.
##### The client and API worked (success – 2xx response code)  
* `200 OK` This HTTP response represents success for `GET`, `PUT` or `POST` requests.
* `201 Created` This status code should be returned whenever a new instance is created. E.g on creating a new instance, using `POST` method, should always return `201` status code.
* `204 No Content` represents the request was successfully processed, but has not returned any content. `DELETE` can be a good example of this. If there is any error, then the response code would be not be of 2xx Success Category but around 4xx Client Error category.

##### The client application behaved incorrectly (client error – 4xx response code)
* `400 Bad Request` indicates that the request by the client was not processed, as the server could not understand what the client is asking for.
* `401 Unauthorized` indicates that the request lacks valid credentials needed to access the needed resources, and the client should re-request with the required credentials.
* `403 Forbidden` indicates that the request is valid and the client is authenticated, but the client is not allowed access the page or resource for any reason.
* `404 Not Found` indicates that the requested resource was not found.
* `406 Not Acceptable` A response matching the list of acceptable values defined in Accept-Charset and Accept-Language headers cannot be served.
* `410 Gone` indicates that the requested resource is no longer available and has been intentionally and permanently moved.

##### The API behaved incorrectly (server error – 5xx response code)
* `500 Internal Server Error` indicates that the request is valid, but the server could not fulfill it due to some unexpected condition.
* `503 Service Unavailable` indicates that the server is down or unavailable to receive and process the request. Mostly if the server is undergoing maintenance or facing a temporary overload.


### 9.6 Resource parameters and metadata
* Provide total numbers of resources in your response
* The amount of data the resource exposes should also be taken into account. The API consumer doesn't always need the full representation of a resource.Use a fields query parameter that takes a comma separated list of fields to include:
    ```
    GET /student?fields=id,name,age,class
    ```
* Pagination, filtering and sorting don’t need to be supported by default for all resources. Document those resources that offer filtering and sorting.


### 9.7 API security
#### 9.7.1 TLS
To secure your web API authentication, all authentications should use SSL. OAuth2 requires the authorization server and access token credentials to use TLS.
Switching between HTTP and HTTPS introduces security weaknesses and best practice is to use TLS by default for all communication. Throw an error for non-secure access to API URLs.

#### 9.7.2 Rate limiting
If your API is public or have high number of users, any client may be able to call your API thousands of times per hour. You should consider implementing rate limit early on.

#### 9.7.3 Input Validation
It's difficult to perform most attacks if the allowed values are limited.
* Validate required fields, field types (e.g. string, integer, boolean, etc), and format requirements. Return 400 Bad Request with details about any errors from bad or missing data.

* Escape parameters that will become part of the SQL statement to protect from SQL injection attacks

* As also mentioned before, don't expose your database scheme when naming your resources and defining your responses

#### 9.7.4 URL validations
Attackers can tamper with any part of an HTTP request, including the URL, query string,

#### 9.7.5 Validate incoming content-types.
The server should never assume the Content-Type. A lack of Content-Type header or an unexpected Content-Type header should result in the server rejecting the content with a `406` Not Acceptable response.

#### 9.7.6 JSON encoding
A key concern with JSON encoders is preventing arbitrary JavaScript remote code execution within the browser or node.js, on the server. Use a JSON serialiser to entered data to prevent the execution of user input on the browser/server.


### 9.8 API documentation
* Fill the `API Reference` section in [README.md template](./README.sample.md) for API.
* Describe API authentication methods with a code sample
* Explaining The URL Structure (path only, no root URL) including The request type (Method)

For each endpoint explain:
* URL Params If URL Params exist, specify them in accordance with name mentioned in URL section
```
Required: id=[integer]
Optional: photo_id=[alphanumeric]
```
* If the request type is POST, provide a working examples. URL Params rules apply here too. Separate the section into Optional and Required.
* Success Response, What should be the status code and is there any return data? This is useful when people need to know what their callbacks should expect!
    ```
    Code: 200
    Content: { id : 12 }
    ```
* Error Response, Most endpoints have many ways to fail. From unauthorised access, to wrongful parameters etc. All of those should be listed here. It might seem repetitive, but it helps prevent assumptions from being made. For example
    ```json
    {
        "code": 403,
        "message" : "Authentication failed",
        "description" : "Invalid username or password"
    }   
    ```


#### 9.8.1 API design tools
There are lots of open source tools for good documentation such as [API Blueprint](https://apiblueprint.org/) and [Swagger](https://swagger.io/).

## 10. Licensing <a name="licensing"></a>
Make sure you use resources that you have the rights to use. If you use libraries, remember to look for MIT, Apache or BSD but if you modify them, then take a look into licence details. Copyrighted images and videos may cause legal problems.


---
Sources:
[RisingStack Engineering](https://blog.risingstack.com/),
[Mozilla Developer Network](https://developer.mozilla.org/),
[Heroku Dev Center](https://devcenter.heroku.com),
[Airbnb/javascript](https://github.com/airbnb/javascript)
[Atlassian Git tutorials](https://www.atlassian.com/git/tutorials)
