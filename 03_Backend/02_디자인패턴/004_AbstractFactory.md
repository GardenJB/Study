## 추상 팩토리 패턴  Abstract Factory


: 관련된 객체들의 그룹을 생성하기 위한 인터페이스를 제공하는 패턴

> ***공통된 집합을 모아*** 연관된 객체들의 생성을 하나의 팩토리에서 담당
    > 추상 팩토리는 관련 있는 여러 팩토리 메소드를 제공⭐⭐
           >> 각각의 팩토리 메소드는 서로 다른 객체 생성
> 

- 서로 관련된 객체들을 함께 사용해야 할 때 유용
    - 객체들의 생성 방법이 복잡하고, 클라이언트 코드와의 결합도를 낮추고자 할 때 활용
- 객체들의 생성 방법을 추상화하여 클라이언트 코드와의 결합도를 낮춤
    - 추상화된 인터페이스를 통해 객체 생성

- 관련된 객체들의 인스턴스를 생성하기 위한 인터페이스를 제공
- 구체적인 팩토리 클래스는 추상 팩토리를 구현하여 실제 객체의 생성을 담당
- 클라이언트는 추상 팩토리를 통해 객체를 생성하고 사용하며, 구체적인 팩토리 클래스는 클라이언트에 노출되지 않음

- 장점
    - 객체들 간의 관련성을 중요시하는 상황에서 유용
    - 여러 종류의 객체를 생성하는 일관된 팩토리를 제공할 때 유용
- 단점
    - 객체들의 생성 방법이 변경될 때에도 일관된 인터페이스를 유지하기 위해 많은 수정이 필요
        - 변경 가능성이 낮거나, 관련된 객체들의 그룹이 확정적인 경우에 적합
        

```java
public interface Manager { //ProductA
}

public class SoccerManager implements Manager {
}

public class TennisManager implements Manager {
}
```

```java
public interface Player { //ProductB
}

public class SoccerPlayer implements Player {
}

public class TennisPlayer implements Player {
}
```

```java
public interface StaffFactory { ⭐⭐
    Manager createManager();
    Player createPlayer();
}

public class SoccerStaffFactory implements StaffFactory { ⭐⭐

    @Override
    public Manager createManager() {
        return new SoccerManager();
    }

    @Override
    public Player createPlayer() {
        return new SoccerPlayer();
    }
}

public class TennisStaffFactory implements StaffFactory { ⭐⭐

    @Override
    public Manager createManager() {
        return new TennisManager();
    }

    @Override
    public Player createPlayer() {
        return new TennisPlayer();
    }
}
```

```java
public class AbstractFactoryApp { ✅
    public static void main(String[] args) {
        use(new SoccerStaffFactory()); 
        use(new TennisStaffFactory());
    }

    private static void use(StaffFactory factory) {
        Manager manager = factory.createManager();
        Player player = factory.createPlayer();
    }
}
```

```jsx
// 생성될 객체들의 추상 팩토리 클래스
class AbstractFactory {
    createProductA() {
        throw new Error("This method should be overridden by subclasses.");
    }

    createProductB() {
        throw new Error("This method should be overridden by subclasses.");
    }
}
```

```jsx
// 구체적인 객체 생성을 담당하는 팩토리 클래스들
class ConcreteFactory1 extends AbstractFactory {
    createProductA() {
        return new ConcreteProductA1();
    }

    createProductB() {
        return new ConcreteProductB1();
    }
}

class ConcreteFactory2 extends AbstractFactory {
    createProductA() {
        return new ConcreteProductA2();
    }

    createProductB() {
        return new ConcreteProductB2();
    }
}
```

```jsx
// 생성될 객체의 공통 클래스들
class ProductA {
    display() {
        console.log("ProductA is displayed.");
    }
}

class ProductB {
    show() {
        console.log("ProductB is shown.");
    }
}
```

```jsx
// 구체적인 ProductA 클래스들
class ConcreteProductA1 extends ProductA {
    display() {
        console.log("ConcreteProductA1 is displayed.");
    }
}

class ConcreteProductA2 extends ProductA {
    display() {
        console.log("ConcreteProductA2 is displayed.");
    }
}

// 구체적인 ProductB 클래스들
class ConcreteProductB1 extends ProductB {
    show() {
        console.log("ConcreteProductB1 is shown.");
    }
}

class ConcreteProductB2 extends ProductB {
    show() {
        console.log("ConcreteProductB2 is shown.");
    }
}
```

```jsx
// ConcreteFactory1을 통해 ProductA1과 ProductB1을 생성
const factory1 = new ConcreteFactory1();
const productA1 = factory1.createProductA();
const productB1 = factory1.createProductB();
productA1.display();
productB1.show();

// ConcreteFactory2를 통해 ProductA2와 ProductB2를 생성
const factory2 = new ConcreteFactory2();
const productA2 = factory2.createProductA();
const productB2 = factory2.createProductB();
productA2.display();
productB2.show();
```

<aside>
💡 Client > Interface 제공에 집중!

 팩토리를 사용하는 방법에 집중  ⭐⭐⭐⭐⭐⭐

</aside>