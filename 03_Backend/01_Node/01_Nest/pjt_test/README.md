## 프로젝트 수동생성

```
npm i --save @nestjs/core @nestjs/common rxjs mssql
```

### 암호화

```
npm install --save-dev @types/crypto-js
```

## DTO 유효성 검사

```
npm i --save class-validator class-transformer
```

## TypeORM

```
npm i --save mssql typeorm @nestjs/typeorm

npm install @nestjs/typeorm typeorm mssql
```

#### TypeORM 다수 데이터베이스 연결 Ref 예시

```
TypeOrmModule.forRootAsync({
      name: 'default',
      useFactory: async () => {
        return {
          type: 'oracle',
          host: process.env.HOST,
          port: process.env.PORT,
          sid: process.env.SID,
          username: process.env.USERNAME,
          password: process.env.PASSWORD,
          entities: [],
          dropSchema: false,
          synchronize: false,
          keepConnectionAlive: true,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
     TypeOrmModule.forRootAsync({
      name: 'second',
      useFactory: async () => {
        return {
          type: 'mysql',
         host: process.env.HOST,
          port: process.env.PORT,
          username: process.env.USERNAME,
          password: process.env.PASSWORD,
          database: process.env.DATABASE,
          entities: [],
          dropSchema: false,
		  synchronize: false,
          keepConnectionAlive: true,
        } as TypeOrmModuleAsyncOptions;
      },
    }),    

```
```
 constructor(
    @InjectDataSource('default')
    private readonly mainDataSource: DataSource
    @InjectDataSource('second')
    private readonly subDataSource: DataSource
  ) {}
```


###### db 스키마 정보 
```
npm i --save typeorm-model-generator

npx typeorm-model-generator -h [dbhost주소] -d [데이터베이스이름] -p [port] -u [유저] -x [비밀번호] -e [db종류] -o [entity 파일 위치] (--case-file none  // snakecase>camelCase) 
```

## React Hook
####  useForm 
  : props > id 적용 / validation
#### useReduce
  : state 관리 + switch-case

#### useDefferedValue
+ #### useMemo 
  : 자동완성

#### useSyncexternalStore
  + window 객체

##
