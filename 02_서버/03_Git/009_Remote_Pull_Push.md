## Remote, Pull, Push

```jsx
* remote name <name> / repository <url> 연결
git remote add <name> <url>

* 원격 저장소 목록 보기
git remote -v
git remote --verbose

* 원격 저장소 갱신
git remote update
git remote prune origin
git fetch --prune

* 원격에서 삭제된 브랜치 업데이터
git remote prune origin
git remote update --prune

* 원격 저장소 브랜치 확인
git branch -r
git branch --remotes

* 원격과 로컬의 브랜치 확인
git branch -a
git branch --all

* 원격 저장소 브랜치 가져오기
	(가져와서 동일한 이름으로 브랜치 생성 및 체크아웃)
git checkout -t origin/master

* 가져온 후 이름 변경 브랜치 생성 및 체크아웃
git checkout -b master2 origin/master

* 원격 저장소 브랜치 확인
	(로컬에서 받아서 확인 후 테스트 가능
		b 커밋, 푸시할 수 없고 체크아웃 시 사라짐)
git checkout origin/master

** Pull
	: 원격 저장소의 내용을 로컬 저장소에 갱신
		원격 > 로컬 (fetch + merge)
git pull

git pull origin master
git pull --rebase origin master
충돌이 발생하면 수정 후 (git add / git rm)
git rebase --continue / git rebase --abort

* 리모토로부터 가져온 커밋 뒤에 새로운 커밋 추가
git pull --rebase=preserve origin master

** Push
	: 로컬 저장소의 변경 내용을 원격 저장소로 보냄
*git push --set-upstream origin master
	> 원격 저장소의 업스트림 브랜치 지정하기(처음 한번만)

* 원격 브랜치 전송
git push origin master

* 새로운 브랜치를 원격에 전송
	(운격저장소에 새로운 브랜치 생성 및 반영)
git checkout -b masster2
git push origin master2

* git push origin HEAD : master
	origin : 원격 저장소
	HEAD : 전송할 최종 커밋
	master : 원격 저장소의 brach 이름

* 강제 push
git push --force origin HEAD :master
git push origin +HEAD :master

* 원격 브랜치 삭제
git push -delete origin feature

* 원격 브랜치 삭제
git push -delete origin feature

- 원격
git push origin --delete <branchname>
- 로컬
git branch -d <branchname>
git branch -D <branchname>

git push [remotename] [:branch]
git push origin :master2
git push [remotename][localbranch][:remotebranch]

* 충돌이 나면 push 하지 않음
git push --force-with-lease origin master

** Fetch
* 원격 저장소 내용을 로컬에 내려받음
	(원격 > 로컬)
git fetch origin

* 원격 저장소의 데이터를 가져온 후 병합
git fetch origin master
git merge origin/master

* 원격 저장소의 데이터를 가져온 후 로컬 브랜치가 원격의이력을 가지도록 변경
	> 로컬에 있는 모든 변경 내용과 확정본을 포기
git fetch origin master
git reset --hard origin/master

** 원격 저장소 관리
* 원격 저장소 살펴보기
git remote show [remotename]
git remote show origin

* 원격 저장소 이름 변경
git remote rename [대상이름] [새로운이름]

* 원격 저장소 삭제
git remote rm [remotename]

** Stash
	: 커밋하지 않고 나중에 다시 돌아와서 작업을 수행할 때 현재 상태를 저장
		Stash 명령은 워킹 디렉토리에서 수정한 파일만 저장
		>> 아직 끝나지 않은 수정사항을 스택에 잠시 저장했다가 나중에 다시 작업 수행
			(Modified + Tracked file + Staging Area 존재 파일 보관 장소 = Stash)

* 목록 보기
git stash list

* 현재 작업 저장 (현재 작업 저장 후 HEAD로 이동/git reset --hard)
git stash save

* 저장 작업 꺼내기
 > 가장 최근에 저장한 stash가 현재 브랜치에 적용됨
	 꺼낸 작업은 list에서 삭제
git stash pop
	
	* list에 남겨둔 채로 꺼내기
git stash apply
git sstash apply stash@{0}

* 저장된 작업 삭제 (stash가 현재 브랜치에 적용, 리스트에서 삭제)
git stash drop
git stash drop stash@{0}

* 전체 리스트 삭제
git stash clear

* stash 적용 브랜치 생성
	> Stash 할 당시의 커밋을 checkout 후 새로운 브랜치 생성 및 적용
		충돌 없이 적용 후 확인이 성공하면 stash 삭제
git stash branch newbranch
```