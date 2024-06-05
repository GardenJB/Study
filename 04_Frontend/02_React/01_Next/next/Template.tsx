
// 레이아웃 하위 변동성

export default function Template({ children, Top, Aside }: { 
  children: React.ReactNode, 
  Top?: React.ReactNode, 
  Aside?: React.ReactNode 
}) {
  return (
    <div>
      { Top? Top : null }
      <div className="container bg_light">
        <div className="contents sub_section">
          <div>
              { children }
          </div>
          { Aside? Aside : null }
        </div>
      </div>
    </div>
  )
}