## Docker

: 리눅스 컨테이너 기능들을 쉽게 사용할 수 있도록 추상화한 리눅스 명령어/서버 애플리케이션

: 컨테이너 기반 오픈소스 가상화 플랫폼

```bash
* 관리자 모드

wsl --install

* pc 재부팅 후

wsl --set-default-version 2

* 도커 다운로드

docker --version  // Clinet, Server 버전 정보

* docker 실행 후

docker ps // 동작 확인

```

```bash
* docker 명령어 

docker <SUBCOMMAND> (<OPTIONS>)

* docker run 

docker run (<OPTIONS>) <IMAGENAME> (<COMMAND>)

*-i, -t 

```

- 컨테이너

> docker run 으로 실행한 프로세스
> 

- 컨테이너 목록 확인

```bash
docker ps
	= docker container ls
docker ps -a // 모든 컨테이너 목록(종료 포함)
// docker run ... --rm ... > 컨테이너 삭제 옵션으로 목록에 포함 x

** shift + + >> 터미널 새창 추가
```

```bash
* 컨테이너 생애 주기
생성 -> 실행 -> 종료 -> 삭제
(run)       (kill, stop) (rm)
```

- 종료

```bash
// exit
docker (container) stop 컨테이너 이름/ID
docker (container) kill 컨테이너 ID // 강제 종료

// ** uname -a 시스템 정보 출력 후 바로 종료
```

- 삭제

```bash
docker rm 컨테이너 ID

** 지연 후 실행 
sleep  (초단위)

docker rm -f 컨테이너ID // 컨테이너 실행중일 때 컨테이너를 강제 종료하고 삭제

* 중지된 모든 컨테이너 삭제
docker container prune
```

- 도커 이미지

> 파일 시스템에 있는 모든 파일 묶음, 메타데이터
> 

>> 불변성, 이식성

- 유니온 파일시스템 > 읽기 전용
- 생성/삭제 등 추가 작업은 기존 이미지와 다른 층에서 작업 및 기록 됨

```bash
docker diff 컨테이너 ID // 사용한 이미지와 컨테이너 차이를 보여줌
docker commit 컨테이너 Id 이미지명 // 차이를 포함해 이미지로 저장
```

- 현재 로컬에 저장된 이미지 목록 조회

```bash
docker images
= docker image ls
```

<aside>
💡 이미지 이름 < 저장소(Repository) : 태그(Tag)

</aside>

- 이미지 받기

```bash
docker pull 이미지명
docker image pull 이미지명
```

- 이미지 삭제

> 삭제 전 해당 이미지 사용 모든 컨테이너 종료 주의!
> 

```bash
docker rmi 이미지명
docker image rm 이미지명
```

```jsx
* 도커 ubuntu 시작
docker run ubuntu
  // 1. 사용할 이미지가 저장되어 있는지 확인
  // 2. 없다면 다운로드(자동 pull)
  // 3. 컨테이너 생성(create)
	// 4. 시작(start)
  // >> 5. 현재 동작 명령어를 전달하지 않았기 때문에 생성 후 바로 종료
	   // >> 컨테이녀 = 프로세스 : 실행 중인 프로세스가 없으면 컨테이넌는 종료됨 ⭐⭐

docker run --rm -it ubuntu /bin/bash
	// 컨테이너 내부에 들어가기 위해 bash쉘 실행 + 키보드 입력 위해 -it 옵션 추가
  // 프로세스 종료되면 컨테이너 자종 삭제 --rm 옵션 추가

cat /etc/issue  // 내용 그려보기 > 조회
ls  // 목록 조회
exit // bash 쉘 종료 > 컨테이너 종료

** -d : ched mode(백그라운드 모드)
	 -p : 포트 연결  // pc : container

```

- volume
    - 도커에서 volume 오브젝트를 생성, 컨테이너의 디렉토리와 연결

- 컨테이너 로그 보기

```jsx
docker logs [OPTIONS] CoNTAINER

** 옵션 
				--tail 마지막 10줄만 출력
			  -f     실시간 로그 생성 확인

// 중지 ctrl + c
```

- 실행 중인 컨테이너에 명령

```jsx
docker exec [options] container command [arg...]

ex) docker exec -it mysql /bin/bash
			 // 컨테이너 새로 생성하지 않고 기존 컨테이너로 실행
```

- Dockerfile 작성
    - Dockerfile : 도커에서 이미지를 생성하기 위한 용도로 작성
        - 만들 이미지에 대한 정보를 기술한 템플릿
    - copy / run / -y
- docker build

```jsx
docker build [options] path | URL | -
docker build [options] [dockerfile path]
```

- 생성 이미지 이름 지정 : -t 옵션

```jsx
docker build -t(--tag) app .
```

- 도커 파일
    - 명령어들의 나열로 구성
    - line = 지시어(대문자) + …

- 도커 파일 지시어(Instructions)
    - `FROM`
        - 베이스 이미지 지정
        - refistry에서 이미지 pull
        
        ```jsx
        FROM 이미지명
        ```
        
    - `RUN`
        - command 실행(run), 새 이미지에 포함시킴
        - 소프트웨어나 라이브러리 필요 경우, 파일, 디렉토리 필요 경우
        - RUN + 소프트웨어/라이브러리 설치 명령어
        - RUN + 파일/디렉토리 생성 명령어
        - >> 명렁어가 실행된 후의 변경사항이 새 이미지에 반영 됨
        - 이미지를 빌드할 때 실행 ☑️
        
        ```jsx
        // shell form
        RUN <command>
        
        // exec form
        RUN ["<executable>", "<param 1>", "<param 2>"]
        ```
        
        ```jsx
        // shell form
        RUN /bin/bash -c 'echo hello'
        
        // exec form
        RUN ["/bin/bash", "-c", "echo hello"]
        ```
        
    
    - CMD
        - 컨테이너가 시작될 때 실행할 커맨드를 지정
        - 이미 만들어진(빌드 완료된) 이미지로부터 도커 컨테이너를 시작할 때 실행 ☑️
        - 한 도커파일 내 CMD가 여러번 나올 경우 맨 마지막 줄의 CMD 명령만 유효 ⭐
        - param 값 대체 가능 ☑️
            - ENTRYPOINT와 같이 사용되어 default값을 갖는 param 역할을 함 ⭐
        
        ```jsx
        // shell form   >> 환경변수 인식 가능 ☑️ 
        CMD <command>
        								>> ex) CMD echo $HOME
        
        // exec form
        CMD ["<executable>", "<param>"]
        ```
        
    - ENTRYPOINT
        - 컨테이너 시작 시 실행 command 지정
        - 컨테이너 실행 시 param 값을 대체할 수 없음 ☑️
    
    - LABEL
        - key-value 형식 메타데이터를 이미지에 추가
        
        ```jsx
        LABEL <key>=<value> <key>=<value>...
        
        * 이미지 내 label 데이터 확인
        docker image inspect --format='' myimage
        ```
        
    
    - ENV
        - 환경변수 설정 지시어
        - key-value 형식
        
        ```jsx
        ENV <key>=<value>...
        ```
        
    - EXPOSE
        - 컨테이너로 들어오는 트래픽을 특정 포트(port)로 받아들일 수 있도록(listen) 지정
        - 기본 TCP 인식
        
        ```jsx
        EXPOSE <port>/<프로토콜>
        ```
        
    
    - COPY
        - Host 내에 있는 파일 또는 디렉토리를 컨테이너의 파일시스템으로 복사
        - —chown 옵션으로 파일과 디렉토리에 대한 소유 권한 지정 가능
        
        ```jsx
        COPY [--chown=<user>:<group>] <src>...<dest>
        COPY [--chown=<user>:<group>] ["<src>",..."<dest>"]
        ```
        
    
    - ADD
        - 파일 또는 디렉토리를 컨테이너로 복사
        - Host 내에 있는 파일 외에도
        - 경로(URL)를 지정하여 remote 파일/디렉토리를 복사 가능 ☑️
        
        ```jsx
        ADD [--chown=<user>:<group>] <src>... <dest>
        ADD [--chown=<user>:<group>] ["<src>", ... "<dest>"]
        
        ADD http://example.com/.../...
        ```
        
    
    - USER
        - 컨테이너 안에서 명령을 실행할 유저명, 유저그룹 설정
        - 기본 root 계정
        - 선언 이후 명령어들에 적용
        
        ```jsx
        USER <user>[:<group>]
        USER <UID>[:<GID>]
        ```
        
    
    - WORKDIR
        - 작업 디렉토리 설정
        - 이동하려는 디렉토리가 존재하지 않을 경우 해당 디렉토리를 생성하여 이동
        
        ```jsx
        WORKDIR /path/to/workdir
        ```
        
    
    - VOLUME
        - 컨테이너 내의 특정 디렉토리를 컨테이너 외부 경로에 마운트 시켜주는 지시자
        - 컨테이너 내 데이터는 컨테이너 삭제시 없어짐
        - >> 컨테이너가 삭제되어도 데이터가 보존될 수 있도록 컨테이너 내부 경로를 외부로 연결시켜주는 것(마운트)
        
        ```jsx
        VOLUME ["/data"]
        
        ** 기본 마운트 경로
        /var/lib/docker/volumes/{volume명}
        ```
        
    
- 네트워크

```jsx
docker network create <network-name>

* 컨테이너기리 통신하기 위해 같은 네트워크에 연결(소속 같)
docker run --network <network-name>
```