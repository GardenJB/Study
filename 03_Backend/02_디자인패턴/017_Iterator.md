### ☑️ 이터레이터 패턴(Iterator)

: 반복자 패턴

: `컬렉션 객체`의 요소에 접근하는 방법을 표준화, 객체 내부 구조에 상관없이 `순차적으로 접근(순회)` 할 수 있게 하는 패턴

: 컬렉션 객체의 내부를 노출x + 요소 접근 가능 ⭐

- Iterator 이터레이터
    - 요소에 접근하는 인터페이스 정의
- ConcretreIterator 구체적인 이터레이터
    - Iterator 인터페이스 구현
    - 실제 컬렉션 객체 내부 탐색
- Aggregate 집합체
    - Iterator 객체 생성 인터페이스 정의
- ConcreteAggregate 구체적인 집합체
    - Aggregate 인터페이스 구현
    - 실제 이터레이터 생성

- 장점
    - 단일 책임 원칙
        - 컬렉션 내부 노출 x , 순회 책임을 Iterator에 위임
    - 컬렉션과 이터레이터의 독립성
        - 컬렉션 구조가 변경되어도 이터레이터 인터페이스 수정 x
    - 순회 로직 외부화
        - 클라이언트가 순회 로직 직접 제어 o
- 단점
    - 코드 복잡성

- Java
    
    ```java
    // Iterator interface
    interface Iterator {
        boolean hasNext();
        Object next();
    }
    ```
    
    ```java
    // ConcreteIterator class
    class ConcreteIterator implements Iterator {
        private String[] elements;
        private int position = 0;
    
        public ConcreteIterator(String[] elements) {
            this.elements = elements;
        }
    
        @Override
        public boolean hasNext() {
            return position < elements.length;
        }
    
        @Override
        public Object next() {
            if (this.hasNext()) {
                return elements[position++];
            }
            return null;
        }
    }
    ```
    
    ```java
    // Aggregate interface
    interface Aggregate {
        Iterator createIterator();
    }
    ```
    
    ```java
    // ConcreteAggregate class
    class ConcreteAggregate implements Aggregate {
        private String[] elements;
    
        public ConcreteAggregate(String[] elements) {
            this.elements = elements;
        }
    
        @Override
        public Iterator createIterator() {
            return new ConcreteIterator(elements);
        }
    }
    ```
    
    ```java
    public class IteratorPatternExample {
        public static void main(String[] args) {
            String[] elements = {"Apple", "Banana", "Cherry"};
    
            Aggregate aggregate = new ConcreteAggregate(elements);
            Iterator iterator = aggregate.createIterator();
    
            while (iterator.hasNext()) {
                System.out.println(iterator.next());
            }
        }
    }
    ```
    
- JavaScript
    
    ```jsx
    // Iterator class
    class Iterator {
        constructor(elements) {
            this.elements = elements;
            this.position = 0;
        }
    
        hasNext() {
            return this.position < this.elements.length;
        }
    
        next() {
            return this.hasNext() ? this.elements[this.position++] : null;
        }
    }
    ```
    
    ```jsx
    // Aggregate class
    class Aggregate {
        constructor(elements) {
            this.elements = elements;
        }
    
        createIterator() {
            return new Iterator(this.elements);
        }
    }
    ```
    
    ```jsx
    // Client code
    const elements = ["Apple", "Banana", "Cherry"];
    
    const aggregate = new Aggregate(elements);
    const iterator = aggregate.createIterator();
    
    while (iterator.hasNext()) {
        console.log(iterator.next());
    }
    ```
    
    - StAX