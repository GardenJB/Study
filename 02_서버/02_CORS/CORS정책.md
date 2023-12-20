# CORS

: 현재 IP가 아닌 다른 IP로 리소스를 요청하는 구조(Cross-Origin Resource Sharing)

  교차 출처 리소스 공유 정책

- Origin
    
    : 요청이 시작된 서버의 위치
    
    - Protocol + Host + Port
    
    ```
    Protocol(Scheme) : http, https
    Host : 사이트 도메인
    Port : 포트 번호
    Path : 사이트 내부 경로
    Query string : 요청의 key와 value값
    Fragment : 해시 태크
    ```
    
- SOP(Same Origin Policy)
    
    : 동일 출처 Origin만 리소스 공유를 허용하는 보안 정책
    
- Access-Control-Allow-Origin
    
    : 서로 다른 Origin에서 자원 공유 가능
    
    - 클라이언트 요청 : HTTP 통신 헤더(Origin 헤더)에 요청 시작 정보 포함
    - 서버 응답 : Access-Control-Allow-Origin 헤더에 허용 Origin 여부 포함
    - 클라이언트 : 헤더 값 비교 정상 응답 확인 시 지정된 요청
    - 서버 : 요청 수행 후 응답