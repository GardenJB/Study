## ☑️ 플라이웨이트 패턴(Flyweight)


: 경량 패턴

: `재사용 가능한 객체 인스턴스를 공유`해 메모리 사용량을 최소화하는 구조 패턴 ⭐

: 캐시 개념 패턴화

: 변동 속성과 고정 속성을 분리

→ 고정 속성을 캐시하여 재사용

→ 메모리 사용 감소

: 동일 / 유사 객체들 사이에서 가능한 많은 데이터를 서로 공유해 사용 > 최적화

- 모든 객체 각각 인스턴스화 x
- 객체들 간 상태의 공통 부분을 공유해 사용 ✅

<aside>
💡 RAM 소비 문제 최적화가 필요한 경우 사용! (다수 객체 지원 경우)

</aside>

- 폭탄 피하기 게임의 `폭탄` 객체
- 마인크래프트 생성 `나무` 객체

- Flyweight 플라이웨이트
    - 경량 객체를 묶는 인터페이스 > `공유 가능한` 객체 인터페이스 정의
    - 외부 상태를 받거나 조작 가능
- ConcreteFlyweight 구체적인 플라이웨이트
    - Flyweight 인터페이스 구현, 실제 공유 객체
    - 공유 가능하여 재사용되는 객체
    - intrinsic state
    - 캐시됨
- UnsharedConcreteFlyweight / Context
    - 공유 불가능한 객체
    - extrinsic state
    - 새로 생성됨
    
    - 콘텍스트 + 플라이웨이트  `쌍`
        
        → 원래 객체의 전체 상태를 나타냄 ☑️
        
- FlyweightFactory
    - Flyweight 객체 생성 및 관리 팩토리
    - 경량 객체를 만드는 공장 역할과 캐시 역할 수행 Flyweight 객체 관리 클래스
    - GetFlyweight() 메서드
        - 팩토리 메서드 역할
        - 객체가 메모리에 존재하면 그대로 가져와 반환,
        - 객체가 없는 경우 새로 생성해 반환
- Client
    - FlyweightFactory를 통해 Flywight 타입 객체를 요청해 사용

- intrinsic 상태 ⭐
    - 본질적 상태
    - 장소나 상황에 의존 x → 값 고정
    - 공유 o
- extrinsic 상태 ⭐
    - 장소나 상황에 의존 o → 값 변동
    - 공유 x

- 장점
    - 메모리 사용량 감소
    - 성능 향상
- 단점
    - 상태 공유의 한계

- Java
    
    ```java
    // Flyweight interface
    interface Coffee {
        void serveCoffee(CoffeeContext context);
    }
    ```
    
    ```java
    // ConcreteFlyweight class
    class CoffeeFlavor implements Coffee {
        private final String flavor;
    
        public CoffeeFlavor(String flavor) {
            this.flavor = flavor;
        }
    
        @Override
        public void serveCoffee(CoffeeContext context) {
            System.out.println("Serving coffee flavor " + flavor + " to table " + context.getTable());
        }
    }
    ```
    
    ```java
    import java.util.HashMap;
    import java.util.Map;
    
    // FlyweightFactory class
    class CoffeeFactory {
        private final Map<String, Coffee> flavors = new HashMap<>();
    
        public Coffee getCoffeeFlavor(String flavorName) {
            if (!flavors.containsKey(flavorName)) {
                flavors.put(flavorName, new CoffeeFlavor(flavorName));
            }
            return flavors.get(flavorName);
        }
    
        public int getTotalCoffeeFlavors() {
            return flavors.size();
        }
    }
    ```
    
    ```java
    public class FlyweightExample {
        public static void main(String[] args) {
            CoffeeFactory coffeeFactory = new CoffeeFactory();
            
            Coffee coffee1 = coffeeFactory.getCoffeeFlavor("Cappuccino");
            coffee1.serveCoffee(new CoffeeContext(1));
    
            Coffee coffee2 = coffeeFactory.getCoffeeFlavor("Latte");
            coffee2.serveCoffee(new CoffeeContext(2));
    
            Coffee coffee3 = coffeeFactory.getCoffeeFlavor("Cappuccino");
            coffee3.serveCoffee(new CoffeeContext(3));
    
            System.out.println("Total coffee flavors: " + coffeeFactory.getTotalCoffeeFlavors());
        }
    }
    
    // Context class
    class CoffeeContext {
        private final int table;
    
        public CoffeeContext(int table) {
            this.table = table;
        }
    
        public int getTable() {
            return table;
        }
    }
    ```
    
- JavaScript
    
    ```jsx
    // Flyweight class
    class Coffee {
        serveCoffee(context) {
            console.log(`Serving coffee flavor ${this.flavor} to table ${context.getTable()}`);
        }
    }
    ```
    
    ```jsx
    // ConcreteFlyweight class
    class CoffeeFlavor extends Coffee {
        constructor(flavor) {
            super();
            this.flavor = flavor;
        }
    }
    ```
    
    ```jsx
    // FlyweightFactory class
    class CoffeeFactory {
        constructor() {
            this.flavors = {};
        }
    
        getCoffeeFlavor(flavorName) {
            if (!this.flavors[flavorName]) {
                this.flavors[flavorName] = new CoffeeFlavor(flavorName);
            }
            return this.flavors[flavorName];
        }
    
        getTotalCoffee
    ```