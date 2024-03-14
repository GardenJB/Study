### ☑️ 메멘토 패턴(Memento)

: 객체의 상태를 저장하고 이를 나중에 복원할 수 있게 하는 행동 패턴

: 객체 상태 캡슐화 

> 객체의 구현 세부 사항 공개 x , 

> 상태를 외부로부터 독립시킴,

 > 객체의 불변성 유지

- Originator 원조자
    - 현재 상태를 저장, 복원하는 메멘토 객체 생성 인터페이스 정의
    - 자신의 상태에 대한 스냅샷 생성 가능, 스냅샷에서 자신의 상태 복원 가능
- Memento 메멘토
    - 원조자 내부 상태 저장 객체
    - 오리지네이터 상태의 스냅샷 역할을 하는 값 객체
    - 불변으로 생성 후 생성자를 통해 데이터를 한 번만 전달
    - 오리지네이터 내부에 중첩
- Caretaker 관리자
    - 메멘토 저장, 관리
    - 복원 요청
    - history 존재 > 언제, 왜 오리지네이터의 상태를 캡처해야 하는지, 상태 복원 시기 등 저장
    - 메멘토들의 스택을 저장, 오리지네이터의 기록 추적 가능
    - 과거 복원 시 > 맨 위의 메멘토를 스택에서 가져와 오리지네이터의 복원 메서드에 전달
    - b 메멘토들의 상태 변조 x (final + getter, setter 사용 ☑️)

- 장점
    - 상태의 외부화
        - 객체 상태 캡슐화
    - 복원 가능성
- 단점
    - 메모리 사용량 증가
    - 복잡성
    - PHP, 파이썬, JavaScript 같은 동적 프로그래밍 언어에서 메멘토 내부 상태가 그대로 유지된다는 보장 x

- Java
    
    ```java
    // Originator class
    class Originator {
        private String state;
    
        public void setState(String state) {
            this.state = state;
        }
    
        public String getState() {
            return state;
        }
    
        public Memento saveStateToMemento() {
            return new Memento(state);
        }
    
        public void getStateFromMemento(Memento memento) {
            state = memento.getState();
        }
    }
    ```
    
    ```java
    // Memento class
    class Memento {
        private String state;
    
        public Memento(String state) {
            this.state = state;
        }
    
        public String getState() {
            return state;
        }
    }
    ```
    
    ```java
    // Caretaker class
    class Caretaker {
        private List<Memento> mementoList = new ArrayList<>();
    
        public void addMemento(Memento memento) {
            mementoList.add(memento);
        }
    
        public Memento getMemento(int index) {
            return mementoList.get(index);
        }
    }
    ```
    
    ```java
    public class MementoPatternExample {
        public static void main(String[] args) {
            Originator originator = new Originator();
            Caretaker caretaker = new Caretaker();
    
            originator.setState("State 1");
            originator.setState("State 2");
            caretaker.addMemento(originator.saveStateToMemento());
    
            originator.setState("State 3");
            caretaker.addMemento(originator.saveStateToMemento());
    
            originator.getStateFromMemento(caretaker.getMemento(0));
            System.out.println("First saved State: " + originator.getState());
    
            originator.getStateFromMemento(caretaker.getMemento(1));
            System.out.println("Second saved State: " + originator.getState());
        }
    }
    ```
    

- JavaScript