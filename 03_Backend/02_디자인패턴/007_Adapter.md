## 구조 패턴

### ☑️ 어댑터 패턴(Adapter)

: 서로 다른 인터페이스를 가진 두 개의 클래스를 연결하여 함께 동작할 수 있도록 하는 패턴

- 기존 코드 수정 x, 새로운 클래스 도입해 기존 코드와 함께 작동하게 함
    
    

: 호환되지 않는 인터페이스들을 연결하는 패턴 

- 타겟(Target) : 클라이언트가 직접 호출하는 인터페이스
- 어댑티(Adaptee) : 호환되지 않은 기존 클래스
- 어댑터(Adapter) : 타겟 인터페이스를 구현해 클라이언트 요청을 어댑티로 전달하는 클래스
- 클라이언트(Client) : 특정 작업을 요청하는 클래스

```java
// 클라이언트가 사용하는 인터페이스
interface Target {
    void request();
}
```

```java
// 실제 동작을 하는 클래스
class Adaptee {
    void specificRequest() {
        System.out.println("Adaptee's specificRequest");
    }
}
```

```java
// Adaptee를 Target으로 변환하는 어댑터 클래스
class Adapter implements Target {
    private Adaptee adaptee;

    public Adapter(Adaptee adaptee) {
        this.adaptee = adaptee;
    }

    @Override
    public void request() {
        adaptee.specificRequest();
    }
}
```

```java
public class AdapterExample {
    public static void main(String[] args) {
        // Adaptee 객체 생성
        Adaptee adaptee = new Adaptee();

        // Adapter를 통해 Adaptee를 Target으로 사용
        Target target = new Adapter(adaptee);
        target.request();
    }
}
```

```jsx
// 클라이언트가 사용하는 인터페이스
class Target {
    request() {
        console.log("Target's request");
    }
}
```

```jsx
// 실제 동작을 하는 클래스
class Adaptee {
    specificRequest() {
        console.log("Adaptee's specificRequest");
    }
}
```

```jsx
// Adaptee를 Target으로 변환하는 어댑터 클래스
class Adapter extends Target {
    constructor(adaptee) {
        super();
        this.adaptee = adaptee;
    }

    request() {
        this.adaptee.specificRequest();
    }
}
```

```jsx
// Adaptee 객체 생성
const adaptee = new Adaptee();

// Adapter를 통해 Adaptee를 Target으로 사용
const target = new Adapter(adaptee);
target.request();
```

- 장점
    - 역할에 맞는 코드 분리 가능
- 단점
    - 다수의 인터페이스 및 클래스 도입으로 구조가 복잡해짐

<aside>
💡 서로 다른 인터페이스 두 개를 연결

</aside>

---

> - Enumeration
- Iterator > 컬렉션에서 구조 변경시 **ConcurrentModificationException 
                    >> *동시 수정 방지***
>