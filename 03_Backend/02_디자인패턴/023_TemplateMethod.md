### ☑️ 템플릿 메소드 패턴(Template Method)

: 부모 클래스에서 알고리즘 골격정의, 해당 알고리즘의 구조를 변경하지 않고 자식 클래스들이 알고리즘의 특정 단계를 재정의(오버라이드)할 수 있도록 하는 행동 디자인 패턴

: 알고리즘의 뼈대를 정의하고 각 단계를 서브클래스에서 구현하게 하는 행동 디자인 패턴

: 알고리즘 구조를 유지하면서 특정 단계를 서브클래스에서 재정의 할 수 있음

- 오버라이드(재정의)
- 전체적으로 동일하면서 부분적으로 다른 구문으로 구성된 메서드의 코드 중복 최소화 ⭐
- hook 처리
    - 부모의 템플릿 메서드의 영향이나 순서를 제어하고 싶을 때 사용 메서드

- AbstractClass 추상 클래스
    - 알고리즘 뼈대 정의 클래스
    - 템플릿 메소드 포함
- ConcreteClass 구체적인 클래스
    - 추상 클래스에서 정의한 템플릿 메소드의 일부나 전체를 구현 클래스

- 장점
    - 코드 재사용
    - 유연성
    - 구현의 일관성
- 단점
    - 추상 클래스의 증가

- Java
    
    ```java
    // AbstractClass
    abstract class AbstractClass {
        // 템플릿 메소드
        public final void templateMethod() {
            step1();
            step2();
            step3();
        }
    
        // 추상 메소드
        protected abstract void step1();
        protected abstract void step2();
    
        // 구체 메소드
        protected void step3() {
            System.out.println("Default implementation of Step 3");
        }
    }
    ```
    
    ```java
    // ConcreteClass
    class ConcreteClass extends AbstractClass {
        @Override
        protected void step1() {
            System.out.println("Implementing Step 1");
        }
    
        @Override
        protected void step2() {
            System.out.println("Implementing Step 2");
        }
    
        // Step 3은 디폴트 구현 사용
    }
    ```
    
    ```java
    public class TemplateMethodPatternExample {
        public static void main(String[] args) {
            AbstractClass template = new ConcreteClass();
            template.templateMethod();
        }
    }
    ```
    
- JavaScript
    
    ```jsx
    // AbstractClass
    class AbstractClass {
        // 템플릿 메소드
        templateMethod() {
            this.step1();
            this.step2();
            this.step3();
        }
    
        // 추상 메소드
        step1() {
            throw new Error("Abstract method step1() must be implemented.");
        }
    
        step2() {
            throw new Error("Abstract method step2() must be implemented.");
        }
    
        // 구체 메소드
        step3() {
            console.log("Default implementation of Step 3");
        }
    }
    ```
    
    ```jsx
    // ConcreteClass
    class ConcreteClass extends AbstractClass {
        step1() {
            console.log("Implementing Step 1");
        }
    
        step2() {
            console.log("Implementing Step 2");
        }
    
        // Step 3은 디폴트 구현 사용
    }
    ```
    
    ```jsx
    // Client code
    const template = new ConcreteClass();
    template.templateMethod();
    ```
    
    ** 템플릿 콜백 패턴 : 콜백으로 위임을 사용하는 템플릿 패턴
    
    >> 사속 대신 익명 내부 클래스 또는 람다 표현식을 활용
    
    - 무조건 하나의 메소드만