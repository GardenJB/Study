## T-SQL : DML

- DML

```sql
1. 데이터 변경
	-- 데이터 삽입
		INSERT [INTO] <테이블> [(열1, 열2, ...)] VALUES ( 값1, 값2, ...)
			// 테이블명 다음 열명들은 생략 가능
			// b 값 입력시 순서 및 개수가 정의된 열 순서 및 개수와 동일해야 함
			// 일부 값 생략하고 싶으면 테이블명 다음 입력 열 목록 명시 필요
					 >> NULL 값 부여
			// 입력 순서 변경 시 테이블명 다음 입력 열 목록 입력할 순서대로 명시 필요
		
				** tempDB > 임시, SQL Server 재가동 경우 내용 모두 삭제 주의

	  [WITH CTE_테이블명()...]
		INSERT [INTO] <CTE_테이블명> ...
			// 순서, 타입 확인 / 열 입력 제외시 기분 NULL값 부여, NOT NULL 속성 확인 필

		** 자동 증가 테이블 속성 IDENTITY
				> INSERT 입력 속성 제외 가능, 1부터 자동 증가 값 부여
		** 지정 디폴트 값 부여 DEFAULT
				: CREATE 시 속성 타입 옆에 DEFAULT '디폴트값' 정의
				> 속성값 입력대신 DEFAULT 입력
	  ** 강제로 identity 값 입력
		  SET IDENTITY_INSERT 테이블명 ON;
			GO
			INSERT INTO 테이블명(id, ...) VALUES (11, ...);
				// 이후 다시 OFF 설정 / 이후 최대값+1부터 자동 부여

		 -- 시스템 저장 프로시저 사용 정보 조회
				* 열의 목록 및 기타 정보 출력
						EXECUTE sp_help 테이블명;
				* 특정 테이블에 설정된 현재의 IDENTTTY 값 확인
						SELECT IDENT_CURRENT('테이블명'); // 특정 테이블 지정 해당 테이블 설정 IDENTITY 값 확인
						SELECT @@IDENTITY; // 현재 세션(쿼리창)에서 가장 최근에 생성된 ID값 확인

	
			-- SEQUENCE (IDENTITY와 같은 효과) 개체 ( Oracle과의 호환성)
						// SEQUENCE : 개체 / IDENTITY : 문장
			
				CREATE SEQUENCE 시퀀스명
					START WITH 시작값
					INCERMENT BY 증가값
				GO
			 >> 데이터 입력시 NEXT VALUE FOR 시퀀스명 사용
					ex) INSERT INTO 테이블명 VALUES ( NEXT VALUE FOR 시퀀스명, ...);
				> id 강제 부여 시 >> 그냥 원하는 값 입력
						> 시퀀스 시작 값 재설정 !!
					ex) INSERT INTO 테이블명 VALUES( 11, ...);
							GO
							ALTER SEQUENCE 시퀀스명
								RESTART WITH 12; // 재설정
							GO
							INSERT INTO 테이블명 VALUES ( NEXT VALUE FOR 시퀀스명, ...);

				** 특정 범위 설정해 반복 입력 가능
					CREATE SEQUENCE 시퀀스명
						START WITH 시작값
						INCREMENT BY 증가값
						MINVALUE 최소값 // 반복 구간 설정 최소값, 최대값
						MAXVALUE 최대값
						CYCLE; // 반복 설정

				** 시퀀스에 DEFAULT 설정 가능 >> 값 입력시 제외 가능
						ex) id int DEFAULT (NEXT VALUE FOR 시퀀스명);

			** INSERT 한문장으로
					INSERT INTO 테이블명 VALUES (행1의 값1, 값2...), (행2의 값1, 값2...), ...;

			-- 대량의 샘플데이터 생성 // 기존의 대량 데이터 필요(형식 같)
				: INSERT INTO ... SELECT 구문
				
				INSERT INTO 테이블명 (열1, 열2, ...)
					SELECT 문 ;
				
				SELECT ...
					INTO 테이블명
					FROM 기존 데이터;

2. 데이터 수정
	-- UPDATE
		UPDATE 테이블명
			SET 열1=값1, 열2=값2, ...
			WHERE 조건; // 생략시 테이블 전체 행에 반영 주의!

3. 데이터 삭제
	-- DELETE
		DELETE 테이블명 WHERE 조건;
		> 행 단위 삭제 
		// WHERE 문 생략시 전체 데이터 삭제 주의!

	* DELETE FROM
			: 트랜잭션 로그를 기록 > 삭제 시간 길
	*	DROP TABLE
			: 테이블 자체 삭제, 트랜잭션 로그 기록 x
	* TRUNCATE TABLE
			: 트랜잭션 로그 기록 x > 삭제 시간 빨
			: 테이블 구조 남겨둠
			~~// WHERE 문 사용 불가  >> 전체 삭제 때 활용 권장~~ 
	* TSQL_Duration

-- MERGE 
	: 조건부 데이터 변경
		 > 하나의 문장에서 INSERT / UPDATE / DELETE 수행
		>> 한번에 부여, 직접 입력의 실수 방지 
	
	MERGE 변결될 테이블(target table) AS M
	USING 변경할 기준이 되는 테이블 (source table) AS C
ex) ON M.id = C.id
		WHEN NOT MATCHED AND 속성 = 'a' THEN
			INSERT (속성....) VALUES(C.속성명, ...)
		WHEN MATCHED AND 속성 = 'b' THEN
			UPDATE SET M.속성 = C.속성
		WHEN MATCHED AND 속성 = 'c' THEN
			DELETE;
```