## Commit

```jsx
git --version

*깃 로컬 저장소 생성
git init

 * pwd : 현재 위치
 * ls -al : 폴더 내 목록(숨김 파일 포함)
 * cd .. : 상위 폴더 이동
 * mkdir : 폴더 만들기
 

* 작업영역 > 준비영역(Ingex) 반영
git add "filename"
git add --all
* 모든 수정 파일을 Staged 상태로 변경
git add --update

* 준비 영역 > 로컬 저장소 반영
git commit -m "message"

* Staging Area 생략하고 commit
( 준비영역에 등록된 적 있는 파일만 가능)
git commit -a -m "message"

```

- 커밋 메시지 변경
(새로운 커밋을 생성하지 않고 가장 최근에 작성한 커밋을 수정)

```jsx
git commit -amend
git commit -amend -m "message"
```

- 현 상태 조회

```jsx
git status
```

- 커밋 메세지 확인

```jsx
git log
git log --oneline
```