## Revert

: 돌아가려는 커밋으로 리파지토리 재설정, 해당 커밋 이후 이력 유지, 새로운 커밋 만들어짐

- 취소가 하나의 커밋으로 간주

```jsx
* 한 단계 이전으로 롤백
git revert HEAD

* 수정하기 이전 초기 버전으로 되돌리기
git checkout filename
	> checkcout - 브랜치 변경
							- 변경 파일 되돌리기

* 파일 삭제
git rm filename
* 파일 삭제 취소
git reset HEAD filename
* 파일 삭제 Unstaged 상태(작업 영역에 남기)
git rm --cached filename

* 파일 이름 변경
git mv filename filename2

mv filename filename2
git rm filename
git add filename2

** 로컬 저장소
* 삭제된 파일 리스트
git ls-files -d
* 삭제
git checkout [files]
* 삭제된 모든 파일 복구(파이프라인)
git ls-files -d | xargs git checkout --

** Unstaged 파일 삭제(추적 중이지 않은 파일만 삭제
	(.gitignore 명시 파일은 유지)
git clean

* 파일만 삭제
git clean -f
* 파일과 폴더
git clean -f -d
* 파일, 폴더, 무시된 파일
git clean -f -d -x
* 가상 실행 후 삭제 예정 파일 알려줌
git clean -n -f

```