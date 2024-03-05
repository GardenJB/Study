## ☑️ 프록시 패턴(Proxy)


: 객체에 대한 대리자/대체 역할의 객체를 제공하여 다른 객체에 대한 접근을 제어하거나 추가적인 기능을 제공하는 구조적 디자인 패턴

: 프록시 > 원래 객체에 대한 접근을 제어

→ 요청이 원래 객체에 전달되기 전/후에 무언가를 수행할 수 있도록 함.

- 해당 객체가 메모리에 존재하지 않아도 기본적인 정보를 참조하거나 설정 가능
- 실제 객체의 기능이 필요한 시점까지 객체의 생성을 미룰 수 있음

- 서비스 인터페이스 / Subject
    - 실 서비스 제공 인터페이스 정의
    - 프로시가 서비스 객체로 위장하려면 해당 인터페이스를 따라야 함 ⭐
- 서비스 / RealSubject
    - 주체 역할을 실제로 수행하는 클래스
- 프록시 Proxy
    - 주체와 동일한 인터페이스를 구현
    - 주체에 대한 접근을 제어하거나 추가적인 기능을 제공하는 클래스
- 클라이언트 Client
    - 프록시 사용

- 종류
    - 가상 프록시
        - 꼭 필요로 하는 시점까지 객체의 생성을 연기, 해당 개게가 생성된 것처럼 동작하게 만들고 싶을 때 사용
        - 프록시 클래스에서 작은 단위의 작업을 처리, 리소스가 많이 요구되는 작업들은 주체 클래스를 사용하도록 구현
    - 원격 프록시
        - 원격 객체에 대한 접근 > 제어 로컬 환경에 존재, 원 객체에 대한 대리자 객체 / 서로 다른 주소 공간에 있는 객체에 대해 마치 같은 주소 공간에 있는 것 처럼 동작하게 함
    - 보호 프록시
        - 주체 클래스에 대한 접근을 제어하기 위한 경우, 객체에 대한 접근 권한을 제어 혹은 객체마다 접근 권한을 달리하고 싶은 경우 사용
        - 프록시 클래스에서 클라이언트가 주체 클래스에 대한 접근 허용 여부를 결정하도록 함
    
- 장점
    - 접근 제어
        - 실 주체에 대한 접근 제어 > 보안 유리
    - 리소스 절약
        - 실 주체의 생성 및 초기화 비용이 많이 들 경우, 프록시를 사용하여 필요한 시점에서만 실제 주체를 생성 가능
    - 사이즈가 큰 객체가 로딩되기 전에도 프록시를 통해 참조 가능 ⭐⭐
    - 실제 객체의 public, protected 메소드를 숨기고 인터페이스를 통해 노출 가능
    - 로컬에 있지 않은 객체 사용 가능
    - 추가 기능 제공
        - 원래 객체 접근에 대한 사전처리 가능 ✅
- 단점
    - 빈번한 객체 생성 시 성능 저하
    - 코드 복잡성
        - 로직 복잡해짐
    - 프록시 내부에서 객체 생성을 위해 스레드가 생성, 동기화 구현되는 경우 성능 저하

- Java
    
    ```java
    // Subject interface
    interface Image {
        void display();
    }
    ```
    
    ```java
    // RealSubject class
    class RealImage implements Image {
        private String filename;
    
        public RealImage(String filename) {
            this.filename = filename;
            loadImageFromDisk();
        }
    
        private void loadImageFromDisk() {
            System.out.println("Loading image: " + filename);
        }
    
        @Override
        public void display() {
            System.out.println("Displaying image: " + filename);
        }
    }
    ```
    
    ```java
    // Proxy class
    class ProxyImage implements Image {
        private RealImage realImage;
        private String filename;
    
        public ProxyImage(String filename) {
            this.filename = filename;
        }
    
        @Override
        public void display() {
            if (realImage == null) {
                realImage = new RealImage(filename);
            }
            realImage.display();
        }
    }
    ```
    
    ```java
    public class ProxyPatternExample {
        public static void main(String[] args) {
            Image image = new ProxyImage("example.jpg");
    
            // 이미지 로딩 및 표시
            image.display();
    
            // 이미지를 다시 표시하면 로딩 과정이 생략됨
            image.display();
        }
    }
    ```
    
- JavaScript
    
    ```jsx
    // Subject class
    class Image {
        display() {}
    }
    ```
    
    ```jsx
    // RealSubject class
    class RealImage extends Image {
        constructor(filename) {
            super();
            this.filename = filename;
            this.loadImageFromDisk();
        }
    
        loadImageFromDisk() {
            console.log("Loading image: " + this.filename);
        }
    
        display() {
            console.log("Displaying image: " + this.filename);
        }
    }
    ```
    
    ```jsx
    // Proxy class
    class ProxyImage extends Image {
        constructor(filename) {
            super();
            this.realImage = null;
            this.filename = filename;
        }
    
        display() {
            if (!this.realImage) {
                this.realImage = new RealImage(this.filename);
            }
            this.realImage.display();
        }
    }
    ```
    
    ```jsx
    // Client code
    const image = new ProxyImage("example.jpg");
    
    // 이미지 로딩 및 표시
    image.display();
    
    // 이미지를 다시 표시하면 로딩 과정이 생략됨
    image.display();
    ```
    
    ```java
    public interface GameService {
    	void startGame();
    }
    ```
    
    ```java
    public class DefaultGameService implements GameService {
    	@Override
    	public void startGame() {
    		System.out.println("이 자리에 오신 여러분을 진심으로 환영합니다.");
    	}
    }
    ```
    
    ```java
    /*
    * public class GameService {
    * 	public void startGame() {
    * 		System.out.println("이 자리에 오신 여러분을 진심으로 환영합니다.");
    * 	}
    * }
    */
    ```
    
    ```java
    public class GameServiceProxy implements GameService {
    	private GameService gameService;
    
    	** public GameServiceProxy(GameService gameService) {
    		this.gameService = gameService;
    	}
    
    	@Override
    	public void startGame() {
    		long before = System.currentTimeMillis();
    
    		** if(this.gameService == null) {
    			this.gameService = new DafaultGameService();
    		}
    
    		gameService.startGame();
    		System.out.println(System.currentTimeMillis() - before);
    	}
    }
    ```
    
    ```java
    /* public class GameServiceProxy extends GameService {
    * 	@Override
    * 	public void startGame() {
    * 		long before = System.currentTimeMillis();
    * 		super.startGame();
    * 		System.out.println(System.currentTimeMillis() - before);
    * 	}
    * }
    */
    ```
    
    ```java
    public class Client {
    	public static void main(String[] args) {
    		** GameService gameService = new GameServiceProxy(new DefaultGameService());
    	  ** GameService gameService = new GameServiceProxy();
    		gameService.startGame();
    	}
    }
    ```
    
    ```java
    /* public class Client {
    * 	public static void main(String[] args) {
    * 		GameService gameService = new GameServiceProxy();
    * 		gameService.startGame();
    * 	}
    * }
    */
    ```
    
    - Aspect - AOP