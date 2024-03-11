## ☑️ 인터프리터 패턴(Intepreter)


: 문법적인 규칙을 클래스로 나타내어 표현식을 해석하는 방식으로 동작

: 문법 규칙을 표현하는 언어를 정의하고, 그 언어로 주어진 문제를 해석하거나 해결하는 패턴

- AbstractExpression 추상 표현
    - 해석되는 각 표현식의 공통 인터페이스 정의
- TerminalExpression 종단 표현
    - 터미널 기호에 대응하는 표현식을 해석하는 클래스
- NontermianlExpression 비종단 표현
    - 하나 이상의 터미널 표현식에 대한 연산을 정의하는 클래스
- Context 컨텍스트
    - 해석되는 정보를 제공
    - 인터프리터에 의해 해석되는 문장이나 표현식의 전체 상태를 유지

- 정규표현식

- 장점
    - 유연성
        - 새로운 문법 규칙 추가 , 수정 용이
    - 단순성
        - 구현 간단
- 단점
    - 복잡, 많은 규칙 있다면 성능 문제 유발

- Java
    
    ```java
    // AbstractExpression interface
    interface Expression {
        int interpret(Context context);
    }
    ```
    
    ```java
    // TerminalExpression class
    class NumberExpression implements Expression {
        private int number;
    
        public NumberExpression(int number) {
            this.number = number;
        }
    
        @Override
        public int interpret(Context context) {
            return number;
        }
    }
    ```
    
    ```java
    // NonterminalExpression class
    class AddExpression implements Expression {
        private Expression left;
        private Expression right;
    
        public AddExpression(Expression left, Expression right) {
            this.left = left;
            this.right = right;
        }
    
        @Override
        public int interpret(Context context) {
            return left.interpret(context) + right.interpret(context);
        }
    }
    ```
    
    ```java
    // Context class
    class Context {
        private String input;
        private int output;
    
        public Context(String input) {
            this.input = input;
        }
    
        public String getInput() {
            return input;
        }
    
        public void setInput(String input) {
            this.input = input;
        }
    
        public int getOutput() {
            return output;
        }
    
        public void setOutput(int output) {
            this.output = output;
        }
    }
    ```
    
    ```java
    public class InterpreterPatternExample {
        public static void main(String[] args) {
            // Context 설정
            Context context = new Context("1 + 2 + 3");
    
            // 표현식 생성
            Expression expression = new AddExpression(
                    new NumberExpression(1),
                    new AddExpression(
                            new NumberExpression(2),
                            new NumberExpression(3)
                    )
            );
    
            // 문맥과 함께 표현식 해석
            int result = expression.interpret(context);
    
            System.out.println(context.getInput() + " = " + result);
        }
    }
    ```
    
- JavaScript
    
    ```jsx
    // AbstractExpression class
    class Expression {
        interpret(context) {}
    }
    ```
    
    ```jsx
    // TerminalExpression class
    class NumberExpression extends Expression {
        constructor(number) {
            super();
            this.number = number;
        }
    
        interpret(context) {
            return this.number;
        }
    }
    ```
    
    ```jsx
    // NonterminalExpression class
    class AddExpression extends Expression {
        constructor(left, right) {
            super();
            this.left = left;
            this.right = right;
        }
    
        interpret(context) {
            return this.left.interpret(context) + this.right.interpret(context);
        }
    }
    ```
    
    ```jsx
    // Context class
    class Context {
        constructor(input) {
            this.input = input;
            this.output = 0;
        }
    
        getInput() {
            return this.input;
        }
    
        setInput(input) {
            this.input = input;
        }
    
        getOutput() {
            return this.output;
        }
    
        setOutput(output) {
            this.output = output;
        }
    }
    ```
    
    ```jsx
    // Client code
    const context = new Context("1 + 2 + 3");
    
    const expression = new AddExpression(
        new NumberExpression(1),
        new AddExpression(
            new NumberExpression(2),
            new NumberExpression(3)
        )
    );
    
    const result = expression.interpret(context);
    
    console.log(`${context.getInput()} = ${result}`);
    ```