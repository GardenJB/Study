import { ReactNode } from "react";

type TopProps = {
  title: string,
  description: string,
  Keyword?: ReactNode,
  ListTypeButton?: ReactNode,
  SearchBar?: ReactNode,
  
}


export default function Top ({ title, description, Keyword, ListTypeButton, SearchBar }: TopProps) {

  return (
    <div className="container bg_dark" id="contents">
      <div className="contents">
        <h3>{ title }</h3>
        <p>{ description }</p>
        {ListTypeButton? ListTypeButton : null}
        {Keyword? Keyword : null}
        { SearchBar? SearchBar : null }

      </div>
    </div>  
  )
}