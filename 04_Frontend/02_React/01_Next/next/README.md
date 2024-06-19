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
