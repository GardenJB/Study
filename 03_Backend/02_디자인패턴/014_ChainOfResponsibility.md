## 행동 패턴

### ☑️ 책임 연쇄 패턴(Chain of Responsibility)

: 핸들러들의 체인을 따라 요청을 전달하는 행동 디자인 패턴 COR

- 각 핸들러는 받은 요청을 처리할지 아니면 체인의 다음 핸들러로 전달할지 결정
- 요청의 송신자 / 수신자 분리

: 요청을 보내는 객체와 그 요청을 받아 처리하는 객체 간에 유연한 통신 구조를 제공하는 행동 패턴

: 클라이언트의 요청에 대한 처리를 하나의 객체가 다 하는 것이 아닌, `여러 개의 처리 객체들로 나누고 이들을 사슬처럼 연결해 집합 내에서 연쇄적으로 처리` 

- 하나의 처리에 대한 책임을 sender와 receiver로 분리, 각 객체를 독립, 결합도 느슨하게 함.
- 상황에 따라 요청 처리 객체가 변하는 프로그램에 유연하게 대응
- 중첩 if-else문 최적화 ☑️

- 특정 요청을 판별하고 처리한 객체가 복수일 경우
- 특정 순서로 여러 핸들러를 실행해야 하는 경우
- 프로그램이 다양한 방식과 종류의 요청을 처리할 것으로 예상되지만 정확한 요청 유형과 순서를 미리 알 수 없는 경우
- 요청을 처리할 수 있는 객체 집합이 동적으로 정의되어야 할 때
    - 체인 연결을 런타임에서 동적으로 설정

- 핸들러 Handler
    - 독립 실행형 객체
    - 모든 구상 핸들러에 공통 인터페이스 선언
    - 요청 처리 위한 단일 메서드만 포함
    - 다음 핸들러 세팅 가능
- 기초 핸들러
    - 선택적 클래스
    - 모든 핸들러 클래스들에 공통적인 상용구 코드
    - 다음 핸들러에 대한 참조 저장 필드 정의 ✅
    - setter, 디폴트 행동 구현
- 구상 핸들러 ConcreteHandler
    - 요청 처리 실제 코드 포함
    - 요청 처리 or 전달 결정
- 클라이언트 Client
    - 핸들러 사용 객체
    - 요청 생성
    - 요청을 모든 핸들러에 보낼 수 있음 (꼭 첫 핸들러일 필요 x)

- 장점
    - 유연성과 확장성
    - 단일 책임 원칙 준수
- 단점
    - 핸들러 체인 이동 처리 시간 소요 증가
        - 무한 사이클 발생 가능성
    - 모든 요청에 대한 보장이 없음
        - 핸들러에서 처리하지 않은 요청에 대한 처리 보장이 없음

- Java
    
    ```java
    // Handler interface
    interface Handler {
        void handleRequest(int request);
    }
    ```
    
    ```java
    // ConcreteHandler class
    class ConcreteHandler1 implements Handler {
        private Handler nextHandler;
    
        public void setNextHandler(Handler nextHandler) {
            this.nextHandler = nextHandler;
        }
    
        @Override
        public void handleRequest(int request) {
            if (request < 10) {
                System.out.println("ConcreteHandler1 handles the request: " + request);
            } else if (nextHandler != null) {
                nextHandler.handleRequest(request);
            }
        }
    }
    
    class ConcreteHandler2 implements Handler {
        private Handler nextHandler;
    
        public void setNextHandler(Handler nextHandler) {
            this.nextHandler = nextHandler;
        }
    
        @Override
        public void handleRequest(int request) {
            if (request >= 10 && request < 20) {
                System.out.println("ConcreteHandler2 handles the request: " + request);
            } else if (nextHandler != null) {
                nextHandler.handleRequest(request);
            }
        }
    }
    ```
    
    ```java
    public class ChainOfResponsibilityExample {
        public static void main(String[] args) {
            Handler handler1 = new ConcreteHandler1();
            Handler handler2 = new ConcreteHandler2();
    
            handler1.setNextHandler(handler2);
    
            handler1.handleRequest(5);
            handler1.handleRequest(15);
            handler1.handleRequest(25);
        }
    }
    ```
    

- JavaScript
    
    ```jsx
    // Handler class
    class Handler {
        setNextHandler(nextHandler) {
            this.nextHandler = nextHandler;
        }
    
        handleRequest(request) {}
    }
    ```
    
    ```jsx
    // ConcreteHandler class
    class ConcreteHandler1 extends Handler {
        handleRequest(request) {
            if (request < 10) {
                console.log(`ConcreteHandler1 handles the request: ${request}`);
            } else if (this.nextHandler) {
                this.nextHandler.handleRequest(request);
            }
        }
    }
    
    class ConcreteHandler2 extends Handler {
        handleRequest(request) {
            if (request >= 10 && request < 20) {
                console.log(`ConcreteHandler2 handles the request: ${request}`);
            } else if (this.nextHandler) {
                this.nextHandler.handleRequest(request);
            }
        }
    }
    ```
    
    ```jsx
    // Client code
    const handler1 = new ConcreteHandler1();
    const handler2 = new ConcreteHandler2();
    
    handler1.setNextHandler(handler2);
    
    handler1.handleRequest(5);
    handler1.handleRequest(15);
    handler1.handleRequest(25);
    ```