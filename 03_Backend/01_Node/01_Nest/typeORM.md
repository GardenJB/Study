## 240612
#### Nest.js TypeORM MSSQL 저장 프로시저 호출 반환값 문제
* 저장 프로시저 내부에 select문이 여러개일 경우(복수의 테이블이 반환) 반환값이 첫번째 테이블만 돌아오는 문제 발생

> node.js mssql ConnectionPool 사용
  : 값은 전체 테이블이 받아옴
    But db 연결이 여러번 다른 채널로 이루어지는 문제 발생

## 240613
#### Nest.js TypeORM MSSQL 저장 프로시저 호출 반환값 문제
* 저장 프로시저 내부에 select문이 여러개일 경우(복수의 테이블이 반환) 반환값이 첫번째 테이블만 돌아오는 문제 발생
  > typeorm
    nodemodule typeorm > mssql QueryRunner 
      raw > recordset만 처리하고 recordsets은 처리 로직이 없는 문제
      >> recordsets 더하는 구문을 추가

    DataSource QueryRunner.query(`exec proc_name`, [params], true)

    But 도커파일로 올릴때 nodemodule 수정 반영의 문제 발생 


#### for문 변수 복사 - 주소 참조
 > 같은 변수를 바라볼 경우 이전 값이 새로운 값으로 변경 됨

#### 값 받아오기
> [{}] < arr[0][0] 접근



### API 작성
##### API 경로 찾는 순서
```
@Get('abc')
( @Qurery('nnn') 
  @Query('mmm')
)
@Get(`:id`)
(
  @Param('id')
)
@Get('bcc')
(
  @Query('ccc')
)

>> 순서의 경우 맨 아래 @Get('bcc') 요청이 위의 @Get(`:id`)로 들어가서 오류
>> PathParams 사용 경우를 맨 아래로 위치 변경 
  혹은 오류 방지를 위해 api 요청 url 통일해서 변경


```