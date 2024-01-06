## T-SQL : 스칼라 함수

: 단일 값 적용 단일 값 반환

: 기본 제공 함수

```sql
* 구성 함수
	@@LANGID 현재 설정된 언어의 코드 번호 및 언어 확인
	@@LANGUAGE

	@@SERVERNAME 현재 인수턴스 이름 확인
	@@SERVICENAME 서비스 이름 반환

	@@VERSION 현재 설치된 SQL Server 버전, CPU 종류, 운영체제 버전 정보

* 날짜 및 시간 함수
	SYSDATETIME() 현재 날짜와 시간
	GETDATE() 

	DATEADD() 날짜에 더한 결과 반환 
		Day 대신 year, month, week, hour, minute, second 등 가능
		ex) SELECT DATEADD(day, 10, '2019/10/10);
	DATEDIFF() 두 날짜의 차이 반환
		ex) SELECT DATEDIFF(week, GETDATE(), '2027/10/19');
	DATENAME() 날짜의 지정한 부분 반환
		ex) SELECT DATENAME(weekday, '2022/10/19'); 
				> 2022년 10월 19일이 무슨 요일인지 반환

	DATEPART 지정 날짜의 연 또는 월 또는 일을 반환
	DAY() 지정 날짜의 일 반환
	MONTH() 지정 날짜의 월 반환
	YEAR() 지정 날짜의 년 반환

	DATEFROMPARTS() 문자열 > 날짜 데이터 형식 반환

	EOMONTH() 입력 날짜 포함 달의 마지막 날 반환
		ex) SELECT EOMONTH('2019-3-3');
					>  2019년 3월 마지막 날짜 반환
				SELECT EOMONTH(GETDATE(), 3);
					> 오늘 날짜에서 3개월 후의 마지막 날짜 반환

* 수치 연산 함수
	ABS() 절대값
	ROUND() 반올림
	RAND() 0 ~ 1 임의의 숫자 반환
	SQRT() 제곱근값
	POWER() 거듭제곱값   

* 메타 데이터 함수
	: 데이터베이스 및 데이터베이스 개체 정보 반환

	COL_LENGTH() 테이블 컬럼 길이
	
	DB_ID() DB ID/이름 반환
	DB_NAME()

	OBJECT_ID() Object(>테이블) ID/이름 반환
	OBJECT_NAME()	

* 논리 함수
	CHOOSE() 여러 값 중 지정된 위치의 값 반환
	IIF() 파라미터로 수식, 참일 때, 거짓일 때 3가지 사용
		ex) SELECT IIF( 100 > 200, '맞다', '틀리다');
					> '틀리다' 반환

* 문자열 함수 ⭐⭐
	ASCII() 문자 아스키 코드값 / 아스키 코드값 문자(0~255 범위) 반환
	CHAR()

	CONCAT() 둘 이상 문자열 연결 / '+'
	
	UNICODE() 문자의 유니코드값/유니코드값 문자 반환
	NCHAR()

	CHARINDEX() 문자열 시작 위치 반환
	LEFT() 지정 위치부터 왼쪽/오른쪾 지정한 수만큼 반환
	RIGHT()
	SUBSTRING() 지정 위치부터 지정 개수의 문자 반환
	
	LEN() 문자열 길이 반환
	LOWER() 대문자 > 소문자 변환
	UPPER() 소문자 > 대문자 변환

	LTRIM() 왼쪽/오른쪽 공백 문자 제거
	RTRIM()

	REPLACE() 문자열 내용을 지정 내용으로 변환
		ex) SELECT REPLACE('SQL Server 2016', 'Server', '서버');
					> 'SQL Server 2016'에서 'Server'을 찾아 '서버'로 변경
	REPLICATE() 문자열을 지정한 수만큼 반복
	REVERSE() 문자열의 순서를 거꾸로

	SPACE() 공백을 지정한 수만큼 반복
	STR() 숫자를 문자로 변환 
		>> CAST / CONVERT 사용 권장
	
	STUFF() 문자를 지정한 위치의 개수만큼 삭제 후, 새로운 문자 삽입
	FORMAT() 지정된 형식으로 출력	
```

```sql
* MAX 지정자
	< 대량의 데이터 입력

*
	.WRITE
	PRINT 
			PRINT N'...(문자열)'
			PRINT ...
	
	UPDATE 구문 열명.WRITE()  // (N)VARCHAR(MAX) 데이터 형식 열에 사용
													 // 기존 내용 변경
													 // .WRITE(새로 입력될 문자, 문자 시작 위치, 길이)
													// 문자 시작 위치에서 길이 만큼 잘라내 새로 입력될 문자를 그 위치에 복사
			>> .STUFF() 에 비해 더 빠름 
			>> (N)VARCHAR(MAX) 데이터 형식 내용 수정 경우 권장 ⭐

* 순위 함수
	OVER(...)
	ROW_NUMBER()
	DENSE_RANK() // 동일 순위 부여
	RANK() // 동일 순위 부여+ (3>4등) 중복 순위 제외 순서
	
	NTILE() // 그룹으로 분할
	PARTITION BY

	<순위함수명>() OVER (
		[PARTITION BY <partition_by_list>]
		ORDER BY <order_by_list>)
	
* 분석 함수
		: 여러 개의 행 반환 가능
	LEAD()  // 다음 행과의 차이 표시
	LAG()  // 이전 행과의 차이 표시
	FIRST_VALUE()  // 각 그룹별 가장 선순위간 차이 표시
	CUME_DIST() //누적
	PERCENTILE_CONT() // 중앙값(근사값)
	PERCENTILE_DISC() // 정확한 중앙값(열의 값)
	
* PIVOT / UNPIVOT 연산자
		: 한 열 여러값 <> 여러 열 변환 테이블
	
* JSON 데이터
	> 키: 값
	FOR JSON AUTO;  // SQL Server 테이블 > JSON
		<> OPENJSON()  // JSON > 테이블

	ISJSON()   // 문자열 JSON 형식 : 1, 아니면 : 0 반환
	QUERY()   // JSON 데이터 중 하나의 행 추출
	.JSON_VALUE()   // 속성 값 추출
	** $.속성명(열명)  // JSON 데이터 속성 표시   
```