## ☑️ 데코레이터 패턴(Decorator)


: 객체들을 새로운 행동들을 포함한 특수 래퍼 객체들 내에 넣어서 해당 행동들을 해당 객체들에 연결시키는 구조적 디자인 패턴

: 객체에 동적으로 새로운 기능을 추가할 수 있게 하는 구조적 디자인 패턴

- 계층적 기능 / 객체 변형 적용 가능

- 상속 > 집합관계 or 합성
    - 집합관계
        - 객체 A는 객체 B를 포함
        - `참조`
    - 합성
        - 객체 A는 객체 B로 구성
        - A는 B의 수명 주기를 관리

- `래퍼`
    - 패턴의 주요 아이디어를 명확하게 표현하는 데코레이터 패턴
    - 일부 대상 객체와 연결 가능 객체
    - 대상 객체와 같은 메서드들 집합 포함
        
        > 자신이 받는 모든 요청을 대상 객체에 위임
        > 
        - 요청 전달 전/후 작업 수행 및 결과 변경 가능
- Component 구성요소
    - 기본적 인터페이스 정의
    - 데코레이터와 ConcreteComponent가 구현해야 하는 공통 인터페이스
- ConcreteComponent 구체적인 구성 요소
    - 기본 동작 구현 실제 객체
- Decorator 데코레이터
    - Component 구현, ConcreteComponent와 함께 사용
    - 기본 동작에 추가적인 기능을 제공
- ConcreteDecorator 구체적인 데코레이터
    - 실제 추가 기능 구현 클래스
    - 데코레이터의 하위 클래스로 구현

- 장점
    - 확장성
    - 유연성
    - 단일 책임 원칙(SRP) 준수
- 단점
    - 클래스 수 증가
    - 순서에 따라 다른 결과로 영향

- Java
    
    ```java
    // Component interface
    interface Coffee {
        double cost();
    }
    ```
    
    ```java
    // ConcreteComponent class
    class SimpleCoffee implements Coffee {
        @Override
        public double cost() {
            return 5.0;
        }
    }
    ```
    
    ```java
    // Decorator class
    abstract class CoffeeDecorator implements Coffee {
        protected Coffee decoratedCoffee;
    
        public CoffeeDecorator(Coffee decoratedCoffee) {
            this.decoratedCoffee = decoratedCoffee;
        }
    
        public double cost() {
            return decoratedCoffee.cost();
        }
    }
    ```
    
    ```java
    // ConcreteDecorator class
    class MilkDecorator extends CoffeeDecorator {
        public MilkDecorator(Coffee decoratedCoffee) {
            super(decoratedCoffee);
        }
    
        @Override
        public double cost() {
            return super.cost() + 2.0;
        }
    }
    ```
    
    ```java
    public class DecoratorExample {
        public static void main(String[] args) {
            Coffee simpleCoffee = new SimpleCoffee();
            System.out.println("Cost of Simple Coffee: " + simpleCoffee.cost());
    
            Coffee milkCoffee = new MilkDecorator(simpleCoffee);
            System.out.println("Cost of Milk Coffee: " + milkCoffee.cost());
        }
    }
    ```
    
- JavaScript
    
    ```jsx
    // Component class
    class Coffee {
        cost() {
            return 5.0;
        }
    }
    ```
    
    ```jsx
    // Decorator class
    class CoffeeDecorator extends Coffee {
        constructor(decoratedCoffee) {
            super();
            this.decoratedCoffee = decoratedCoffee;
        }
    
        cost() {
            return this.decoratedCoffee.cost();
        }
    }
    ```
    
    ```jsx
    // ConcreteDecorator class
    class MilkDecorator extends CoffeeDecorator {
        constructor(decoratedCoffee) {
            super(decoratedCoffee);
        }
    
        cost() {
            return super.cost() + 2.0;
        }
    }
    ```
    
    ```jsx
    // Client code
    const simpleCoffee = new Coffee();
    console.log("Cost of Simple Coffee: " + simpleCoffee.cost());
    
    const milkCoffee = new MilkDecorator(simpleCoffee);
    console.log("Cost of Milk Coffee: " + milkCoffee.cost());
    ```
    
    - 단일 상속 > 확장에 제한적  >> 데코레이터 패턴
    
    <aside>
    💡 위임을 사용해서 보다 유연하게(런타임에) 부가 기능 추가 가능
    
    </aside>
    
    ```java
    // Client  >> CommentService Interface 사용 참고
    
    public class App {
    
    	private static boolean enabledSpamFilter = true;
    	private static boolean enabledTrimming = true;
    
    	public static void main(String[] args) {
    		CommentService commentService = new DefaultCommentService();
    		if(enabledSpamFilter) {
    			commentService = new SpamFilteringCommentDecorator(commentService);
    		}
    		if(enabledTrimming) {
    			commentService = new trimmingCommentDecorator(commentService);
    		}
    
    		Client client = new Client(commentService);
    		client.writeComment("오징어게임");
    		client.writeComment("보는게 하는거 보다 재밌을 수가 없지...");
    		client.writeComment("http://whiteship.me");
    	}
    }
    ```