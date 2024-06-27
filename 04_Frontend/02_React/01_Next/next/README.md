### 가상 요소 선택자
  * ::before ::after
  > css 실제 존재하지 않는 요소를 만들거나 범위를 만들어 스타일 적용할 때 사용

### zod 
  > 유효성 검사 


###### async / awit
  > server side 페이지 함수 자체에 적용 가능
  > 비동기 데이터 상태 값 확인 필요

  #### getElement >> 사전에 dom 요소가 형성된 경우만 HTMLElement로 인식 

###### 외부 스크립트 실행 결과 조회 불가 문제
  > document.write() 사용문 > 비동기에서 결과 호출 불가

#### css 적용
  > global.css 전체 복사로 가져오면 적용 x 
    > @import url('...'); 경로는 작동


### url과 파일 구조 다르거나 get 요청 parameter가 여러개인 경우
  > searchParam & Link 사용 query 수정 필요
   : 기본적으로 폴더 구조에 존재하는 마지막 파라미터 페이지로 요청은 들어감



#### 클라이언트 / 서버 컴포넌트
  > 서버 컴포넌트에서는 cors 설정 x
  > 클라이언트 컴포넌트에서는 cors 설정 o
  ```
  nest > main.ts 
  app.enableCors();
  추가
  ```

### dom 조작 > useRef()