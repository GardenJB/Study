## 인덱스

: db 성능 ⭐⭐⭐

→ SELECT / 튜닝

** 처음부터 끝까지 차례로 찾기 > 테이블 검색(Table Scan) 이용

** 인덱스와 테이블 별도의 디스크에 분리하는 것이 병렬 처리로 디스크 경합을 줄여 더 효율적

** 튜닝 (전체 서버 성능(작업량) 고려 개선 필)

- 응답시간을 빠르게
- 서버 부하량 최소화
- 클러스터형 인덱스 > 영어 사전
    - 인덱스 자체가 db 내용과 같이 정렬
    - 테이블당 하나만 가능
    - 행 데이터를 인덱스로 지정한 열에 맞춰서 자동 정렬
    
- 비클러스터형 인덱스 (보조) > 찾아보기
    - 테이블당 여러개 생성 가능

```sql
* 자동 생성 인덱스
	: 열 단위
	: 기본키 설정 > 자동 클러스터형 인덱스 생성
										비클러스터형 가능(NONCLUSTERED 설정 가능)

	: Unique > 자동 비클러스터형 인덱스 생성 (CLUSTERED 설정 가능)
```

```sql
* B-Tree 자료구조 (균형 트리 구조)
	> 각 리프 페이지 헤드 데이터 > 루트 페이지

	- 자료 검색
	- 페이지 분할 > 부담

* 클러스터형 인덱스 / 비클러스터형 인덱스
	- 클러스터형 
			: 인덱스 자체에 데이터 포함 > 검색에 더 빠름
	- 비클러스터형 
			: 인덱스 페이지와 데이터 페이지 분리 > INSERT 더 빠름(페이지 분할 적음)
			: 데이터 위치 포인트 > '페이지 번호 + #오프셋' (데이터 위치) - RID

* 클러스터 비클러스터 혼합
	> 삽입/삭제/수정에 유리

		** Table Scan
			 Index seek
			 RID Lookup
			 Clustered Index Seek
			 Key Lookup
			 Clustered Index seek

* 인덱스 검색 < WHERE 절에 해당 인덱스 생성 열 이름 나와야 함

** 포괄열에 있는 인덱스 : 비클러스터형 인덱스의 리프페이지에 데이터를 포함하고 있는 열.
													즉, 포괄열이 있는 인덱스는 데이터페이지 찾아가지 않아도 됨
		키 열은 index에 저장
		아닌 열은 리프 수준에 저장

-- 인덱스 생성
	 CRATE INDEX 인덱스명
	
	INCLUDE > 포괄 열에 인덱스 생성 옵션
  ON 파일 그룹 옵션 > 인덱스 별도 파일에 저장(분할 인덱스)
	WHERE > 필더링된 인덱스 및 통계 생성 > 특정 조건에 맞는 데이터만 인덱스 생성 가능
	
	PAD_INDEX / FILLFACTOR 인덱스 페이지 생성할 때 얼마나 여유를 두는지
								FILLFACTOR 높이면 > 인덱스 생성시 공간 비율 높(2배) > 공간 분할 학률 낮
																	> 검색 시간 느려짐 / 데이터 입력이 자주라면 성능향상 도움
							 인덱스 생성 WHERE 절 열 이름에 아무런 함수나 연산 가하지 말아야 함

	SORT_IN_TEMPDB 디스크 분리 효과
	ONLINE 인덱스 생성 중에도 기본 테이블에 쿼리 가능
	MAXDOP 인덱스 생서시 사용할 CPU 개수 강제 지정
	DATA_COMPRESSION 인덱스 압축 여부
	
	sys.indexes  인덱스 현재 설정 값 확인

-- 인덱스 변경 
	ALTER INDEX

	REBUILD 인덱스 삭제하고 다시 생성
		USE 데이터베이스명
		ALTER  INDEX  ALL ON 테이블명
			REBUILD
			WITH(ONLINE = ON);
		REORGANIZE 인덱스 다시 구성

	-- 인덱스 제거
		 DROP INDEX 테이블명.인덱스명

		** Primary Key, Unique 제약조건으로 자동 생성 인덱스는 삭제 불가
			 PERSISITED 계산 열에서 인덱스 활용 가능

**  인덱스 열 단위 생성
		WHERE 절 사용 열에 인덱스 생성 + 자주 사용
		데이터의 중복이 높지 x
		외래 키가 사용되는 열에 인덱스 생성 필요 
		JOIN에 자주 사용되는 열에 인덱스 생성 필요
		INSERT/UPDATE/DELETE 빈도 고려 필요
		클러스터 인덱스는 테이블 당 하나만 생성 
				(클러스터형 인덱스 + 포괄 열이 있는 인덱스 생성 > 둘다 클러스터형 인덱스 효과 가능)
    클러스터 인덱스가 테이블에 아예 없을 필요도 있음 >> 대용량 회원 데이터 경우 고려
		사용x 인덱스 제거 필요
		계산 열에도 인덱스 활용 가능
		 
 
```