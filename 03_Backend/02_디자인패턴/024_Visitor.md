### ☑️ 비지터 패턴(Visitor)

: 객체의 구조와 기능을 분리하여 새로운 기능을 추가하기 쉽도록 하는 행동 패턴

: 객체의 구조를 정의하고 이를 방문하는 각각의 기능(비지터)을 별도로 분리하여 구현

- 데이터 처리와 구조를 분리
    - 처리를 visitor에 위임

- Visitor 비지터
    - 객체 구조의 각 요소를 방문하는 각각의 기능을 정의하는 인터페이스 or 추상 클래스
- ConcreteVisitor 구체적인 비지터
    - visitor를 실제로 구현 클래스
    - 각 요소에 대한 기능을 구현
- Element 요소
    - 비지터가 방문하는 객체 구조의 인터페이스 or 추상 클래스
- ConcreteElement 구체적인 요소
    - element를 실제로 구현하는 클래스
    - 객체 구조에 속하는 각 요소를 나타냄
- ObjectStructure 객체 구조
    - 여러 element 객체를 포함하는 집합체
    - 이를 방문하는 visitor 객체를 관리

- 장점
    - 새로운 기능의 추가 용이
        - 기존의 객체 구조를 수정하지 않고 새로운 기능 비지터 추가 가능
    - 객체 구조와 기능의 분리
    - 다양한 알고리즘 적용
- 단점
    - 객체 구조 변경의 어려움

- Java
    
    ```java
    // Element interface
    interface Element {
        void accept(Visitor visitor);
    }
    ```
    
    ```java
    // ConcreteElement class
    class ConcreteElementA implements Element {
        @Override
        public void accept(Visitor visitor) {
            visitor.visitElementA(this);
        }
    }
    
    class ConcreteElementB implements Element {
        @Override
        public void accept(Visitor visitor) {
            visitor.visitElementB(this);
        }
    }
    ```
    
    ```java
    // Visitor interface
    interface Visitor {
        void visitElementA(ConcreteElementA elementA);
        void visitElementB(ConcreteElementB elementB);
    }
    ```
    
    ```java
    // ConcreteVisitor class
    class ConcreteVisitor implements Visitor {
        @Override
        public void visitElementA(ConcreteElementA elementA) {
            System.out.println("Visiting ConcreteElementA");
        }
    
        @Override
        public void visitElementB(ConcreteElementB elementB) {
            System.out.println("Visiting ConcreteElementB");
        }
    }
    ```
    
    ```java
    // ObjectStructure class
    class ObjectStructure {
        private List<Element> elements = new ArrayList<>();
    
        public void addElement(Element element) {
            elements.add(element);
        }
    
        public void accept(Visitor visitor) {
            for (Element element : elements) {
                element.accept(visitor);
            }
        }
    }
    ```
    
    ```java
    public class VisitorPatternExample {
        public static void main(String[] args) {
            ObjectStructure objectStructure = new ObjectStructure();
            objectStructure.addElement(new ConcreteElementA());
            objectStructure.addElement(new ConcreteElementB());
    
            Visitor visitor = new ConcreteVisitor();
            objectStructure.accept(visitor);
        }
    }
    ```
    

- JavaScript
    
    ```jsx
    // Element class
    class Element {
        accept(visitor) {}
    }
    ```
    
    ```jsx
    // ConcreteElement classes
    class ConcreteElementA extends Element {
        accept(visitor) {
            visitor.visitElementA(this);
        }
    }
    
    class ConcreteElementB extends Element {
        accept(visitor) {
            visitor.visitElementB(this);
        }
    }
    ```
    
    ```jsx
    // Visitor class
    class Visitor {
        visitElementA(elementA) {}
        visitElementB(elementB) {}
    }
    ```
    
    ```jsx
    // ConcreteVisitor class
    class ConcreteVisitor extends Visitor {
        visitElementA(elementA) {
            console.log("Visiting ConcreteElementA");
        }
    
        visitElementB(elementB) {
            console.log("Visiting ConcreteElementB");
        }
    }
    ```
    
    ```jsx
    // ObjectStructure class
    class ObjectStructure {
        constructor() {
            this.elements = [];
        }
    
        addElement(element) {
            this.elements.push(element);
        }
    
        accept(visitor) {
            this.elements.forEach(element => element.accept(visitor));
        }
    }
    ```
    
    ```jsx
    // Client code
    const objectStructure = new ObjectStructure();
    objectStructure.addElement(new ConcreteElementA());
    objectStructure.addElement(new ConcreteElementB());
    
    const visitor = new ConcreteVisitor();
    objectStructure.accept(visitor);
    ```
    
    <aside>
    💡 기존 코드 수정 x
    
    </aside>
    
    - override > static maping
        - 실시간으로 구체타입을 결정 x
        - compile time에 구체 타입을 정해야 함.
    - device 내 override 구현 > device = visitor
        - app, watch > concrete visitor
    
    ```java
    public class Client {
    	public static void main(String[] args) {
    		Shape rectangle = new Rectangle();
    		Device device = new Pad();
    		rectangle.accept(device);
    	}
    }
    ```
    
    ```java
    public interface Shape {
    	public void accept(Device device);
    }
    ```
    
    ```java
    public interface Device {
    	void print(Circle circle);
    	void print(Rectangle rectangel);
    	void print(Triangle triangle);
    }
    ```
    
    ```java
    public class Rectangle implements Shape {
    	@Override
    	public void accept(Device device) {
    		device.print(this);
    	}
    }
    ```
    
    ```java
    public class Pad implements Device {
    	@Override
    	public void print(Circle circle) {
    		System.out.println("print Circle to Pad")
    	}
    
    	@Override
    	public void print(Rectangle rectangle) {
    		System.out.println("print Rectangle to Pad")
    	}
    
    	@Override
    	public void print(Triangle triangle) {
    		System.out.println("print Triangle to Pad")
    	}
    }
    ```
    
    >> 더블 디스패치
    
    - 기존 코드 수정 x 새로운 기능 추가 가능
    - b 새로운 element 추가, 삭세 >> 코드 수정 많아짐