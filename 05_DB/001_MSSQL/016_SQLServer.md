## SQL Server와 응용 프로그램의 연결

: ⭐⭐⭐

```sql
* 외부 서버 연결
	- TCP 허용 > 구성 관리자 
	- 권한 허용 > SQL Server > SQL Window 모드
								사용자 ID/PW 설정
	- Windows 방화벽 > 제어판 > 인바운드 규칙 > 포트
  - ip 확인
 

	- 서버 연결 사항 작성 
```

- DB 테이블에 컬럼 설명 정보 표시 방법

  > 테이블 디자인에서 정보 확인 가능

- window키 + R > regedit 입력
- 컴퓨터\HKEY_CURRENT_USER\SOFTWARE\Microsoft\SQL Server Management Studio\18.0_IsoShell\DataProject
- SSVPropViewColumnsSQL70 , 80
- 값 데이터 > 1, 2, 6, 17 변경
- SSMS(MSSQL 재실행)
-