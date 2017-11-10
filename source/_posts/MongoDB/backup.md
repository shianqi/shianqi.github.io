---
title: MongoDB 数据备份与还原
date: 2017-10-30 10:52:21
tags: 
    - MongoDB
---
# MongoDB 数据备份与还原

## mongodump

`mongodump` 是针对数据库进行备份的官方工具。具体参数如下

```
general options:
      --help                                                print usage
      --version                                             print the tool version and exit

verbosity options:
  -v, --verbose=<level>                                     more detailed log output (include multiple times for more verbosity, e.g. -vvvvv, or specify a numeric value, e.g. --verbose=N)
      --quiet                                               hide all log output

connection options:
  -h, --host=<hostname>                                     mongodb host to connect to (setname/host1,host2 for replica sets)
      --port=<port>                                         server port (can also use --host hostname:port)

ssl options:
      --ssl                                                 connect to a mongod or mongos that has ssl enabled
      --sslCAFile=<filename>                                the .pem file containing the root certificate chain from the certificate authority
      --sslPEMKeyFile=<filename>                            the .pem file containing the certificate and key
      --sslPEMKeyPassword=<password>                        the password to decrypt the sslPEMKeyFile, if necessary
      --sslCRLFile=<filename>                               the .pem file containing the certificate revocation list
      --sslAllowInvalidCertificates                         bypass the validation for server certificates
      --sslAllowInvalidHostnames                            bypass the validation for server name
      --sslFIPSMode                                         use FIPS mode of the installed openssl library

authentication options:
  -u, --username=<username>                                 username for authentication
  -p, --password=<password>                                 password for authentication
      --authenticationDatabase=<database-name>              database that holds the user's credentials
      --authenticationMechanism=<mechanism>                 authentication mechanism to use

namespace options:
  -d, --db=<database-name>                                  database to use
  -c, --collection=<collection-name>                        collection to use

query options:
  -q, --query=                                              query filter, as a JSON string, e.g., '{x:{$gt:1}}'
      --queryFile=                                          path to a file containing a query filter (JSON)
      --readPreference=<string>|<json>                      specify either a preference name or a preference json object
      --forceTableScan                                      force a table scan

output options:
  -o, --out=<directory-path>                                output directory, or '-' for stdout (defaults to 'dump')
      --gzip                                                compress archive our collection output with Gzip
      --repair                                              try to recover documents from damaged data files (not supported by all storage engines)
      --oplog                                               use oplog for taking a point-in-time snapshot
      --archive=<file-path>                                 dump as an archive to the specified path. If flag is specified without a value, archive is written to stdout
      --dumpDbUsersAndRoles                                 dump user and role definitions for the specified database
      --excludeCollection=<collection-name>                 collection to exclude from the dump (may be specified multiple times to exclude additional collections)
      --excludeCollectionsWithPrefix=<collection-prefix>    exclude all collections from the dump that have the given prefix (may be specified multiple times to exclude additional prefixes)
  -j, --numParallelCollections=                             number of collections to dump in parallel (4 by default) (default: 4)
      --viewsAsCollections                                  dump views as normal collections with their produced data, omitting standard collections
```

### 对整个数据库备份

```shell
mongodump -o <directory-path>
```

其中 `<directory-path>` 是路径，默认为 `dump`

### 对某个 db 或者 collections 备份

```shell
mongodump -d <database-name> -c <collection-name> -o <directory-path>
```

其中 `<database-name>` 是数据库名， `<collection-name>` 是集合名

### 备份数据格式

不同的 `database` 存放在以 `<database-name>` 命名的文件内。

不同的 `collection` 有两个文件

* `<database-name>.bson` 存放数据
* `<database-name>.metadata.json` 存放表结构

<!-- more -->

## mongorestore

同 `mongodump` 是用来恢复的

```
namespace options:
  -d, --db=<database-name>                                  database to use when restoring from a BSON file
  -c, --collection=<collection-name>                        collection to use when restoring from a BSON file
      --excludeCollection=<collection-name>                 DEPRECATED; collection to skip over during restore (may be specified multiple times to exclude additional collections)
      --excludeCollectionsWithPrefix=<collection-prefix>    DEPRECATED; collections to skip over during restore that have the given prefix (may be specified multiple times to exclude additional prefixes)
      --nsExclude=<namespace-pattern>                       exclude matching namespaces
      --nsInclude=<namespace-pattern>                       include matching namespaces
      --nsFrom=<namespace-pattern>                          rename matching namespaces, must have matching nsTo
      --nsTo=<namespace-pattern>                            rename matched namespaces, must have matching nsFrom

input options:
      --objcheck                                            validate all objects before inserting
      --oplogReplay                                         replay oplog for point-in-time restore
      --oplogLimit=<seconds>[:ordinal]                      only include oplog entries before the provided Timestamp
      --oplogFile=<filename>                                oplog file to use for replay of oplog
      --archive=<filename>                                  restore dump from the specified archive file.  If flag is specified without a value, archive is read from stdin
      --restoreDbUsersAndRoles                              restore user and role definitions for the given database
      --dir=<directory-name>                                input directory, use '-' for stdin
      --gzip                                                decompress gzipped input

restore options:
      --drop                                                drop each collection before import
      --dryRun                                              view summary without importing anything. recommended with verbosity
      --writeConcern=<write-concern>                        write concern options e.g. --writeConcern majority, --writeConcern '{w: 3, wtimeout: 500, fsync: true, j: true}' (defaults to 'majority') (default: majority)
      --noIndexRestore                                      don't restore indexes
      --noOptionsRestore                                    don't restore collection options
      --keepIndexVersion                                    don't update index version
      --maintainInsertionOrder                              preserve order of documents during restoration
  -j, --numParallelCollections=                             number of collections to restore in parallel (4 by default) (default: 4)
      --numInsertionWorkersPerCollection=                   number of insert operations to run concurrently per collection (1 by default) (default: 1)
      --stopOnError                                         stop restoring if an error is encountered on insert (off by default)
      --bypassDocumentValidation                            bypass document validation
```

基本参数同 `mongodump` 已省略

* `--db , -d` ：
  
  需要恢复的数据库实例，例如：test，当然这个名称也可以和备份时候的不一样，比如test2

* `--drop`：
  恢复的时候，先删除当前数据，然后恢复备份的数据。就是说，恢复后，备份后添加修改的数据都会被删除，慎用哦！

* `<path>`：

  mongorestore 最后的一个参数，设置备份数据所在位置，例如：`c:\data\dump\test`。你不能同时指定 `<path>` 和 `--dir` 选项，`--dir`也可以设置备份目录。

* `--dir`：
  指定备份的目录。你不能同时指定 `<path>` 和 `--dir` 选项。

## mongoexport

可以把一个collection导出成JSON格式或CSV格式的文件。

**示例**：

```bash
mongoexport -d mi-insight -c users -o users.dat
```

默认为 `json` 格式

**导出CSV**

```bash
mongoexport -d mi-insight -c indexs --type csv -f _id,itemId,words -o date.csv
```

**建议不要使用csv导出数据，如果原有数据中存在对象，数组。使用csv导出数据后无法 100% 还原原始数据。**

## mongoimport

把一个特定格式文件中的内容导入到指定的collection中。

**示例**：

先删除原来的数据。

```shell
> db.users.remove()
> db.users.find()
>
```

然后再导入上面导出的 `users.dat` 文件中的内容

```shell
> ./bin/mongoimport -d mi-insight -c users users.dat
connected to: 127.0.0.1
imported 9 objects
```

**导入CSV**

```bash
mongoimport -d mi-insight -c indexs --type csv --headerline --file ./date.csv
```