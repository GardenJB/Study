## 전체 텍스트 검색

:  긴 문장으로 구성된 열의 내용을 검색할 때, 인덱스 사용

- 구성관리자 > SQL Full-text Filter Daemon Launcher 사용
- 전체 텍스트 인덱스
    - 테이블 당 하나만
    - 테이블에 Primary Key/Unique Key 필요

```sql
CREATE FULLTEXT INDEX ...
```

```sql
- 전체 텍스트 카탈로그 생성
		: 전체 텍스트 인덱스 저장 가상 공간
			전체 텍스트 인덱스 생성 전 생성 필수
	
	CREATE FULLTEXT CATALOG ...

- 인덱스 채우기
		: 전체 텍스트 인덱스 생성 및 관리
	* 전체 채우기
	* 변경 내용 추적 기반 채우기
			WITH CHANGE_TRACKING AUTO
	* 증분 타임스탬프 기반 채우기

- 중지 단어
		: 검색 제외 단어

- 전체 텍스트 검색 쿼리
	* CONTAINS : WHERE 절에서 사용
		- NEAR
		- ISABOUT ... weight(0.n)...
	* FREETEXT : WHERE 절 사용, 
							 단어가 정확하게 일치x 비슷한 단어 포함 검색
	* CONTAINSTABLE, FREETEXTTABLE : 검색 단어 포함 열 키 및 순위 
																	 가장 정확도 높은 열부터 출력 등
																		> 주로 join 사용
																	 FROM 절 사용
```