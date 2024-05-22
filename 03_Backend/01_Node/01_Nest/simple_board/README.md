## 240522

#### 1. git 
###### git 수정
 * 새 프로젝트 생성에서 상위 폴더와 다르게 하위 폴더에서 git 원격 연결이 안됨
 > nest.js 프로젝트 생성시 폴더 내 git 폴더 새로 생성됨
 >> 자동 생성된 nest 프로젝트 내부 git 폴더 삭제 필요

###### git branch
* 생성
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


