import CardTag from "./CardTag";

type Card = {
  id: number;
  title: string;
  tag: string[];
  content: string;
  viewCount: number;
  date: string;

}

export default function NewsCard({ card }: { card : Card }) {
  return (
    <div>
      <div className='pic'>
        <img src='/a.jpg' alt="" className='iPic' /> 
      </div>
      <div className='txt'>
        <p className='subj iTitle'>{card.title}</p>
        <CardTag keywords={card.tag} />
        <p className='etc'>
          <span className='hit spanHit'>
            ::before
            {card.viewCount}
          </span>
          <span className='source'>
            <img className='iSource' src='https://imgorg.jinhak.com/renewal2019/ipsiinfo/source_jinhak.gif' alt='Source' /> 
          </span>
          <span className='date spanDate'>
            ::before
            {card.date}
          </span>
          ::after
        </p>
      </div>
    </div>
  )
}