## T-SQL 개괄

- Transact-SQL(T-SQL) 기본

```sql
-- USE 사용 데이터베이스 지정
USE 데이터베이스명

-- SELECT 원하는 데이터 추출 / 조회 > 기본 PK로 정렬
WITH
SELECT
FROM WHERE
GROUP BY
HAVING
ORDER BY

SELECT 열이름(필드네임)
FROM 테이블명 >> SQL Server에서는 **스키마명.테이블명**
WHERE 조건

// * : 모든
// 인스턴스명.데이터베이스명.스키마명.테이블명

* 각 요소 이름이 정확하지 않을 때
EXECUTE sp_helpdb;
	> 현 데이터베이스 존재 db 정보 조회

EXECUTE sp_tables @table_type = " 'TABLE' " ;
	> db 내 테이블 정보 조회(스키마, 테이블)

EXECUTE sp_colums
	@table_name = '테이블명',
	@table_owner = '스키마명';
	> 테이블 내 열 정보 조회

--  AS 별칭 부여
	AS / []

// 개체 명칭 : 식별자

-- database 생성
	// 임시 DB위치에서 
 USE tempdb;
 GO
 CREATE DATABASE db명;
 GO

	USE db명;

-- tabel 생성
 CREATE TABLE table명
 ( 필드명 속성...,
		...
 );
 GO

** 자동증가 속성 부여 IDENTITY
			IDENTITY [ (seed, increment)]   // seed : 처음 시작값
** 외래키 참조 FOREIGN KEY REFERENCES 테이블명(속성명)
** 고정길이 문자형 CHAR / 가변길이 문자형 VARCHAR / N___ 한글 포함
** 산수적 의미가 없는 숫자 > 문자 취급
** 정수 INT / SMALLINT(2bite 취급)

-- 데이터 입력 / 삽입
 INSERT INTO table명 
	VALUES ('속성1값', '속성2값', ...);

-- db 백업
 //다른 db위치
 USE tempdb;
 BACKup DATABASE db명 TO DISK = '백업데이터파일경로' WITH INIT;
```

```sql
-- 특정 조건의 데이터만 조회 WHERE 절
SELECT 필드이름
	FROM 테이블명
	WHERE 조건식;

-- 관계 연산자 사용
SELECT 필드이름 FROM 테이블명
	WHERE ...>= ... AND ... <=...;
			  ...>= ...	OR ... >= ...;

        속성 BETWEEN 값 AND 값;  // 연속값에서 사용
        속성 IN('값1', '값2',...);  //이산값(연속이 아닌 값)
 
        LIKE '값';
				** 값을 모두 알 경우 > 정확히 일치 = 사용
								일부 알 경우 > 부분 조건 일치 LIKE 사용
				** % 모든
				** _ 한글자
					// % / _ 는 인덱스 검색이 아닌 전체 검색 실행 
				 //		> 성능 나빠질 수 있음 주의

-- ANY / ALL / SOME / 서브쿼리(하위쿼리)
 -- 서브쿼리
		: 쿼리 문 내에 쿼리문 존재

SELECT ... FROM ...
	WHERE 속성 조건... (서브쿼리문); // 단일 값일 경우에만
								// 비교연산자 사용 (복수 값 반환 경우)
							  ...	ANY (서브쿼리문); // 값 중 하나 만족
										(=SOME)
								  	= ANY (서브쿼리문) = IN (서브쿼리문) 
								... ALL (서브쿼리문); // 값 모두 만족

-- 원하는 순서로 정렬 ORDER BY >> SQL Server 성능 저하 문제 유( 되도록 사용 지양)
 SELECT ... FROM ... 
	ORDER BY ... (ASC | DESC);
> 기본 오른차순 ASC
		>> 내림차순 변경 DESC

> 복수 조건 정렬
	SELECT .. FROM ...
		ORDER BY 정렬조건1, 정렬조건2, ...;

-- DISTINCT / TOP(N) / TABLESAMPLE 절
 SELECT DISTINCT ... FROM ...; // 중복 제거
 SELECT TOP(N)... FROM ...; // 상위 N개만 출력
	> TOP(N이 반환되는 쿼리문 가능) ** COUNT(...) 개수
	> TOP(0.1) PERCENT (WITH TIES)
 SELECT .. FROM ... TABLESAMPLE(...|N PERCENT); // 페이지 단위 `대략` N % 샘플 출력
 
 -- OFFSET / PATCH
	 -- OFFSET : 지정한 행의 수만큼 건너 뛴 후에 출력
								ex) paging 에서 사용 가능
		SELECT ... FROM ...
			ORDER BY ... // OFFSET 사용시 ORDER BY 필수
			OFFSET N ROWS; // n행 건너고 n+1행부터 출력
			(FETCH NEXT N ROWS ONLY;) // 건너뛴 후 n행만 출력 

-- SELECT INTO
 : 테이블 복사 사용
 SELECT 복사할열 INTO 새로운테이블 FROM 기존테이블;
	>> PK / FK 같은 제약조건은 복사되지 않음 주의! (데이터만 복사)

-- GROUP BY / HAVING
	
	[ WITH <common_table_expression>]
	SELECT select_list [ INTO new_table ]
	[ FROM table_source ]
	[ WHERE search_condition ]
	[ GROUP BY group_by_expression ]
	[ HAVING search_condition ]
	[ ORDER BY order_expression [ ASC | DESC ] ]
		>> 순서 주의!

-- 집계 함수
	AVG() 평균
	MIN() 최소값
	MAX() 최대값
	COUNT() 행의 개수/정수형 반환
	COUNT_BIG() 개수/bigint형 반환
	STDEV() 표준편차
	VAR() 분산
	
	SUM() 합
	CAST() / CONVERT() 정수> 실수 반환
		SELECT AVG(amount*1.0) AS [평균수] FROM table;
		SELECT AVG(CAST(amount AS DECIMAL(10,6))) AS [평균수) FROM table; // 구매물건 예시
	
	** 성능비교 > 추적실행

-- ROllUP() / GROUPING_ID() / CUBE()
	: 총합 / 중간합계 + GROUP BY 절
 SELECT .. FROM... 
	 GROUP BY ROLLUP ( 그룹명, 집계항목);  // 각 소합계 + 총합계
	 GROUP BY ROLLUP ( 그룹명 ) // 총합계
	 
 SELECT ... 
		, GROUPING_ID(그룹명) AS [추가행 여부] // 합계 행인지를 임시 추가 열에서 표시
	 FROM ...
	 GROUP BY ROLLUP(그룹명);

		// 함수 결과 0 : 데이터, 1: 합계열

* CUBE()  : 다차원 정보의 데이터 요약
 SELECT ... FROM ....
	GROUP BY CUBE ( 그룹1, 그룹2); // 그룹별 소합계, 총합계, 그룹별 소합계

-- WITH / CTE(Common Table Expression)
	* WITH 절 : CTE 표현 구문 // 조회할 일종의 임시 테이블 뷰
 WITH 가명(열1, 열2...) // 임시 테이블 생성
	AS
	( SELECT ... FROM...) // 실제 테이블 (1차 정보 조회)
	SELECT .. FROM 가명 ....; // 위에서 조회하는 CTE에서 정보 조회 (2차)
 
** GO 위, 아래 구문 분리
** 중복 CTE 허용
	WITH
		AAA(컬럼들)
			AS (AAA 쿼리문),
		BBB(컬럼들)
			AS (BBB 쿼리문),
		CCC(컬럼들)
			AS (CCC 쿼리문)
 SELECT ... FROM AAA | BBB | CCC >> CCC에서 AAA/BBB 참조 가능 / AAA, BBB에서 CCC 참조 불가능
																		 > 아직 정의되지 않은 CTE 미리 참조 불가능
																			>> 순서대로

** 비재귀적 / 재귀적 CTE
		> 구문의 단순화
		> 구문이 끝나면 같이 소멸 >> 앞 문장과 확실한 분리 필요

		* 비재귀적 CTE > 위의 WITH 문
		* 재귀적 CTE ex) 조직도 테이블
					WITH CTE_테이블명(열이름)
						AS
					(
						< 쿼리문1 : SELECT * FROM 테이블A >  // 앵커 멤버
						UNION ALL
						< 쿼리문2 : SELECT * FROM 테이블A JOIN CTE_테이블명 >  // 재귀 멤버
					)  // SELECT 결과가 아무것도 없을 때 재귀적 호출 중단
							// 누적 결과가 UNION ALL 결과로 출력
				SELECT * FROM CTE_테이블명;
						 
			** replicate(문자, 개수) : 해당 문자를 개수만큼 반복 함수
```

- T-SQL 분류

```sql
* T-SQL 분류

-- DML
	: 데이터 조작 언어 ( 선택, 삽입, 수정, 삭제)
	> 테이블의 행 대상 < 테이블 사전 정의 필요!( SELECT INTO는 동시 생성 가능 예외)
  * SELECT / INSERT / UPDATE / DELETE
  * 트랜잭션이 발생하는 SQL
			** 트랜잭션 : 테이블의 데잍터를 변경할 때 실제 테이블에 완전히 적용하지 않고,
										임시로 적용시키는 것
											>> 실수가 있을 경우 취소 가능

-- DDL
	: 데이터 정의 언어
	> 데이터베이스 개체 (테이터베이스, 테이블, 뷰, 인덱스 ...)
	> 트랜잭션 발생 x ~~(CREATE TABLE 등 예외 존재 b 고려 x)~~
	>> 실행 즉시 SQL Server에 적용 ( ROLLBACK / COMMIT 불가)
	* CREATE / DROP / ALTER

-- DCL
	: 데이터 제어 언어
	> 사용자 권한 설정 >> 보안
	* GRANT / REVOKE / DENY
```

```sql
* DELETE / TRUNCATE / DROP
	- DELETE : 데이터 삭제, 디스크 공간 유지
						 원하는 데이터만 삭제 가능
	- TRUNCATE : 데이터가 없는 최소 생성시 테이블 상태
							 모든 데이터 삭제, 칼럼값만 유지
							 용량 줄고 인덱스 등 모두 삭제
	- DROP : 데이터와 테이블 전체 삭제
					 사용 공간 및 인덱스, 제약조건 등 오브젝트도 삭제
```