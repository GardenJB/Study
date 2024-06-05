// window.history.pushState 사용 버튼 상태 조절   잘못된 위치 >> 입시전략 플젝으로 이동

// 'use client'
 
// import { useSearchParams } from 'next/navigation'
 
// export default function SortProducts() {
//   const searchParams = useSearchParams()
 
//   function updateSorting(sortOrder: string) {
//     const params = new URLSearchParams(searchParams.toString())
//     params.set('sort', sortOrder)
//     window.history.pushState(null, '', `?${params.toString()}`)
//   }
 
//   return (
//     <>
//       <button onClick={() => updateSorting('asc')}>Sort Ascending</button>
//       <button onClick={() => updateSorting('desc')}>Sort Descending</button>
//     </>
//   )
// }


'use client'

export default function SortType() {

  function changeListType( type: string ) {
    if(type === 'C') return 'card';
    else return 'list';
  }

  return (
    <p className="sort_com2">
      <a href="javascript:void(0);" onClick={() => changeListType('C')} >
        <img className="cardtype" src="https://imgorg.jinhak.com/renewal2019/common/ico_sort1_on.gif" alt="카드형" />
      </a>
      <a href="javascript:void(0);" onClick={() => changeListType('L')} >
        <img className="listtype" src="https://imgorg.jinhak.com/renewal2019/common/ico_sort2.gif" alt="목록형" />
      </a>
    </p>
  )
}