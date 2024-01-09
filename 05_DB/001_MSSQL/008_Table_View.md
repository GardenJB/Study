## 테이블 / 뷰 

- 데이터베이스 개체 : 데이터베이스 안에 들어갈 수 있는 것들

```sql
* 테이블
	- 제약 조건
			< 데이터의 무결성을 지키기 위한 제한 조건

		- PRIMARY KEY  ⭐⭐
				: 구별 식별자
				: 중복 x, NULL x, only one
				: 자동으로 클러스터형 인덱스 생성
				: 설정 안하면 이름 자동 생성
					 > EXEC sp_help 테이블명; 으로 확인 가능
					 > CONSTRAINT 기본키명(PK_테이블명_기본기열) PRIMARY KEY 
							>> 마지막에 작성시
								 CONSTRAINT 기본키명 PRIMARY KEY (기본키열)
					> 테이블 만든 이후 설정
					  ALTER TABLE 테이블명
							ADD CONSTRAINT 기본키명
							PRIMARY KEY (기본키열); / (기본키열1, 기본키열2) 2개 열을 합쳐서 기본키로 설정
						GO

		- FOREIGN KEY  ⭐⭐
				: 두 테이블 사이의 관계 선언
				: 데이터의 무결성 보장
				 FOREIGN KEY REFERENCES 기준테이블명(기본키열)
				: CONSTRAINT로 이름 설정 가능
					CONSTRAINT 외래키명
						FOREIGN KEY(해당테이블열) REFERENCES 기본테이블명(기본키열)
				// 외래키는 참조 테이블 열은 반드시 Primary Key / Unique 제약 조건 설정 필수 ⭐
				
				- ON DELETE CASCADE / ON UPDATE CASCADE 옵션 ⭐
						: 기준 테이블의 데이터가 변경되었을 때
							외래 키 테이블도 자동으로 적용되도록 설정할 때
					<> ON UPDATE NO ACTION / ON DELETE NO ACTION (기본 설정)
			
		- UNIQUE
				: 중복되지 않는 유일한 값 
				: NULL 값 허용 (b 한개의 NULL 값만 허용 ⭐⭐)

		** identity 값 변경
					: 입력 실수, 삭제 후 재 입력 필요 경우
				DBCC CHECKIDENT('테이블이름', RESEED, 초기값)

		** sp_help / sp_helpconstraint > 제약 조건 확인
			 sys.key_constraints / sys.foreign_keys
			 SELECT * FROM 카타로그뷰_이름
				
		- CHECK  
				: 입력되는 데이터 점검
				
				CEHCK (제약 조건 문...);

				: 제약 조건(특정 데이터가 조건을 만족한 경우에만 입력 가능하도록 함)에 
					위배되는 값은 입력 불가

			- WITH CHECK / WITH NOCHECK 옵션 ⭐
					: 기존에 입력된 데이터가 CHECK 제약 조건에 맞지 않을 경우 설정
							 지금부터 or 기존까지

		- DEFAULT 
				: 자동 입력 기본값 설정
					- default 작성 / 작성 x
							열명 데이터 형식 ... DEFAULT 디폴트값
				: ALTER TABLE 에서 사용시 열 지정 위해 FOR 문 이용
							ALTER TABLE 테이블명
									ADD CONSTRAINT 디폴트명
											DEFAULT 디폴트값 FOR 열명; 

		- NULL 값 허용
				<> NOT NULL (PRIMARY KEY 설정시 NOT NULL 기본 적용)
				: 아무것도 없음 != '' / 0 ⭐
						>> NULL 설정시 고정 길이 문자형은 공간 모두 차지
								b 가변 길이 문자형은 공간 차지 x 
								>> NULL 입력이 많은 경우 가변 길이 문자형 활용 권장
				
				- 스파스 열
						: Null 값에 최적화된 저장소가 있는 일반 열
							> null 값이 많이 들어갈 것으로 예상되는 열에 지정
								>> 공간 절약 가능 (40% 절약  > null값 60% 이상일 때 사용)
										b 값이 입력 / SELECT 해댱 열 조회되면 오히려 공간을 더 차지하게 됨
										+ 여러 제약 사항 존재, 확인 필요!
						CREATE/ALTER TABLE에서 열 정의시 SPARSE 설정

		- 임시 테이블 ⭐
				: #(로컬) / ##(전역)  
				: tempdb에 생성
				: 로컬은 생성한 사람만 / 전역은 모든 사용자 사용 가능
				: 임시 테이블은 어느 데이터베이스에서도 동일하게 조회 가능

    *  테이블 삭제
				DROP TABLE 테이블명;
		- 외래키 제약 조건의 기준 테이블은 삭제 불가 ⭐
				> 외래키 테이블 먼저 삭제 후 기본키 테이블 삭제 가능
			* DROP TABLE 테이블1, 테이블2, ... // 여러개 동시 삭제 가능

		* 테이블 수정
				ALTER TABLE 
						: 이미 생성된 테이블에 추가/변경/수정/삭제 경우
						ADD COLUMN / DROP COLUMN / ALTER COLUMN

					- 열 추가
						USE 테이블명
						ALTER TABLE 테이블명
							ADD 열명 데이터형식
								[DEFAULT  디폴드값
								 (NOT) NULL]
						// 열 추가 > 가장 뒤에 추가

					- 열 삭제
						ALTER TABLE 테이블명
							DROP COLUMN 열명;
	
					 - 열 데이터 형식 변경
						 ALTER TABLE 테이블명
							ALTER COLUMN 열명 데이터형식 NULL여부; 
				
					 - 열 이름 변경 
						EXEC sp_rename '테이블명.열명', '새열명', 'COLUMN';
							: 이름 재설정
							: 권장 x
						
						DROP CONSTRAINT 제약 조건명 -- 열 제약 조건 삭제

		-- ALTER TABLE + WITH NOCHECK : 이미 입력된 데이터의 무결성을 무시하고 외래 키 관계 설정
			 > FOREIGN KEY / CHECK 제약 조건만 설정 가능
			 > PRIMARY KEY / UNIQUE 제약 조건 설정 x

			* 제약 조건 비활성화  : 생성 당시만 비활성, 이후 삭제 >> 제약 조건 활성화
				- NOCHECK CONSTRAINT 외래키명
				- ALTER TABLE 테이블명
					 WITH NOCHECK 
					 ...

		- 연결 데이터 자동 업데이트 옵션 설정
			ON UPDATE CASCADE -- 자동 업데이트
			ON DELETE CASCADE -- 자동 외래키 연관 행 삭제
			

		- 메모리 액세스에 최적화된 테이블
				> RAM에 테이블 존재
				: 빠른 속도
				: 휘발성 > 보조 복사본이 디스크에서 유지 관리 됨
				: 기본 키 및  비클러스터형 인덱스(NONCLUSTERED) 필요
	

		- 스키마
			: 데이터베이스 내에 있는 개체들을 관리하기 위한 묶음
						> dbo 기본값
				> 업무별 분리 >> 관리를 편하게 하기 위함
				* 기본 명 주의 : dbo, guest, INFORMATION_SCHEMA, sys
				> 보안 및 사용자에 활용

* 뷰 (가상의 테이블)
		: 읽기 전용 (SELECT 문)
		: 보안 도움 (정보 선별 접근 가능) (뷰를 통해 테이블 정보 수정 가능 - 제한적으로만 사용)
		: 복잡 쿼리 단순화

	- 수정 불가 뷰
			- 집계 함수 사용 뷰
			- UNION ALL, CROSS JOIN 등 사용 뷰
			- DISTINCT, GROUP BY 등 사용 뷰

		** WITH CHECK OPTION
			 INSTEAD OF 트리거

	- 표준 뷰
	- 분할 뷰 (여러 테이블 조인)
	- 이덱싱된 뷰 (실제 데이터 포함 - 인덱싱 구성 데이터 > 조회 자주 수정 적은 테이블에 구설)
	- 시스템 뷰

	** Ctrl + T : 텍스트 결과 표시
		 ctrl + D : 표 결과 표시

```