## T-SQL : SQL 프로그래밍

```sql
* IF... ELSE ...
	-- IF / ELSE 문 등 (한 문장 이상) 처리될 때는 
			BEGIN ... END로 묶어줘야 실행⭐

	IF <부울 표현식>
		BEGIN
			SQL 문1...
		END
	ELSE
		BEGIN
			SQL 문2...
		END

* CASE
	-- 다중 분기
			: 위에서 부터 순차적 적용 주의!

	CASE
		WHEN ...
		WHEN ...
		...
		(ELSE ...)
	END (AS ...)

* WHILE, BREAK, CONTINUE, RETURN

	WHILE <부울 식>
		BEGIN
			SQL문...
		END
	
	// WHILE 주로 CURSOR와 함께 사용

* GOTO
	-- 사용 x 권장 / 지정 위치로 무조건 이동 > 라벨 이용
	// try catch 랑 자주 쓰임

* WAITFOR
	-- 일시정지

	WAITFOR DELAY  : 지정 시간만큼 일시정지 
	WAITFOR TIME : 지정한 시각에 실행

* TRY / CATCH, RAISEERROR, THROW ⭐
	-- 오류 처리

	BEGIN TRY
		SQL 문...
	END TRY
	BEGIN CATCH
		 오류 처리 문...
	END CATCH

		** ERROR_NUMBER() : 오류 번호
			 ERROR_MESSAGE() : 오류 메세지
			 ERROR_SEVERITY() : 오류 심각도
			 ERROR_STATE() : 오류 상태 번호
			 ERROR_LINE() : 오류를 발생시킨 행 번호
			 ERROR_PROCEDURE() : 오류가 발생한 저장 프로시저나 트리거의 이름 

* EXEC (동적 SQL) ⭐
	-- EXEC/EXECUTE SQL문 실행 : 문자열의 실행

	SET @문장명 = 'SQL문...'
	EXEC(@문장명)

	>> 테이블 등 개체명이 동적으로 변할 때 사용

** 복합 연산자 += / -= / *= / /= 등 사용 가능
** DECLARE 구문 바로 값 대입 가능 ex) DECLARE @var1 INT = 100 
```