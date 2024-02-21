## 빌더 패턴(Builder)


: 매개 변수를 메서드로 생성 과정과 표현 방법을 분리하여 마지막에 통합 빌드해서 객체를 생성하는 패턴

 복잡한 객체의 생성 과정 추상화, 매개변수를 조립해 객체를 생성

- 객체의 생성 과정 유연하게 관리
- 가독성 향상
- 객체 일관성 유지

<aside>
💡 클래스의 선택적 매개변수가 많은 상황에서 유용

</aside>

```java
* 점층적 생성자 패턴(Telelscoping Constructor Pattern)
	: 필수 매개변수와 선택 매개변수를 0개, 1개, 2개, ... 로 받는 형태
		 > 다양한 매개변수를 입력받아 인스턴스 생성(생성자 오버로딩)

class Hamburger {
    // 필수 매개변수
    private int bun;
    private int patty;

    // 선택 매개변수
    private int cheese;
    private int lettuce;
    private int tomato;
    private int bacon;

    public Hamburger(int bun, int patty, int cheese, int lettuce, int tomato, int bacon) {
        this.bun = bun;
        this.patty = patty;
        this.cheese = cheese;
        this.lettuce = lettuce;
        this.tomato = tomato;
        this.bacon = bacon;
    }

    public Hamburger(int bun, int patty, int cheese, int lettuce, int tomato) {
        this.bun = bun;
        this.patty = patty;
        this.cheese = cheese;
        this.lettuce = lettuce;
        this.tomato = tomato;
    }
    

    public Hamburger(int bun, int patty, int cheese, int lettuce) {
        this.bun = bun;
        this.patty = patty;
        this.cheese = cheese;
        this.lettuce = lettuce;
    }

    public Hamburger(int bun, int patty, int cheese) {
        this.bun = bun;
        this.patty = patty;
        this.cheese = cheese;
    }

    ...
}

public static void main(String[] args) {
    // 모든 재료가 있는 햄버거
    Hamburger hamburger1 = new Hamburger(2, 1, 2, 4, 6, 8);

    // 빵과 패티 치즈만 있는 햄버거
    Hamburger hamburger2 = new Hamburger(2, 1, 1);

    // 빵과 패티 베이컨만 있는 햄버거
    Hamburger hamburger3 = new Hamburger(2, 0, 0, 0, 0, 6);
}

 >> 인스턴스 필드(매개변수)가 늘어날수록 비효율적(가독성, 유지보수 불리)
		생성자로만으로는 필드를 선택적으로 생략할 수 있는 방법이 없음
```

```java
* 자바 빈 패턴(Java Beans)
	: Setter 메소드 사용
			> 매개변수가 없는 생성자로 객체 생성
						>> Setter 메소드 이용 클래스 필드 초기값 설정

class Hamburger {
    // 필수 매개변수
    private int bun;
    private int patty;

    // 선택 매개변수
    private int cheese;
    private int lettuce;
    private int tomato;
    private int bacon;
    
    public Hamburger() {}

    public void setBun(int bun) {
        this.bun = bun;
    }

    public void setPatty(int patty) {
        this.patty = patty;
    }

    public void setCheese(int cheese) {
        this.cheese = cheese;
    }

    public void setLettuce(int lettuce) {
        this.lettuce = lettuce;
    }

    public void setTomato(int tomato) {
        this.tomato = tomato;
    }

    public void setBacon(int bacon) {
        this.bacon = bacon;
    }
}

public static void main(String[] args) {
    // 모든 재료가 있는 햄버거
    Hamburger hamburger1 = new Hamburger();
    hamburger1.setBun(2);
    hamburger1.setPatty(1);
    hamburger1.setCheese(2);
    hamburger1.setLettuce(4);
    hamburger1.setTomato(6);
    hamburger1.setBacon(8);

    // 빵과 패티 치즈만 있는 햄버거
    Hamburger hamburger2 = new Hamburger();
    hamburger2.setBun(2);
    hamburger2.setPatty(1);
    hamburger2.setCheese(2);

    // 빵과 패티 베이컨만 있는 햄버거
    Hamburger hamburger3 = new Hamburger();
    hamburger3.setBun(2);
    hamburger2.setPatty(1);
    hamburger3.setBacon(8);
}

	>> 객체 생성 시점에 모든 값들을 주입하지 않아 
			> 일관성, 불변성 문제 발생
				* 일관성 문제 : 필수 매개변수는 객체 초기화 때 반드시 설정되어야 하는 값인데
												객체를 생성하는 부분과 값을 설정하는 부분이 물리적으로 떨어져 있어
												객체의 일관성이 무너지는 문제(필수 매개변수 누락 등)
				* 불변성 문제 : 외부에서 Setter 메서드를 호출해 객체를 조작 가능
												(불변함을 보장 불가)
```

- 빌더 패턴
    
    >> 별도의 Builder 클래스 생성, 메소드를 통해 단계적으로 값을 입력받은 후 최종적으로 `build()` 메소드로 하나의 인스턴스를 생성하여 리턴
    
    > 빌더 클래스의 메서드를 체이닝(Chaining) 형태로 호출
    > 
    

```java
// 생성될 객체
class Product {
    private String part1;
    private String part2;
    private String part3;

    public void setPart1(String part1) {
        this.part1 = part1;
    }

    public void setPart2(String part2) {
        this.part2 = part2;
    }

    public void setPart3(String part3) {
        this.part3 = part3;
    }

    public void show() {
        System.out.println("Product - Part 1: " + part1 + ", Part 2: " + part2 + ", Part 3: " + part3);
    }
}
```

```java
// Product의 빌드를 담당하는 빌더 클래스
class Builder {
    private Product product;

    public Builder() {
        this.product = new Product();
    }

    public Builder buildPart1(String part1) {
        this.product.setPart1(part1);
        return this;
    }

    public Builder buildPart2(String part2) {
        this.product.setPart2(part2);
        return this;
    }

    public Builder buildPart3(String part3) {
        this.product.setPart3(part3);
        return this;
    }

    public Product getResult() {
        return this.product;
    }
}
```

```java
public class SimpleBuilderExample {
    public static void main(String[] args) {
        // Builder를 통해 Product를 생성
        Product product = new Builder()
                .buildPart1("A")
                .buildPart2("B")
                .buildPart3("C")
                .getResult();

        product.show();
    }
}
```

```jsx
// 생성될 객체
class Product {
    constructor() {
        this.part1 = '';
        this.part2 = '';
        this.part3 = '';
    }

    show() {
        console.log(`Product - Part 1: ${this.part1}, Part 2: ${this.part2}, Part 3: ${this.part3}`);
    }
}
```

```jsx
// Product의 빌드를 담당하는 빌더 클래스
class Builder {
    constructor() {
        this.product = new Product();
    }

    buildPart1(part1) {
        this.product.part1 = part1;
        return this;
    }

    buildPart2(part2) {
        this.product.part2 = part2;
        return this;
    }

    buildPart3(part3) {
        this.product.part3 = part3;
        return this;
    }

    getResult() {
        return this.product;
    }
}
```

```jsx
// Builder를 통해 Product를 생성
const product = new Builder()
    .buildPart1('A')
    .buildPart2('B')
    .buildPart3('C')
    .getResult();

product.show();
```

- 장점
    - 생성자 오버로딩 열거 x
    - 데이터의 순서에 상관없이 객체 생성
        - 생성자 인사 순서 파악 x, 잘못된 값 입력 실수 x

>> 

- 객체 생성 과정을 일관된 프로세스로 표현
- 디폴트 매개변수 생략을 간접적으로 지원
- 필수 멤버와 선택적 멤버를 분리 가능
- 객체 생성 단계를 지연할 수 있음
- 초기화 검증을 멤버별로 분리
- 멤버에 대한 변경 가능성 최소화 추구 > 객체 불변성 부여

- 단점
    - 코드 복잡성 증가
    - 생성자 보다는 성능 떨어짐 ( 생성 비용)
    - 지나친 빌더 남용 금지
        - 필드 수와 변경 가능성 고려(+ API 작성시 유리)
            
                 > 필드 적고 변경 가능성 적 >> 생성자, 정적 팩토리 메소드
            

---

1. 심플 빌더 패턴 : 생성시 지정 인자가 많을때 사용, 객체의 일관성 불변성 목적
2. 디렉터 빌더 패턴 : 객체의 생성 단계 순서를 결정해두고 각 단계를 다양하게 구현할 때

- 심플 빌더 패턴(출처 : Effective Java)⭐
    - 빌더 클래스가 구현할 클래스의 정적 내부 클래스로 구현
        - 하나의 빌더 클래스는 하나의 대상 객체 생성만을 위해 사용
        - 대상 객체는 오로지 빌더 객체에 의해 초기화(생성자 : private - 외부 노출 x)
        - static : 정적 내부 클래스는 외부 클래스의 인스턴스 없이도 생성 가능
        - 메모리 누수 문제 > static 정의 필요
    
    ```java
    public class Product {
        private String part1;
        private String part2;
        private String part3;
    
        // Builder 클래스의 생성자가 private이므로 외부에서 직접 호출할 수 없도록 함
        private Product(Builder builder) {
            this.part1 = builder.part1;
            this.part2 = builder.part2;
            this.part3 = builder.part3;
        }
    
        public void show() {
            System.out.println("Product - Part 1: " + part1 + ", Part 2: " + part2 + ", Part 3: " + part3);
        }
    
        // 정적 이너 클래스인 Builder 클래스
        public static class Builder {
            private String part1;
            private String part2;
            private String part3;
    
            // Builder 클래스의 생성자
            public Builder() {
                // 필요에 따라 초기값 설정
            }
    
            // Part1을 설정하고 Builder 자신을 반환
            public Builder buildPart1(String part1) {
                this.part1 = part1;
                return this;
            }
    
            // Part2를 설정하고 Builder 자신을 반환
            public Builder buildPart2(String part2) {
                this.part2 = part2;
                return this;
            }
    
            // Part3를 설정하고 Builder 자신을 반환
            public Builder buildPart3(String part3) {
                this.part3 = part3;
                return this;
            }
    
            // 최종적으로 Product 객체를 생성하고 반환
            public Product build() {
                return new Product(this);
            }
        }
    }
    
    public class SimpleBuilderExample {
        public static void main(String[] args) {
            // Builder를 통해 Product를 생성
            Product product = new Product.Builder()
                    .buildPart1("A")
                    .buildPart2("B")
                    .buildPart3("C")
                    .build();
    
            product.show();
        }
    }
    ```
    
    ```jsx
    class Product {
        constructor(builder) {
            this.part1 = builder.part1;
            this.part2 = builder.part2;
            this.part3 = builder.part3;
        }
    
        show() {
            console.log(`Product - Part 1: ${this.part1}, Part 2: ${this.part2}, Part 3: ${this.part3}`);
        }
    }
    
    // 정적 이너 클래스인 Builder 클래스
    class Builder {
        constructor() {
            // 필요에 따라 초기값 설정
        }
    
        // Part1을 설정하고 Builder 자신을 반환
        buildPart1(part1) {
            this.part1 = part1;
            return this;
        }
    
        // Part2를 설정하고 Builder 자신을 반환
        buildPart2(part2) {
            this.part2 = part2;
            return this;
        }
    
        // Part3을 설정하고 Builder 자신을 반환
        buildPart3(part3) {
            this.part3 = part3;
            return this;
        }
    
        // 최종적으로 Product 객체를 생성하고 반환
        build() {
            return new Product(this);
        }
    }
    
    // Builder를 통해 Product를 생성
    const product = new Builder()
        .buildPart1('A')
        .buildPart2('B')
        .buildPart3('C')
        .build();
    
    product.show();
    ```
    
- 디렉터 빌더 패턴(출처 : GOF)
    - 조립 방법을 정의한 Director 클래스 활용
        - 여러가지 빌드 형식의 유연한 처리가 목적
    
    ```java
    // 생성될 객체
    class Product {
        private String part1;
        private String part2;
        private String part3;
    
        public void setPart1(String part1) {
            this.part1 = part1;
        }
    
        public void setPart2(String part2) {
            this.part2 = part2;
        }
    
        public void setPart3(String part3) {
            this.part3 = part3;
        }
    
        public void show() {
            System.out.println("Product - Part 1: " + part1 + ", Part 2: " + part2 + ", Part 3: " + part3);
        }
    }
    ```
    
    ```java
    // Product의 생성 과정을 정의하는 인터페이스
    interface Builder {
        void buildPart1(String part1);
        void buildPart2(String part2);
        void buildPart3(String part3);
        Product getResult();
    }
    ```
    
    ```java
    // Builder 인터페이스를 구현하여 Product의 생성 과정을 구체화하는 클래스
    class ConcreteBuilder implements Builder {
        private Product product = new Product();
    
        public void buildPart1(String part1) {
            product.setPart1(part1);
        }
    
        public void buildPart2(String part2) {
            product.setPart2(part2);
        }
    
        public void buildPart3(String part3) {
            product.setPart3(part3);
        }
    
        public Product getResult() {
            return product;
        }
    }
    ```
    
    ```java
    // Builder 인터페이스를 사용하여 Product를 생성하는 클래스
    class Director {
        private Builder builder;
    
        public Director(Builder builder) {
            this.builder = builder;
        }
    
        public void construct() {
            builder.buildPart1("A");
            builder.buildPart2("B");
            builder.buildPart3("C");
        }
    }
    ```
    
    ```java
    public class BuilderExample {
        public static void main(String[] args) {
            // ConcreteBuilder를 통해 Product를 생성
            Builder builder = new ConcreteBuilder();
            Director director = new Director(builder);
            director.construct();
            Product product = builder.getResult();
            product.show();
        }
    }
    ```
    
    ```jsx
    // 생성될 객체
    class Product {
        constructor() {
            this.part1 = '';
            this.part2 = '';
            this.part3 = '';
        }
    
        show() {
            console.log(`Product - Part 1: ${this.part1}, Part 2: ${this.part2}, Part 3: ${this.part3}`);
        }
    }
    ```
    
    ```jsx
    // Product의 생성 과정을 정의하는 인터페이스
    class Builder {
        constructor() {
            this.product = new Product();
        }
    
        buildPart1(part1) {
            this.product.part1 = part1;
        }
    
        buildPart2(part2) {
            this.product.part2 = part2;
        }
    
        buildPart3(part3) {
            this.product.part3 = part3;
        }
    
        getResult() {
            return this.product;
        }
    }
    ```
    
    ```jsx
    // Builder 인터페이스를 구현하여 Product의 생성 과정을 구체화하는 클래스
    class ConcreteBuilder extends Builder {
        constructor() {
            super();
        }
    }
    ```
    
    ```jsx
    // Builder 인터페이스를 사용하여 Product를 생성하는 클래스
    class Director {
        constructor(builder) {
            this.builder = builder;
        }
    
        construct() {
            this.builder.buildPart1('A');
            this.builder.buildPart2('B');
            this.builder.buildPart3('C');
        }
    }
    ```
    
    ```jsx
    // ConcreteBuilder를 통해 Product를 생성
    const builder = new ConcreteBuilder();
    const director = new Director(builder);
    director.construct();
    const product = builder.getResult();
    product.show();
    ```
    
    <aside>
    💡 다양한 상품을 공통된 과정(순차적 ⭐)으로 생성
    
    </aside>
    
    ```java
    public interface TourPlanBuilder {
    
    	TourPlanBuilder title(String title);
    	TourPlanBuilder nightsAndDays(int night, int days);
    
    	TourPlan getPlan();  // 구성요소가 다 들어갔는지 인스턴스의 상태 확인 가능 위치(마지막)
    
    }
    ```
    
    - lombok
    - UriComponentsBuilder