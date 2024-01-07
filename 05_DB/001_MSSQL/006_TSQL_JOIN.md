## T-SQL : JOIN

: 두 개 이상의 테이블을 서로 묶어서 하나의 결과 집합으로 만들어 내는 것

- 테이틀 무결성을 위해 분할
    
    < 다시 합
    
- INNER JOIN    // 양쪽 모두 데이터가 있어야 표시
    
    ```sql
    SELECT <열 목록> -- 출처 테이블 명시 필 > AS 활용
    	FROM <첫 번째 테이블>
    		INNER JOIN <두 번째 테이블>
    			ON <조인될 조건> -- 두 테이블이 같아야 함
    	[WHERE 검색 조건]
    ```
    
- OUTER JOIN    // 한 쪽만 데이터가 있어도 표시
    - 조인의 조건에 만족되지 않는 행까지 포함
        - 없는 데이터도 조회 가능
        - ( = 한쪽을 기준으로 조건과 일치하지 않는 것을 출력)

```sql
SELECT <열 목록>
	FROM <첫 번째 테이블(LEFT TABLE)>
		<LEFT | RIGHT | FULL> OUTER JOIN <두 번째 테이블(RIGHT 테이블)>
			-- LEFT : 왼쪽의 모든 행이 나타나야 함
			ON <조인될 조건>
	[WHERE 검색조건];  // Join 한 결과에서 where 절 검사

** FULL OUTER JOIN
		: 전체 조인 
		:	LEFT OUTER JOIN + RIGHT OUTER JOIN
		// 양쪽 모두에 조건이 일치하지 않는 것을 모두 출력 
```

- CROSS JOIN (카티션곱)
    - 모든 행 조인
        - 대량 데이터 발생
        - n * n
        - ON 절 사용 x
- SELF JOIN
    - 조직도 등 활용
- UNION / UNION ALL
    - 두 쿼리 결과를 행으로 합치는 것
    - 두 결과열의 개수, 각 열 단위, 데이터 형식 같아야 함 ⭐
    - 문장 1의 열 이름 기준
    - UNION > 중복 제거 / UNION ALL > 중복 표시

```sql
SELECT 문장1
	UNION [ALL]
SELECT 문장2 ;
```

- EXCEPT / INTERSECT
    - EXCEPT : 첫 쿼리 결과 중 두 번째 쿼리에 해당하는 것 제외
    
    ```sql
    문1
    	EXCEPT
    문2;
    ```
    
    - <> INTERSECT : 첫 쿼리 결과 중 두 번째 쿼리에 해당되는 것만 조회
    
    ```sql
    문1
    	INTERSECT
    문2;
    ```
    
    ** 100개의 행에 대해 컬럼값을 바꿀 때
    
    - 비절차적 언어
        - 100개의 Row에 대해 한꺼번에  집합적으로 처리함
    - 절차적 언어
        - 100번 루프를 돌며 배열들이 한 row씩 절차적으로 처리해야함
    
    - SQL은 비절차적 언어