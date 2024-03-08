## ☑️ 커맨드 패턴(Command)

: 요청을 객체로 캡슐화하여 매개변수화, 큐에 저장 혹은 로깅, 작업 치소 기능 등의 다양한 요청을 처리할 수 있게 하는 행동 디자인 패턴

<aside>
💡 객체의 행위(메서드)를 클래스로 만들어 캡슐화 함

</aside>

: 요청을 요청에 대한 모든 정보가 포함된 `독립실행형`  객체로 변환 ✅

- 관심사 분리의 원칙

- Command 커맨드
    - 요청을 나타내는 인터페이스 정의
    - 일반적으로 커맨드 실행을 위한 단일 메서드만 선언
- ConcreteCommand 구체적인 커맨드
    - command 인터페이스 구현
    - 실제 수행할 작업을 캡슐화
- Invoker 호출자 / 발송자
    - 커맨드 실행
    - 요청을 발생시키는 객체
- Receiver 수신자
    - 실제 작업 수행 객체
    - ConcreteCommand가 호출할 메서드 포함
- Client 클라이언트
    - ConcreteCommand 객체 생성
    - 객체 Invoker에 전달, 요청 발생

- 장점
    - 유연성 / 확장성
    - 커맨드 큐와 로깅
        - 요청 이력 유지 / 실행 순서 조절 용이
    - 작업 취소 및 다시 실행
- 단점
    - 클래스 수 증가

- Java
    
    ```java
    // Command interface
    interface Command {
        void execute();
    }
    ```
    
    ```java
    // ConcreteCommand class
    class LightOnCommand implements Command {
        private Light light;
    
        public LightOnCommand(Light light) {
            this.light = light;
        }
    
        @Override
        public void execute() {
            light.turnOn();
        }
    }
    
    // Receiver class
    class Light {
        void turnOn() {
            System.out.println("Light is ON");
        }
    
        void turnOff() {
            System.out.println("Light is OFF");
        }
    }
    ```
    
    ```java
    // Invoker class
    class RemoteControl {
        private Command command;
    
        public void setCommand(Command command) {
            this.command = command;
        }
    
        public void pressButton() {
            command.execute();
        }
    }
    ```
    
    ```java
    public class CommandPatternExample {
        public static void main(String[] args) {
            Light light = new Light();
            Command lightOnCommand = new LightOnCommand(light);
    
            RemoteControl remoteControl = new RemoteControl();
            remoteControl.setCommand(lightOnCommand);
    
            remoteControl.pressButton();
        }
    }
    ```
    
- JavaScript
    
    ```jsx
    // Command class
    class Command {
        execute() {}
    }
    ```
    
    ```jsx
    // ConcreteCommand class
    class LightOnCommand extends Command {
        constructor(light) {
            super();
            this.light = light;
        }
    
        execute() {
            this.light.turnOn();
        }
    }
    
    // Receiver class
    class Light {
        turnOn() {
            console.log("Light is ON");
        }
    
        turnOff() {
            console.log("Light is OFF");
        }
    }
    ```
    
    ```jsx
    // Invoker class
    class RemoteControl {
        setCommand(command) {
            this.command = command;
        }
    
        pressButton() {
            this.command.execute();
        }
    }
    ```
    
    ```jsx
    // Client code
    const light = new Light();
    const lightOnCommand = new LightOnCommand(light);
    
    const remoteControl = new RemoteControl();
    remoteControl.setCommand(lightOnCommand);
    
    remoteControl.pressButton();
    ```