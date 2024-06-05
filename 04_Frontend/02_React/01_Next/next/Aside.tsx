import { ReactNode } from "react";

type AsideProps = {
  PopularList?: ReactNode,
  Ad?: ReactNode,
  RecommendList?: ReactNode,
  
}

export default function Aside({ PopularList, Ad, RecommendList }: AsideProps) {

  return (
    <div className="section_aside">
      { PopularList? PopularList : null}
      { Ad? Ad : null }
      { RecommendList? RecommendList : null}
    </div>
  )
}