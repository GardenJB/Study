## 프로토타입 패턴 (Prototype)

: 객체 생성 비용이 높은 경우, 유사한 `객체를 복사`하여 새로운 객체를 생성하는 패턴 > Clone

- 기존 객체의 상태를 기반으로 새로운 객체를 생성 가능
    
    ex) 게임 몬스터를 여러 마리 생성해야 하는 경우 
    
    - 모든 (같은 종류) 몬스터는 독립적인 개체여야 함 > ≠ = true
    - 내용은 같은 객체여야 함 > .equals = true

```java
// 복제 가능한 객체의 프로토타입 인터페이스
interface Prototype extends Cloneable {
    Prototype clone();
}
```

```java
// Prototype 인터페이스를 구현한 구체적인 클래스
class ConcretePrototype implements Prototype {
    private String field;

    public ConcretePrototype(String field) {
        this.field = field;
    }

    @Override
    public Prototype clone() {
        // 복제하여 새로운 객체 생성
        return new ConcretePrototype(this.field);
    }

    public void setField(String field) {
        this.field = field;
    }

    public void display() {
        System.out.println("ConcretePrototype: " + field);
    }
}
```

```java
public class PrototypeExample {
    public static void main(String[] args) {
        // 원본 객체 생성
        ConcretePrototype original = new ConcretePrototype("Original Field");
        original.display();

        // 복제를 통해 새로운 객체 생성
        ConcretePrototype cloned = (ConcretePrototype) original.clone();
        cloned.display();

        // 필드 수정
        cloned.setField("Modified Field");
        cloned.display();
    }
}
```

```jsx
// 복제 가능한 객체의 프로토타입 클래스
class Prototype {
    constructor(field) {
        this.field = field;
    }

    clone() {
        // 복제하여 새로운 객체 생성
        return new Prototype(this.field);
    }

    setField(field) {
        this.field = field;
    }

    display() {
        console.log(`Prototype: ${this.field}`);
    }
}
```

```jsx
// 원본 객체 생성
const original = new Prototype("Original Field");
original.display();

// 복제를 통해 새로운 객체 생성
const cloned = original.clone();
cloned.display();

// 필드 수정
cloned.setField("Modified Field");
cloned.display();
```

- 장점
    - 객체 생성 비용 절약(인스턴스화 과정 생략) > 대량 생산
    - 유사 객체 사용 시 유용
    - 기존 개게 생성 방법을 몰라도 생성 가능
    - 생성자 동작 처리 배제
    - 추상 타입 반환 가능
- 단점
    - 깊은 복사 / 얕은 복사 구별 주의⭐
    - 객체 복제 과정의 복잡성 (순환 참조 등)

- 네트워크, db 호출 객체
- 기존 인스턴스(프로토타입으로 사용) 복제, 일부 변경

```java
public class ... implements Cloneable {

	...
	@Override
	protected Object clone() throws CloneNotSupportedException {
		return super.clone();  // 자바는 기본적으로 얕은 복사를 제공 주의 shallow copy
	}

	// Override equlas method 추가

} 

...
	public static void main(Stirng[] args) throws CloneNotSupportedException {
		Githubissue clone = (GithubIssue) githubissue.clone();

		System.out.println(clone != githubIssue);  // true
		System.out.println(clone.equals(githubIssue));  // true 
				// 내부 data가 현재 바뀐 부분 없음
		System.out.println(clone.getClass() == githubIssue.getClass());  // true

		// 자바 shallow copy
		System.out.println(clone.getRepository() == githubIssu.getRepository()); // true  repository 필드값
				// 기존 reference를 그대로 가리키게 되기 때문에 변화에 영향 받음
				>> Override 직접 구현  ex) repository.setId(this.id); ...
	}
```

```java
** Collections clone ⭐⭐

List<Student> students = new ArrayListh<>();

List<Student> clone = new ArrayList<>(students); // 얕은 복사 이용
```

- ModelMapper ⭐⭐ (~Reflection)

```java
ModelMapper modelMapper = new ModelMapper();
GithubIssueData githubIssueData = modelMapper.map(githubIssue, GithubIssueData.class);
```