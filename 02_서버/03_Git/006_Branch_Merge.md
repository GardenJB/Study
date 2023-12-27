### Branch, Merge

- 브랜치
    - 저장소의 새로운 분할

```jsx
* 로컬 브랜치 목록 출력
git branch -list

* 모든 브랜치 목록
git branch --all

* 브랜치 생성
git branch 브랜치명

* 작업 영역 브랜치 이동
git checkout 브랜치명

* 생성 및 체크 아웃
git checkout -b 브랜치명

* 삭제
git branch -d 브랜치명
git branch --delete 브랜치명

* 이름 변경
git branch -m/--move 이전명 새로운명
```

- 원격 브랜치 가져오기(생성 및 연결)
    
    ```jsx
    git checkout -b 브랜치명 origin/브랜치명
    ```
    

- git Merge 병합
    - Diff 비교
        - 변경 내용을 병합 전 비교
        
        ```jsx
        git diff 원본브랜치 대상브랜치
        git diff 로컬 원격
        ```
        
    - Merge 병합
    
    ```jsx
    * 마스터에 브랜치 병합
    git checkout master
    git merge 브랜치명
    
    * 로컬에 원격 브랜치 병합
    git diff 브랜치명 origin/브랜치명
    git merge origin/브랜치명
    ```
    
    - Conflict 충돌
    
    ```jsx
    * 병합 취소
    git merge --abort
    
    * 충돌 해결
    git add 충돌파일명
    git commit -m "메시지"
    ```
    

```jsx
vi 수정 
cat 조회
cp 복사
```

- Rebase
    - 다른 브랜치를 병합할 때 rebase를 먼저 실행한 후 병합하면 이력을 합쳐줌

```jsx
git rebase --continue/--abort

- 브랜치에서 마스터 리베이스
- 충돌 해결
- 마스터에서 브랜치 병합
```