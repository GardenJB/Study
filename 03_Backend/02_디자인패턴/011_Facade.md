## ☑️ 퍼사드 패턴(Facade)

: 복잡한 시스템의 통합된 인터페이스를 제공하는 구조적 디자인 패턴

- 간편한 인터페이스(API) 구성
- 각 클래스에 대한 재정리 행위 > 이용 `창구` 동작

: 복잡한 서브 클래스들의 공통적인 기능을 정의하는 상위 수준의 인터페이스를 제공

- 클래스 구조가 정형화 되진 않음 ⭐
- 중간 매개체 역할 ⭐⭐

- Facade Object 퍼사드 객체
    - 서브 클래스에 대한 의존성을 감소시켜 주고 복잡한 소프트웨어를 간단히 사용할 수 있게 간단한 인터페이스를 제공
    - 여러 SubSystem들의 기능을 하나의 Facade Object로 재정의
        - 복수의 Facade 구성 가능
    - Client가 Facade Object를 사용
- SubSystem 하위 시스템
    - 라이브러리 / 클래스
- Client
    - Facade 사용 > 하위 시스템 직접 접근 x
        - 복잡 논리 인식 x
    
- 재귀적 Facade 패턴
    - Additional Facade 복수의 Facade 구성
    - Facade_1를 합친 Facade > 다수의 하위 시스템에서 적용된 Facade_1 > 하위 시스템들

- 장점
    - 낮은 결합도
        - 서브 시스템 간의 종속성 줄임
        - Client에선 퍼사드 객체를 사용해 여러 서브 클래스를 호출한 필요 없어짐
            - 서브 클래스에 대한 의존성 낮춤
    - 가독성 상승
    - 단순화된 인터페이스 제공
        - 개발자 실수 가능성 감소
    - 서브 시스템 직접 접근 가능
        - 선택지가 다양해짐
- 단점
    - 유지보수 비용 증가
    - God 객체 (모든 클래스에 결합된) 출현 가능성
    - 의존성 완전 제거 불가
    - 유연성 감소
        - 퍼사드 객체를 통한 간접 접근

- Java
    
    ```java
    // Facade class
    class ComputerFacade {
        private CPU cpu;
        private Memory memory;
        private HardDrive hardDrive;
    
        public ComputerFacade() {
            this.cpu = new CPU();
            this.memory = new Memory();
            this.hardDrive = new HardDrive();
        }
    
        public void start() {
            cpu.freeze();
            memory.load();
            cpu.jump("BOOT_ADDRESS");
            cpu.execute();
        }
    }
    
    // Subsystem classes
    class CPU {
        public void freeze() { System.out.println("CPU: Freeze"); }
        public void jump(String address) { System.out.println("CPU: Jump to " + address); }
        public void execute() { System.out.println("CPU: Execute"); }
    }
    
    class Memory {
        public void load() { System.out.println("Memory: Load"); }
    }
    
    class HardDrive {
        public void read() { System.out.println("HardDrive: Read"); }
    }
    ```
    
    ```java
    public class FacadeExample {
        public static void main(String[] args) {
            ComputerFacade computer = new ComputerFacade();
            computer.start();
        }
    }
    ```
    
- JavaScript
    
    ```jsx
    // Facade class
    class ComputerFacade {
        constructor() {
            this.cpu = new CPU();
            this.memory = new Memory();
            this.hardDrive = new HardDrive();
        }
    
        start() {
            this.cpu.freeze();
            this.memory.load();
            this.cpu.jump("BOOT_ADDRESS");
            this.cpu.execute();
        }
    }
    
    // Subsystem classes
    class CPU {
        freeze() { console.log("CPU: Freeze"); }
        jump(address) { console.log("CPU: Jump to " + address); }
        execute() { console.log("CPU: Execute"); }
    }
    
    class Memory {
        load() { console.log("Memory: Load"); }
    }
    
    class HardDrive {
        read() { console.log("HardDrive: Read"); }
    }
    ```
    
    ```jsx
    // Client code
    const computer = new ComputerFacade();
    computer.start();
    ```