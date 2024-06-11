## 240522

#### 1. git

###### git 수정

- 새 프로젝트 생성에서 상위 폴더와 다르게 하위 폴더에서 git 원격 연결이 안됨
  > nest.js 프로젝트 생성시 폴더 내 git 폴더 새로 생성됨
  >
  > > 자동 생성된 nest 프로젝트 내부 git 폴더 삭제 필요

###### git branch

- 생성

```
git branch -b branch_name
```

으로 원격과 연결해 생성하기

#### 2. Nest.js

###### 로컬 실행 시 자동 반영

> 프로젝트에서 프로덕션 모드와 개발 모드는 수정 사항 반영이 다름

```
개발 모드로 실행 > 수정 사항 바로 반영
npm run start:dev
nest start --watch
```

프로덕션 모드 실행 : npm run start / nest start

###### module

- contoroller & service > module을 통해 한번에 import 하기
  > controllers / providers

###### dto : create api 작성에서 newboard의 필드 순서가 달라 에러 발생

- javascript dto 객체 순서 보장 x
  > > 필드 순서를 명시해주기

```
create(data: CreateBoardDto) {
    const newBoard = {
      id: this.getNextId(),
      ...data
    };
    this.boards.push(newBoard);
    return newBoard;
  }
```

> >

```
create(data: CreateBoardDto) {
    const newBoard = {
      id: this.getNextId(),
      title: data.title,
      content: data.content,
    };
    this.boards.push(newBoard);
    return newBoard;
  }
```

#### etc

##### prettier

- 원인을 못 찾겠지만 계속 파일마다 prettier 문법 형식 오류가 나타남

```
> npx prettier --write .
```

##### param 설정

- '`' 과 ''' 사용 구분

##### array

- slice > 시작위치부터 값만큼 원소 제거
- pop > 맨 마지막 요소 제거 및 반환


## 24.06.11

### 저장 프로시저 호출

  * db 접근 권한 옵션 추가

```
// app.module
... TypeormModule.forRoot({
  ...
  options: {
        trustServerCertificate: true,
      },
})

```

  * 프로시저 호출
  
  ```
  const queryRunner = this.MyRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();
    const result = await queryRunner.query(`query`)
    await queryRunner.release();
    return result;
 ```


 