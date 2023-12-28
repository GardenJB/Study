## Reset

: 작업 취소 

- 돌아가려는 커밋으로 리파지토리는 재설정되고, 해당 커밋 이후의 이력은 사라짐

```jsx
git reset <option> <commit-id>
```

- option

```jsx
* Hard
git reset --hard <commit-id>
	: 되돌린 이력 이후의 내용은 지워짐
		index 취소, add 전 상태(unstaged)
		작업영역의 파일 삭제(모두 취소)

git reset --hard HEAD^
	: 커밋 취소하고 Unstaged 상태로 되돌리기

* Soft
git reset --soft <commit-id>
	: 되돌린 이력 이후의 내용은 보존
		해당 내용의 인덱스/스테이지도 그대로 존재
		바로 다시 커밋 가능한 상태로 남아있음
		add 한 상태
		작업영역 파일 보존(모두 보존)

git reset --soft HEAD^
	: 커밋 이전 staged(added) 상태로 돌아감

( ** 커밋 안 한 상태에서 되돌아가면 복구 x 
git restore 
git restore --staged <file> )

* staged > unstaged
git reset <filename>
git reset HEAD <filename>
	: add 이전 상태로 되돌림

* Mixed
git reset --mixed <commit-id>
	: 디폴드 옵션
		이력은 되돌리고 이후에 변경된 내용에 대해서는 남아있지만 
		인덱스는 초기화
		커밋을 하려면 다시 변경 된 내용은 추가해야 함
		index 취소, add이전(unstaged)
		작업영역의 파일 보존(기본 옵션)

git reset --mixed HEAD^
git reset HEAD^
	: Unstaged 상태로 되돌림

git reset HEAD~2
	: Unstaged 상태로 변경, 마지막 두개 커밋 취소

git reset HEAD
	: add 취소(commit 안 한 상태에서만)

```