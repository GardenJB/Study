
// 메타 데이터
// 페이지별 classname 다름 

export default function Layout({ children, Top, Aside }: { 
  children: React.ReactNode, 
  Top?: React.ReactNode, 
  Aside?: React.ReactNode 
} ) {
  return (
    <div>
      { Top? Top : null }
      <div className="container bg_light">
        <div className="contents sub_section">
          <main>
              { children }
          </main>
          { Aside? Aside : null }
        </div>
      </div>
    </div>
  )
}