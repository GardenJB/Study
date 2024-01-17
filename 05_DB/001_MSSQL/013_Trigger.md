## 트리거

:  테이블에 무슨 일(이벤트)이 일어나면 `자동` 으로 실행

- 테이블에 부착
    
    
- 데이터의 `무결성`을 위해 제약 조건과 함께 기능
- DML문(INSERT, UPDATE, DELETE…) 이벤트 발생시 작동
- 데이터베이스 개체

```sql
CREATE TRIGGER 트리거명
	ON 부착할 테이블명
		(WITH ENCRYPTION)   -- 암호화
	AFTER DELETE,UPDATE    -- 작동 이벤트 설정
	AS
		PRINT(N'트리거 작동');    -- 트리거 실행시 작동 코드들...
```

- 종류
    - AFTER 트리거 ⭐
        - 이벤트 발생 후 작동    INSERT, UPDATE, DELETE …
        - 테이블에만 작동
            - 책임 소재 명확하게 사용 ⭐⭐
    - INSTEAD OF 트리거
        - 테이블에 변경이 생기기 전 작동
            
                INSERT, UPDATE, DELETE
            
        - 원 설정 이벤트 작동 대신 작업 실행 ☑️
        - 테이블/뷰 가능 > 뷰 업데이트 가능 설정 시 주로 사용
            - 복합 뷰/테이블 INSERT/UPDATE/DELETE 효과 ⭐
    - CLR 트리거
        - .NET Framework 생성 트리거

- 트레거가 생성하는 임시 테이블
    - 변경 불가, 참조만 가능
    - inserted  : 변경 후 데이터 저장      INSERT, UPDATE
    - deleted  : 변경 전 데이터 저장       DELETE, UPDATE

- 다중 트리거
- 중첩 트리거 ✅
    - 중간 실패시 전체 작업 취소
- 재귀 트리거
- @order 로 순서 지정 last / first만 지정 가능 (여러개일 경우)
- from inserted 임시 테이블 사용