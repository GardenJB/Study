## 컴포짓 패턴 (Composite)


: 복합체 패턴

: 객체들을 `트리 구조`로 구성, 단일 객체와 복합 객체를 동일하게 다루는 패턴

: 복합 객체와 단일 객체가 동일한 인터페이스 사용 가능

: 그릇과 내용물을 동일시해서 재귀적인 구조를 만들기 위한 디자인 패턴 ⭐

- 파일 구조, 게임 인벤토리-가방 아이템 구조 등
    - `계층적 트리 구조 데이터` ⭐
- Component 구현하면서 내부에 Component를 포함하는 것이 Composite 가 되니다.
    - 중첩 구조
- Client는 Composite과 Component를 구분하지 않고 둘 다 Component라는 인터페이스를 구현했다는 사실만 인지

- Component 구성요소
    - 모든 구성 요소에 대한 인터페이스 정의
    - 개별 객체와 복합 객체 공통 메서드
- Leaf 단일 객체
    - Component 구현
    - 자식 요소를 가질 수 없음 ☑️
- Composite 복합 객체
    - Component 구현
    - 자식 요소를 가질 수 있음 ☑️
    - Component 구현체들을 `내부 리스트`로 관리 ⭐⭐
    - 재귀 호출 > 하위 복합 객체 순회

- Java
    
    ```java
    // Component interface
    interface Component {
        void operation();
    }
    ```
    
    ```java
    // Leaf class
    class Leaf implements Component {
        @Override
        public void operation() {
            System.out.println("Leaf operation");
        }
    }
    ```
    
    ```java
    import java.util.ArrayList;
    import java.util.List;
    
    // Composite class
    class Composite implements Component {
        private List<Component> children = new ArrayList<>();
    
        public void add(Component component) {
            children.add(component);
        }
    
        public void remove(Component component) {
            children.remove(component);
        }
    
        @Override
        public void operation() {
            System.out.println("Composite operation");
            for (Component component : children) {
                component.operation();
            }
        }
    }
    ```
    
    ```java
    public class CompositeExample {
        public static void main(String[] args) {
            Leaf leaf1 = new Leaf();
            Leaf leaf2 = new Leaf();
            Composite composite = new Composite();
    
            composite.add(leaf1);
            composite.add(leaf2);
    
            composite.operation();
        }
    }
    ```
    

- JavaScript
    
    ```jsx
    // Component class
    class Component {
        operation() {
            console.log("Component operation");
        }
    }
    ```
    
    ```jsx
    // Leaf class
    class Leaf extends Component {
        operation() {
            console.log("Leaf operation");
        }
    }
    ```
    
    ```jsx
    // Composite class
    class Composite extends Component {
        constructor() {
            super();
            this.children = [];
        }
    
        add(component) {
            this.children.push(component);
        }
    
        remove(component) {
            this.children = this.children.filter(c => c !== component);
        }
    
        operation() {
            console.log("Composite operation");
            this.children.forEach(component => {
                component.operation();
            });
        }
    }
    ```
    
    ```jsx
    // Client code
    const leaf1 = new Leaf();
    const leaf2 = new Leaf();
    const composite = new Composite();
    
    composite.add(leaf1);
    composite.add(leaf2);
    
    composite.operation();
    ```
    

- 장점
    - 일관성 유지
        - 코드 단순
    - 확장성
    - 구조의 유연성
        - 계층 구조를 통해 복잡한 구조 구현 가능
        - 복잡한 트리 구조를 편리하게 사용
    - 다형성과 `재귀` 활용
    - 클라이언트 코드 변경 없이 Component 집합 Composite도 이용 가능
- 단점
    - 복합 객체의 단일화
        - 복합 객체와 단일 개체를 동일하게 처리 > 복합 객체만 특정 동작 수행 어려움
    - 재귀 호출 깊이가 깊어짐
    - 새로운 요소 추가할 경우 제약 존재
        - 공통 인터페이스 설계가 까다로울 수 있음

- Client >>> 가능한 상위 추상적 개체를 가져다 사용!