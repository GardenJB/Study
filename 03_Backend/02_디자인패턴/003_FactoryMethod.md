## Factory Method  팩토리 메소드 패턴


---

- Factory 패턴
    
    : 객체 생성 역할을 별도의 클래스(Factory)에게 위임
    
    > Simple Factory 패턴
    > 
    
    ```java
    // 생성될 객체의 공통 인터페이스
    interface Product {
        void display();
    }
    ```
    
    ```java
    // 구체적인 Product 구현 클래스들
    class ConcreteProduct1 implements Product {
        public void display() {
            System.out.println("ConcreteProduct1 is displayed.");
        }
    }
    
    class ConcreteProduct2 implements Product {
        public void display() {
            System.out.println("ConcreteProduct2 is displayed.");
        }
    }
    ```
    
    ```java
    // Product 객체를 생성하는 팩토리 클래스
    class SimpleFactory {
        // 사용자의 선택에 따라 적절한 ConcreteProduct를 생성하여 반환 ⭐
        public Product createProduct(String productType) {
            switch (productType) {
                case "Product1":
                    return new ConcreteProduct1();
                case "Product2":
                    return new ConcreteProduct2();
                default:
                    throw new IllegalArgumentException("Invalid product type");
            }
        }
    }
    ```
    
    ```java
    public class SimpleFactoryExample {
        public static void main(String[] args) {
            // SimpleFactory를 통해 ConcreteProduct1을 생성
            SimpleFactory factory = new SimpleFactory();
            Product product1 = factory.createProduct("Product1");
            product1.display();
    
            // SimpleFactory를 통해 ConcreteProduct2를 생성
            Product product2 = factory.createProduct("Product2");
            product2.display();
        }
    }
    ```
    
    ```jsx
    // 생성될 객체의 공통 클래스
    class Product {
        display() {
            console.log("Product is displayed.");
        }
    }
    ```
    
    ```jsx
    // 구체적인 Product 클래스들
    class ConcreteProduct1 extends Product {
        display() {
            console.log("ConcreteProduct1 is displayed.");
        }
    }
    
    class ConcreteProduct2 extends Product {
        display() {
            console.log("ConcreteProduct2 is displayed.");
        }
    }
    ```
    
    ```jsx
    // Product 객체를 생성하는 팩토리 클래스
    class SimpleFactory {
        // 사용자의 선택에 따라 적절한 ConcreteProduct를 생성하여 반환
        createProduct(productType) {
            switch (productType) {
                case "Product1":
                    return new ConcreteProduct1();
                case "Product2":
                    return new ConcreteProduct2();
                default:
                    throw new Error("Invalid product type");
            }
        }
    }
    ```
    
    ```jsx
    // SimpleFactory를 통해 ConcreteProduct1을 생성
    const factory = new SimpleFactory();
    const product1 = factory.createProduct("Product1");
    product1.display();
    
    // SimpleFactory를 통해 ConcreteProduct2를 생성
    const product2 = factory.createProduct("Product2");
    product2.display();
    ```
    
    - 확장 용이
    - 변경에 불리( 타입이 추가될 때마다 switch문 추가 필요)

---

- 팩토리 메서드(Factory Method)
    
    : 인스턴스 생성을 서브 클래스에 위임
    
     > 객체의 인스턴스화를 캡슐화, 클라이언트가 어떤 구체 클래스의 인스턴스를 생성하는지에 대해 알 필요 없이 객체를 생성할 수 있도록 해주는 디자인 패턴
    
    > 객체를 생성할 때 어떤 클래스의 인스턴스를 만들지 서브 클래스에서 결정
    > 

- 추상 클래스에는 팩토리 메소드가 선언되어 있으며, 인스턴스 생성을 담당합니다.
- 실제 객체의 생성은 추상 클래스를 상속받은 구체 클래스에서 이루어집니다.
- 클라이언트는 추상 클래스를 통해 인스턴스를 생성하고 사용하며, 구체 클래스에 대한 의존성을 줄일 수 있습니다.

- 장점
    - 유연성과 확장성을 제공(수정에 닫 / 확장에 열 > OCP원칙 지킴)⭐
    - 새로운 구체 클래스를 추가하거나 기존의 구체 클래스를 변경해도 클라이언트 코드에는 영향을 주지 않음(기존 코드의 변경 없이 확장 가능)
    - 객체의 생성 과정을 캡슐화함으로써 클라이언트 코드의 가독성과 유지보수성을 향상시킴
- 단점
    - 많은 클래스 정의 필요

```java
// 생성될 객체의 공통 인터페이스
interface Product {
    void display();
}
```

```java
// 구체적인 Product 구현 클래스들
class ConcreteProduct1 implements Product {
    public void display() {
        System.out.println("ConcreteProduct1 is displayed.");
    }
}

class ConcreteProduct2 implements Product {
    public void display() {
        System.out.println("ConcreteProduct2 is displayed.");
    }
}
```

```java
// Product의 생성을 담당하는 인터페이스 ⭐
interface Creator {
    Product createProduct();
}

// 구체적인 Product의 생성을 담당하는 클래스
class ConcreteCreator1 implements Creator {
    public Product createProduct() {
        return new ConcreteProduct1();
    }
}

class ConcreteCreator2 implements Creator {
    public Product createProduct() {
        return new ConcreteProduct2();
   }
}
```

```java
public class FactoryMethodExample {
    public static void main(String[] args) {
        // ConcreteCreator1을 통해 ConcreteProduct1을 생성
        Creator creator1 = new ConcreteCreator1();⭐
        Product product1 = creator1.createProduct();
        product1.display();

        // ConcreteCreator2를 통해 ConcreteProduct2를 생성
        Creator creator2 = new ConcreteCreator2();
        Product product2 = creator2.createProduct();
        product2.display();
    }
}
```

```jsx
// 생성될 객체의 공통 클래스
class Product {
    display() {
        console.log("Product is displayed.");
    }
}
```

```jsx
// 구체적인 Product 클래스들
class ConcreteProduct1 extends Product {
    display() {
        console.log("ConcreteProduct1 is displayed.");
    }
}

class ConcreteProduct2 extends Product {
    display() {
        console.log("ConcreteProduct2 is displayed.");
    }
}
```

```jsx
// Product의 생성을 담당하는 클래스
class Creator {
    createProduct() {
        throw new Error("This method should be overridden by subclasses.");
    }
}
```

```jsx
// 구체적인 Product의 생성을 담당하는 클래스
class ConcreteCreator1 extends Creator {
    createProduct() {
        return new ConcreteProduct1();
    }
}

class ConcreteCreator2 extends Creator {
    createProduct() {
        return new ConcreteProduct2();
    }
}
```

```jsx
// ConcreteCreator1을 통해 ConcreteProduct1을 생성
const creator1 = new ConcreteCreator1();
const product1 = creator1.createProduct();
product1.display();

// ConcreteCreator2를 통해 ConcreteProduct2를 생성
const creator2 = new ConcreteCreator2();
const product2 = creator2.createProduct();
product2.display();
```

<aside>
💡 팩토리를 구현하는 방법에 집중 ⭐⭐⭐⭐⭐

</aside>