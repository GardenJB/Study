- js
    - for ... of ...
    - join() toString()
    join() 구분자 지정, toString() 은 , 적용
    - unshift(), shift()
    - addEventListener > 중복 적용 가
    - 이벤트 객체 e (e.target)
    - onsubmit > e.preventDefault()
    - stopPropagation() , event delegation(addeventListener + if문)
    - 객체 + [] > 멤버 값 동적 변경 & 멤버 이름 동적 사용
    var myDataName = "height";
    var myDataValue = "1.75m";
    person[myDataName] = myDataValue;
    > person.height >> 1.75m
    - this
    - JSON parse() > 객체, stringfy() > 문자열
    ** lazy
    - Promise << 비동기 관련
    - JavaScript 형식화 배열 (객체) > 버퍼 / 뷰
    : 원시 이진 데이터 처리(미디어, Websocket, 스트리밍)
    - 프로시저 : 함수와 달리 반환값이 없음