## ☑️ 중재자 패턴(Mediator)

: 객체 간의 상호작용을 캡슐화하여 객체 간의 직접적인 통신을 방지하고 `중재자를 통해 통신` 하도록 하는 패턴

- 객체 간 결합도 낮춤
- 유지보수성 향상

- Mediator 중재자
    - 객체 간의 상호작용을 캡슐화하고 조정하는 인터페이스 정의
- ConcreteMediator 구체적인 중재자
    - Mediator 인터페이스 구현
    - 실제 객체 간의 통신 조절
- Colleague 동료
    - 중재자와 통신해야 하는 객체를 나타내는 인터페이스 정의
- ConcreteColleague 구체적인 동료
    - Colleague 인터페이스 구현
    - 중재자를 통해 다른 동료와 통신

- 장점
    - 객체 간 결합도 감소
        - 중재자를 통한 통신
    - 유연성 증가
    - 중재자를 통한 중앙 집중적 관리 ⭐
- 단점
    - 중재자의 복잡성
    - 집중화된 제어 > 성능 저하

- Java
    
    ```java
    // Mediator interface
    interface Mediator {
        void send(String message, Colleague colleague);
    }
    
    // Colleague interface
    interface Colleague {
        void receive(String message);
        void send(String message);
    }
    ```
    
    ```java
    // ConcreteMediator class
    class ConcreteMediator implements Mediator {
        private Colleague colleague1;
        private Colleague colleague2;
    
        public void setColleague1(Colleague colleague1) {
            this.colleague1 = colleague1;
        }
    
        public void setColleague2(Colleague colleague2) {
            this.colleague2 = colleague2;
        }
    
        @Override
        public void send(String message, Colleague colleague) {
            if (colleague.equals(colleague1)) {
                colleague2.receive(message);
            } else if (colleague.equals(colleague2)) {
                colleague1.receive(message);
            }
        }
    }
    ```
    
    ```java
    // ConcreteColleague class
    class ConcreteColleague1 implements Colleague {
        private Mediator mediator;
    
        public ConcreteColleague1(Mediator mediator) {
            this.mediator = mediator;
        }
    
        @Override
        public void receive(String message) {
            System.out.println("Colleague1 received: " + message);
        }
    
        @Override
        public void send(String message) {
            mediator.send(message, this);
        }
    }
    
    class ConcreteColleague2 implements Colleague {
        private Mediator mediator;
    
        public ConcreteColleague2(Mediator mediator) {
            this.mediator = mediator;
        }
    
        @Override
        public void receive(String message) {
            System.out.println("Colleague2 received: " + message);
        }
    
        @Override
        public void send(String message) {
            mediator.send(message, this);
        }
    }
    ```
    
    ```java
    public class MediatorPatternExample {
        public static void main(String[] args) {
            ConcreteMediator mediator = new ConcreteMediator();
    
            ConcreteColleague1 colleague1 = new ConcreteColleague1(mediator);
            ConcreteColleague2 colleague2 = new ConcreteColleague2(mediator);
    
            mediator.setColleague1(colleague1);
            mediator.setColleague2(colleague2);
    
            colleague1.send("Hello from Colleague1");
            colleague2.send("Hi from Colleague2");
        }
    }
    ```
    
- JavaScript
    
    ```jsx
    // Mediator class
    class Mediator {
        send(message, colleague) {}
    }
    
    // Colleague 클래스
    class Colleague {
        receive(message) {}
        send(message) {}
    }
    ```
    
    ```jsx
    // ConcreteMediator class
    class ConcreteMediator extends Mediator {
        setColleague1(colleague1) {
            this.colleague1 = colleague1;
        }
    
        setColleague2(colleague2) {
            this.colleague2 = colleague2;
        }
    
        send(message, colleague) {
            if (colleague === this.colleague1) {
                this.colleague2.receive(message);
            } else if (colleague === this.colleague2) {
                this.colleague1.receive(message);
            }
        }
    }
    ```
    
    ```jsx
    // ConcreteColleague class
    class ConcreteColleague1 extends Colleague {
        constructor(mediator) {
            super();
            this.mediator = mediator;
        }
    
        receive(message) {
            console.log(`Colleague1 received: ${message}`);
        }
    
        send(message) {
            this.mediator.send(message, this);
        }
    }
    
    class ConcreteColleague2 extends Colleague {
        constructor(mediator) {
            super();
            this.mediator = mediator;
        }
    
        receive(message) {
            console.log(`Colleague2 received: ${message}`);
        }
    
        send(message) {
            this.mediator.send(message, this);
        }
    }
    ```
    
    ```jsx
    // Client code
    const mediator = new ConcreteMediator();
    
    const colleague1 = new ConcreteColleague1(mediator);
    const colleague2 = new ConcreteColleague2(mediator);
    
    mediator.setColleague1(colleague1);
    mediator.setColleague2(colleague2);
    
    colleague1.send("Hello from Colleague1");
    colleague2.send("Hi from Colleague2");
    ```