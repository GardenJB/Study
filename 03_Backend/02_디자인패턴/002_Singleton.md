## 생성 패턴

### ☑️ 싱글턴 패턴(Sigleton)

: 클래스의 인스턴스를 `오직 하나` 만 생성, 인스턴스에 `전역적으로 접근` 할 수 있도록 하는 패턴

<aside>
💡 객체의 중복 생성 방지

</aside>

- 장점
    - 여러 곳에서 동시에 접근해야할 데이터나 리소스 관리에 유용
    - 인스턴스 생성 및 초기화 작업 비용이 많이 드는 경우 비용 최소화 가능
- 단점
    - 너무 남발하면 의존성 복잡해짐
- 활용 예시
    - 환경설정 정보, 아이템 창 등

```java
public class Singleton {
    // 정적 멤버 변수로 유일한 인스턴스를 저장합니다.
    private static Singleton instance; ⭐

    // private 생성자로 외부에서의 객체 생성을 막습니다. ⭐⭐
    private Singleton() {
        // 초기화 코드
    }

    // 인스턴스를 반환하는 정적 메서드를 정의합니다.
    public static Singleton getInstance() {
        // 인스턴스가 없는 경우에만 생성합니다.
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }

    // 싱글톤의 기능을 정의합니다.
    public void performAction() {
        System.out.println("Singleton is performing an action.");
    }
}
```

```java
public class SingletonExample {
    public static void main(String[] args) {
        // getInstance 메서드를 통해 싱글톤 인스턴스를 얻습니다. ⭐
        Singleton singleton1 = Singleton.getInstance();
        Singleton singleton2 = Singleton.getInstance();

        // 두 인스턴스가 동일한지 확인합니다.
        System.out.println(singleton1 == singleton2);  // 출력: true

        // 싱글톤의 기능을 사용합니다.
        singleton1.performAction();
        singleton2.performAction();
    }
}
```

```jsx
var Singleton = (function () {
    // 유일한 인스턴스를 저장할 private 변수
    var instance;

    // 생성자 함수
    function createInstance() {
        // 초기화 코드
        return {
            performAction: function () {
                console.log("Singleton is performing an action.");
            }
        };
    }

    // 싱글톤 인스턴스를 반환하는 함수
    return {
        getInstance: function () {
            // 인스턴스가 없는 경우에만 생성
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

// 예시 코드
var singleton1 = Singleton.getInstance();
var singleton2 = Singleton.getInstance();

// 두 인스턴스가 동일한지 확인
console.log(singleton1 === singleton2);  // 출력: true

// 싱글톤의 기능 사용
singleton1.performAction();
singleton2.performAction();
```

<aside>
💡 private 생성자 + static 메소드 >> 간편 b 안전 x!!   : 멀티 스레드 환경 ❗❗

</aside>

⭐⭐⭐

- 메서드의 동기화 : `Synchronized`  사용
    - 메서드 내에 한 스레드만 보장 > 시간차에 따른 서로 다른 인스턴스 생성 방지
    - b get 요청 처리마다 동기화 → 락 > 성능 문제
- 이른 초기화 eager initialization :
    - 개체 미리 생성 : final … > 개체 생성 비용이 크지 않은 경우
    - 미리 생성
    
    ```java
    public class Settings {
    	private static final Settings INSTANCE = new Settings();
    	private Settings() {}
    	public static Settings getInstance() {
    		return INSTANCE;
    	}
    }
    ```
    
    - Thread Safe
- double checked locking
    - 다수의 멀티 스레드 환경에서 모두 확인 가능
    - 필요할 때만 instance 생성 가능 > 성능상 이점
    
    ```java
    public class Settings {
    	private static volatile Settings instance;
    	
    	private Settings() {}
    
    	public static Settings getInstance() {
    		if(instance == null) {
    			synchronized (Settings.class) {
    				if(instance == null) {
    					instance == new Settings();
    				}
    			}
    		}
    		return instance;
    	}
    }
    ```
    
- static inner 클래스 사용 ☑️
    - 멀티 스레드 환경 + 생성 지연시킴(Lazy) > 권장!!
    
    ```java
    public class Settings {
    	
    	private Settings() {}
    	
    	private static class SettingsHolder {
    		private static final Settings INSTANCE = new Settings();
    	}
    	
    	public static Settings getInstance() {
    		return SettingsHolder.INSTANCE;
    	}
    }
    ```
    

- 싱글턴 이외의 인스턴스 생성 문제 발생 경우 ✔️
    - 리플렉션 사용
        - 리플렉션 Reflection
            - 리플렉션은 구체적인 클래스 타입을 알지 못하더라도 그 클래스의 메서드, 타입, 변수들에 접근할 수 있도록 해주는 자바 API를 말하며, 컴파일 시간이 아닌 실행 시간에 동적으로 특정 클래스의 정보를 추출할 수 있는 프로그래밍 기법
            - 리플렉션을 사용하면 접근 제어자와 무관하게 클래스의 필드나 메소드도 가져와서 호출 가능
    
    ```java
    Constructor<Settings> constructor = Settings.class.getDeclaredConstructor();
    constructor.setAccessible(true);
    Settings settings1 = constructor.newInstance();
    
    >> Constructor 사용시 기존 인스턴스와는 다른 인스턴스 생성 문제 발생!
    ```
    
    - 직렬화 / 역직렬화
        - (~ 저장 / 불러오기)
        - `protected Object readResolve() { return getInstance(); }` 로 명시적 해결은 가능
    
    ```java
    import java.io.Serializable;
    
    public class Settings implements Serializable {
    
    	private Settings() {}
    
    	private static void main(String[] args) {
    		Settings settings = Settings.getInstance();
    
    		try (Objectoutput out = new ObjectoutputStream(new FileOutputStream(name: "settings.obj"))) {
    			out.writeObject(settings);	
    		}
    		try(ObjectInput in = new ObjectInputStream(new FileInputStream(name: "settings.obj"))) {
    			settings1 = (Settings) in.readObject();
    		}
    	}
    }
    ```
    
- `Enum` 사용
    - 리플렉션에 안전 ☑️
        - 유일 인스턴스 보장
        - b enum 미리 생성, 상속 x
    
    ```java
    public enum Settings {
    	INSTANCE;
    
    	// ...
    	// private Integer number;
    	// public Integer getNumber() {
    	//  	return number;
    	// }
    	// ...
    	// 생성자, 필드 정의 가능
    }
    ```