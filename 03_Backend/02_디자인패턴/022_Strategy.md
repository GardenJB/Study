### ☑️ 전략 패턴(Strategy)

: 알고리즘을 정의하고 각각을 캡슐화하여 교체할 수 있도록 만드는 행동 패턴

:  알고리즘을 사용하는 클라이언트와 독립적으로 알고리즘 변경 가능

- Context 컨텍스트
    - 전략 사용 객체
    - 전략 객체 포함
    - 클라이언트는 컨텍스트를 통해 전략 실행
- Strategy 전략
    - 알고리즘 나타내는 인터페이스 정의
- ConcreteStrategy 구체적인 전략
    - Strategy 인터페이스 구현, 실제 알고리즘 제공

- 장점
    - 유연성과 확장성
    - 알고리즘 캡슐화
    - 객체 간의 결합도 감소
- 단점
    - 클라이언트가 전략 숙지 필요
    - 코드 증가

- Java
    
    ```java
    // Context class
    class Context {
        private Strategy strategy;
    
        public Context(Strategy strategy) {
            this.strategy = strategy;
        }
    
        public void executeStrategy() {
            strategy.execute();
        }
    }
    ```
    
    ```java
    // Strategy interface
    interface Strategy {
        void execute();
    }
    ```
    
    ```java
    // ConcreteStrategy classes
    class ConcreteStrategyA implements Strategy {
        @Override
        public void execute() {
            System.out.println("Executing Strategy A");
        }
    }
    
    class ConcreteStrategyB implements Strategy {
        @Override
        public void execute() {
            System.out.println("Executing Strategy B");
        }
    }
    ```
    
    ```java
    public class StrategyPatternExample {
        public static void main(String[] args) {
            Strategy strategyA = new ConcreteStrategyA();
            Context contextA = new Context(strategyA);
            contextA.executeStrategy();
    
            Strategy strategyB = new ConcreteStrategyB();
            Context contextB = new Context(strategyB);
            contextB.executeStrategy();
        }
    }
    ```
    

- JavaScript
    
    ```jsx
    // Context class
    class Context {
        constructor(strategy) {
            this.strategy = strategy;
        }
    
        executeStrategy() {
            this.strategy.execute();
        }
    }
    ```
    
    ```jsx
    // Strategy interface
    class Strategy {
        execute() {}
    }
    ```
    
    ```jsx
    // ConcreteStrategy classes
    class ConcreteStrategyA extends Strategy {
        execute() {
            console.log("Executing Strategy A");
        }
    }
    
    class ConcreteStrategyB extends Strategy {
        execute() {
            console.log("Executing Strategy B");
        }
    }
    ```
    
    ```jsx
    // Client code
    const strategyA = new ConcreteStrategyA();
    const contextA = new Context(strategyA);
    contextA.executeStrategy();
    
    const strategyB = new ConcreteStrategyB();
    const contextB = new Context(strategyB);
    contextB.executeStrategy();
    ```