## T-SQL : 데이터 형식 

- T-SQL 고급

```sql
-- 데이터 형식
	* 숫자
		BIT 0/1/NULL > Boolean
		TINYINT 양의 정수
		SMALLINT 정수
		INT 정수
		BIGINT 정수
		DECIMAL(p,[s]) 고정 정밀도(p), 배울(s) 숫자형 
										> p자릿수, 소수점 이하 s자릿수
		FLOAT[(n)] n이 25미만이면 4바이트, 25이상이면 8바이트 할당

		MONEY 화폐단위
		SAMLLMONEY 화폐단위

			** DECIMAL / NUMERIC / MONEY / SMALLMONEY > 정확한 수치
			** FLOAT / REAL > 근사치, 상대적 큰 수 
					>> 소수점 포함 실수 DECIMAL 권장

	* 문자
		CHAR[(n)] 고정 길이 문자형 / 영어, 기호, 숫자  4바이트
							// 대용량 데이터 4글자 미만 저장 경우 > INSERT / UPDATE 시에 더 성능 좋
		NCHAR[(n)] 한글 포함  8바이트
									> 유니코드 문자형 입력시 N'문자열' 권장 / 다양한 언어 입력
											 > 한글 운영체제에서 한글/영어 생략 가능
													> 한글 / 영어만 입력 확실 > CHAR / VARCHAR 더 성능 좋
		VARCHAR[(n | max)] 가변 길이 문자형 / max > 2GB
		NVARCHAR[(n | max)] 한글 포함
		VARBINARY[(n | max)] 가변 길이 이진 데이터 / max > 2GB
													>> 이미지 / 동영상 저장⭐⭐
															* FILESTREAM

		** 대용량 데이터 저장   약2GB
				VARCHAR(MAX)
				NVARCHAR(MAX)
				VARBINARY(MAX) > BLOb(이미지, 동영상, 음악 등 이진데이터)
													// 2GB 이상 > FILESTREAM 사용

	* 날짜 / 시간
		DATETIME2 YYYY-MM-DD 시:분:초
		DATE YYYY-MM-DD
		TIME 시:분:초

		ex) SELECT CAST('2002-10-19 12:35:29.123' AS DATETIME) AS 'DATETIME'
					// DATETIME
					// 2002-10-19 12:35:29.123
			  SELECT CAST('2020-10-19 12:35:29.123456 +12:15' AS DATE) AS 'DATE'
					// DATE
					// 2020-10-19
					// +표준시 표시

	*
		CURSOR T-SQL 커서를 변수로 처리
		TABLE 테이블 자체 저장 > 임시 테이블 유사
		XML XML 데이터 저장 최대 2GB
		GEOMETRY/GEOGRAPHY 공간 데이터 형식
												> 선, 점 및 다각형 개체 저장 및 조작 가능

	* 변수
		DECLARE @변수명 데이터형식;
		SET @변수명 = 변수 값;
		SELECT @변수명;
			> 일시적 사용, 재사용 x >> 한 번 실행시 바로 소멸
			>> 쿼리문 모두 한번에 실행 필요!

-- 데이터 형식 연관 시스템 함수
			>> 데이터 손실 방지를 위한 데이터 길이(자릿수, 크기 등) 확인 주의!

	* 데이터 형식 변환 함수 < 명시적 형변환
⭐ CAST() // 시스템 함수
					CAST ( expression AS 데이터형식[(길이])
⭐ CONVERRT() // 시스템 함수
					CONVERT ( 데이터형식[(길이)], expression [ , 스타일] )
					// 이진 데이터와 문자 데이터 상호 변환 가능
					// 오류 발생 가능
		TRY_CONVERT() // 변환 함수
							 ( 데이터형식[(길이)], expression [ , 스타일] )
				// 반환에 실패할 경우 정상 실행, NULL 값 반환
		PARSE()  // 변환 함수
				 (문자열 AS 데이터형식)  // 문자열 > 날짜/시간 및 숫자 형식
		TYR_PARSE() > 오류 방지  // 변환 함수
						 (문자열 AS 데이터형식)
				// 반환 실패 시 NULL 값 반환

	* 암시적 형변환
			문자 + 숫자 > 숫자
				> CAST 사용 명확한 표시 권장

		** 형 변환시 자릿수 주의!!

```