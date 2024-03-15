### ☑️ 옵저버 패턴(Observer)

: 여러 객체에 자신이 관찰 중인 객체(주제 subject, Publisher)에 발생하는 모든 이벤트에 대하여 알리는 구독 매커니즘을 정의할 수 있도록 하는 행동 디자인 패턴

: 객체 간 일대다 종속 관계 정의, 어떤 객체의 상태가 변할 때 그에 종속된 모든 객체들이 자동으로 알림을 받고 업데이트될 수 있도록 하는 행동 패턴

- 일대다 의존성
    - 분산 이벤트 핸들링 시스템 구현
- Pub/Sub (발행/구독) 모델

- Subject 주체
    - 다른 객체들에 관심 이벤트들 발생
    - 옵저버들을 등록하고 삭제할 수 있는 이터페이스 정의
    - 옵저버들에게 상태 변경을 알리는 역할
- ConcreteSubject 구체적인 주체
    - subject 인터페이스 구현, 실제로 상태를 관리하고 옵저버들에게 알림을 보내는 역할
- Observer 옵저버
    - 알림 인터페이스 > 단일 update 메서드로 구성
    - 주체의 상태가 변경될 때 업데이트를 받기 위한 인터페이스를 정의
- ConcreteObserver 구체적인 옵저버
    - observer 인터페이스 구현
    - 주체의 상태가 변경될 때 수행할 동작을 정의

- 장점
    - 느슨한 결합
        - 주체나 옵저버 변경시 영향 적음
    - 재사용성
    - 이벤트 기반 프로그래밍
- 단점
    - 순서 의존성
        - 옵저버들 간 실행 순서 의존성이 있는 경우 설계 복잡
    - 메모리 누수

- Java
    
    ```java
    // Subject interface
    interface Subject {
        void addObserver(Observer observer);
        void removeObserver(Observer observer);
        void notifyObservers();
    }
    ```
    
    ```java
    // ConcreteSubject class
    class ConcreteSubject implements Subject {
        private List<Observer> observers = new ArrayList<>();
        private int state;
    
        public void setState(int state) {
            this.state = state;
            notifyObservers();
        }
    
        public int getState() {
            return state;
        }
    
        @Override
        public void addObserver(Observer observer) {
            observers.add(observer);
        }
    
        @Override
        public void removeObserver(Observer observer) {
            observers.remove(observer);
        }
    
        @Override
        public void notifyObservers() {
            for (Observer observer : observers) {
                observer.update();
            }
        }
    }
    ```
    
    ```java
    // Observer interface
    interface Observer {
        void update();
    }
    ```
    
    ```java
    // ConcreteObserver class
    class ConcreteObserver implements Observer {
        private ConcreteSubject subject;
    
        public ConcreteObserver(ConcreteSubject subject) {
            this.subject = subject;
            subject.addObserver(this);
        }
    
        @Override
        public void update() {
            System.out.println("State updated: " + subject.getState());
        }
    }
    ```
    
    ```java
    public class ObserverPatternExample {
        public static void main(String[] args) {
            ConcreteSubject subject = new ConcreteSubject();
            ConcreteObserver observer1 = new ConcreteObserver(subject);
            ConcreteObserver observer2 = new ConcreteObserver(subject);
    
            subject.setState(1);
            subject.setState(2);
        }
    }
    ```
    
- JavaScript
    
    ```jsx
    // Subject class
    class Subject {
        constructor() {
            this.observers = [];
        }
    
        addObserver(observer) {
            this.observers.push(observer);
        }
    
        removeObserver(observer) {
            this.observers = this.observers.filter(obs => obs !== observer);
        }
    
        notifyObservers() {
            this.observers.forEach(observer => observer.update());
        }
    }
    ```
    
    ```jsx
    // ConcreteSubject class
    class ConcreteSubject extends Subject {
        constructor() {
            super();
            this.state = 0;
        }
    
        setState(state) {
            this.state = state;
            this.notifyObservers();
        }
    
        getState() {
            return this.state;
        }
    }
    ```
    
    ```jsx
    // Observer class
    class Observer {
        constructor(subject) {
            this.subject = subject;
            this.subject.addObserver(this);
        }
    
        update() {
            console.log(`State updated: ${this.subject.getState()}`);
        }
    }
    ```
    
    ```jsx
    // Client code
    const subject = new ConcreteSubject();
    const observer1 = new Observer(subject);
    const observer2 = new Observer(subject);
    
    subject.setState(1);
    subject.setState(2);
    ```
    
    - 해지 명시 필요
        - weakreference 참고
    
    - PropertyChangeEvent/Listener
    - Flow API
        - SubmissionPublisher
    - RxJava
    - Reactor
    
    <> 폴링 (주기적으로 데이터 업데이트)