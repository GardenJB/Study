## ☑️ 상태 패턴(State)

: 객체의 내부 상태가 변할 때 객체의 행동을 변경할 수 있도록 하는 행동 패턴

- 유한 상태 기계 :
    
    모든 순간 프로그램이 속해 있을 수 있는 상태들의 수는 유한하다
    

- Context 컨텍스트
    - 상태를 가지고 있는 객체
    - 상태 변경 시 새로운 상태 설정 역할
- State 상태
    - 각각의 구체적 상태에 대한 인터페이스 정의
    - 해당 상태에서 수행할 동작을 캡슐화
- ConcreteState 구체적인 상태
    - state 인터페이스 구현, 수행 동작 구체화

- 장점
    - 유연성과 확장성
    - 캡슐화
        - 상태와 행동을 캡슐화하여 상태에 따른 행동 관리 용이
    - 코드 중복 최소화
- 단점
    - 클래스 증가

- Java
    
    ```java
    // Context class
    class Context {
        private State state;
    
        public void setState(State state) {
            this.state = state;
        }
    
        public void request() {
            state.handleRequest();
        }
    }
    ```
    
    ```java
    // State interface
    interface State {
        void handleRequest();
    }
    ```
    
    ```java
    // ConcreteState classes
    class ConcreteStateA implements State {
        @Override
        public void handleRequest() {
            System.out.println("Handling request in State A");
        }
    }
    
    class ConcreteStateB implements State {
        @Override
        public void handleRequest() {
            System.out.println("Handling request in State B");
        }
    }
    ```
    
    ```java
    public class StatePatternExample {
        public static void main(String[] args) {
            Context context = new Context();
    
            State stateA = new ConcreteStateA();
            context.setState(stateA);
            context.request();
    
            State stateB = new ConcreteStateB();
            context.setState(stateB);
            context.request();
        }
    }
    ```
    
- JavaScript
    
    ```jsx
    // Context class
    class Context {
        constructor() {
            this.state = null;
        }
    
        setState(state) {
            this.state = state;
        }
    
        request() {
            this.state.handleRequest();
        }
    }
    ```
    
    ```jsx
    // State interface
    class State {
        handleRequest() {}
    }
    ```
    
    ```jsx
    // ConcreteState classes
    class ConcreteStateA extends State {
        handleRequest() {
            console.log("Handling request in State A");
        }
    }
    
    class ConcreteStateB extends State {
        handleRequest() {
            console.log("Handling request in State B");
        }
    }
    ```
    
    ```jsx
    // Client code
    const context = new Context();
    
    const stateA = new ConcreteStateA();
    context.setState(stateA);
    context.request();
    
    const stateB = new ConcreteStateB();
    context.setState(stateB);
    context.request();
    ```