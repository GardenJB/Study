##  브릿지 패턴(Bridge)

: 구현부와 추상층을 분리, 각각 독립적 변형 허용 패턴

: 밀접 관련 클래스 집합을 두 개의 개별 계층구조(추상화 / 구현)으로 나눠 각각 독립적으로 개발하게 함

: 상속 > `객체 합성` 으로 전환 ⭐⭐⭐

- 차원 중 하나를 별도의 클래스 계층구조로 추출, 원래 클래스들이 한 클래스 내에서 모든 상태와 행동들을 갖는 대신 새 계층구조의 객체를 참조하도록 한다
    
    
- 어떤 기능의 여러 변형을 가진 모놀리식 클래스를 나누고 정돈하려는 경우 사용 유리
- 부모 추상 클래스가 기본 규칙 세트를 정의, 구체적 클래스가 추가 규칙 추가
- 런타인 구현 전환 가능할 때 사용 ☑️
- 추상 팩토리 / 빌더 결합 가능

- Abstraction 추상화 객체 : 앱의 드러나는 모습 제어 + 연결 구현 객체에 실제 작업들을 위임
    - 각 구현 객체들은 공통 인터페이스를 따르는 한 상호 호환 가능
    - 구현부에 대한 참조 유지
    - 클라이언트에 특정 추상 인터페이스 제공
- Implementor 구현 : 모든 구상 구현들에 공통적인 인터페이스 선언
    - 추상화는 여기 선언된 메서드들을 통해서만 구현 객체와 소통 가능
    - 구현부에 대한 인터페이스 정의 및 구현
- Concrete Implementor 구체적 구현자/구상 구현 : 각 객체 맞춤형 코드
    - Implementor 인터페이스 구현 구체적 클래스
- (선택) Refined Abstraction 정제 추상화 : 제어 논리의 변형
    - 추상화 확장/향상
- 클라이언트 : 추상화 작업 + 추상화 객체를 구현 객체 중 하나와 연결

- Java
    
    ```java
    // Implementor interface
    interface DrawingAPI {
        void drawCircle(int x, int y, int radius);
    }
    ```
    
    ```java
    // Concrete Implementor A
    class DrawingAPIA implements DrawingAPI {
        @Override
        public void drawCircle(int x, int y, int radius) {
            System.out.println("Drawing Circle[API A] at " + x + "," + y + " with radius " + radius);
        }
    }
    ```
    
    ```java
    // Concrete Implementor B
    class DrawingAPIB implements DrawingAPI {
        @Override
        public void drawCircle(int x, int y, int radius) {
            System.out.println("Drawing Circle[API B] at " + x + "," + y + " with radius " + radius);
        }
    }
    ```
    
    ```java
    // Abstraction
    abstract class Shape {
        protected DrawingAPI drawingAPI;
    
        protected Shape(DrawingAPI drawingAPI) {
            this.drawingAPI = drawingAPI;
        }
    
        public abstract void draw(); // 확장 가능한 추상 메서드
    }
    ```
    
    ```java
    // Refined Abstraction
    class Circle extends Shape {
        private int x, y, radius;
    
        public Circle(int x, int y, int radius, DrawingAPI drawingAPI) {
            super(drawingAPI);
            this.x = x;
            this.y = y;
            this.radius = radius;
        }
    
        @Override
        public void draw() {
            drawingAPI.drawCircle(x, y, radius);
        }
    }
    ```
    
    ```java
    public class BridgeExample {
        public static void main(String[] args) {
            DrawingAPI drawingAPIA = new DrawingAPIA();
            DrawingAPI drawingAPIB = new DrawingAPIB();
    
            Shape circleA = new Circle(1, 2, 3, drawingAPIA);
            Shape circleB = new Circle(5, 7, 11, drawingAPIB);
    
            circleA.draw();
            circleB.draw();
        }
    }
    ```
    
- JavaScript
    
    ```jsx
    // Implementor interface
    class DrawingAPI {
        drawCircle(x, y, radius) {
            console.log(`Drawing Circle at ${x},${y} with radius ${radius}`);
        }
    }
    ```
    
    ```jsx
    // Abstraction
    class Shape {
        constructor(drawingAPI) {
            this.drawingAPI = drawingAPI;
        }
    
        draw() {} // 확장 가능한 추상 메서드
    }
    ```
    
    ```jsx
    // Refined Abstraction
    class Circle extends Shape {
        constructor(x, y, radius, drawingAPI) {
            super(drawingAPI);
            this.x = x;
            this.y = y;
            this.radius = radius;
        }
    
        draw() {
            this.drawingAPI.drawCircle(this.x, this.y, this.radius);
        }
    }
    ```
    
    ```jsx
    // Client code
    const drawingAPIA = new DrawingAPI();
    const drawingAPIB = new DrawingAPI();
    
    const circleA = new Circle(1, 2, 3, drawingAPIA);
    const circleB = new Circle(5, 7, 11, drawingAPIB);
    
    circleA.draw();
    circleB.draw();
    ```
    

- 장점
    - 플랫폼 독립적 클래스와 앱 가능
    - 클라이언트 코드 > 상위 수준 추상화를 통한 작동 > 플랫폼 세부 정보에 노출 x
        - 은닉 효과
    - 개방 / 폐쇄 원칙
        - 새로운 추상화 / 구현 상호 독립적 도입 가능
    - 단일 책임 원칙
        
        
- 단점
    - 결합도가 높은 클래스에 패턴 적용시 복잡도 증가
    

<aside>
💡 추상적인 것과 구현체를 연결 > Composition

</aside>

- 기존 구조에 영향을 주지 않고 한쪽에서만 확장 가능
    - 추상적인 코드를 구체적인 코드 변경 없이도 독립적으로 확장할 수 있다.