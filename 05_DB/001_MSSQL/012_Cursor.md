## 커서
>> SQL Server 부하 증가 및 성능 저하 권장 x !!

:  행의 집합을 다루는 편리 기능 제공

→ 테이블 여러 행 쿼리 후, 쿼리 결과 행 집합을 한 행씩 처리

ex) 파일 포인터

- 서버 커서
- 클라이언트 커서

1. 커서의 선언  DECLARE
2. 커서 열기  OPEN
3. WHILE 문
    1. 커서에서 데이터 가져오기  FETCH
    2. 데이터 처리
4. 커서 닫기  CLOSE
5. 커서 해제  DEALLOCATE

`LOCAL / GLOVAL`  

지역 / 전역 설정 > 지역 커서 권장

`FORWARD_ONLY / SCROLL`

- FETCH NEXT 권장

`STATIC / KEYSET / DYNAMIC / FAST_FORWARD`

STATIC : tempdb에 데이터 복사

 > 원본 수정 사항 확인 불가

DYNAMIC : 현재 키 값만 tempdb 복사

 > 모두 확인 가능

KEYSET : 모든 키 값을 tempdb 저장

 > 업데이트 내역 확인 가능 b INSERT 내역 확인 불가

- ! 암시적 변환 주의!
    - TYPE_WARNING 추가 권장

FAST_FORWARD : FORWARD_ONLY + READ_ONLY

> FAST_FORWARD > STATIC > KEYSET > DYNAMIC   성능 순
> 

`READ_ONLY  / SCROLL_LOCKS / OPTIMISTIC`

`TYPE_WARNING`

`FOR select_statement`

`FOR UPDATE[OF clolumn_name[,...n]]`

```sql
* 커서 열기
	OPEN 커서명;

* 데이터 가져오기 및 처리
	FETCH NEXT FROM 커서명
	WHILE @@FETCH_STATUS = 0   -- 성공시 FETCH_STATUS 0 반환
	BEGIN
		데이터 처리
		FETCH NEXT FROM 커서명   -- 다음행 WHILE문 실행
	END

* 커서 닫기
	CLOSE 커서명;

* 커서 할당 해제
	DEALLOCATE 커서명;
```