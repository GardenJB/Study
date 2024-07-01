### db 복사 이후 계정 중복으로 인해 권한 인식 오류
>>> mssql  사용 다음 에러를 해결하기 위해 db접근 권한 및 owner 권한을 abcd에게 부여하는 쿼리문 failed to execute stored procedure > recomList: RequestError: The server principal "abcd" is not able to access the database "AAAA" under the current security context.

```
USE [AAAA];
GO

-- 데이터베이스 소유자 권한 부여
ALTER AUTHORIZATION ON DATABASE::[AAAA] TO [abcd];
GO






USE [AAAA];
GO

-- 데이터베이스 사용자 생성 (이미 생성되어 있으면 생략)
CREATE USER [abcd] FOR LOGIN [abcd];
GO

-- 데이터베이스 접근 권한 부여
ALTER ROLE [db_datareader] ADD MEMBER [abcd];
ALTER ROLE [db_datawriter] ADD MEMBER [abcd];
GO





```