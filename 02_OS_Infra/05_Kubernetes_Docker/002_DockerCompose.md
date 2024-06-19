## Docker Compose

- docker compose
    - 단일 서버에서 여러개의 컨테이너를 하나의 서비스로 정의해 컨테이너의 묶음으로 관리할 수 있는 작업 환경을 제공하는 관리 도구
    
    ```jsx
    * docker-compose.yml 예시 wiki.js
    
    version: '3'
    
    services:
      db:
        image: postgres:15
        environment:
          POSTGRES_DB: wiki
          POSTGRES_USER: wiki
          POSTGRES_PASSWORD: example_password
        volumes:
          - pgdata:/var/lib/postgresql/data
    
      wiki:
        image: ghcr.io/requarks/wiki:2
        environment:
          DB_TYPE: postgres
          DB_HOST: db
          DB_PORT: 5432
          DB_USER: wiki
          DB_PASS: example_password
          DB_NAME: wiki
        volumes:
          - wiki_data:/var/wiki/data
        ports:
          - "80:3000"
        depends_on:
          - db
    
    volumes:
      pgdata:
      wiki_data:
    
    ------------------------------------------
    
    docker-compose up -d
    ```
    
- 이미지 로컬 저장
    - save
        - > 이미지 pull 받은 후 적용
        - .tar 파일로 저장
    
    ```jsx
    docker save -o {파일 저장 경로} {image:tag} 
    ```
    
    - load
        - .tar 파일 다시 이미지로 변환
    
    ```jsx
    docker load -i {파일 이름}
    ```
    
    - export
        - 동작중인 컨테이너 .tar파일로 저장
        - 파일 구조가 반영되지 않아 이미지로 사용 못함
    
    ```jsx
    docker export {image} > {file name}
    ```
    
    - import
    
    ```jsx
    docker import {file name} {image:tag}
    ```