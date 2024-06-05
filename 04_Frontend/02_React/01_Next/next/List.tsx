'use client'

import Link from 'next/link';
import NewsCard from './NewsCard';
import Pagenation from './Pagenation';

type Content = {
  id: number;
  title: string;
  tag: string[];
  content: string;
  viewCount: number;
  date: string;
}

export default function List({ contents }: { contents: Content[] }) {
  return (
    <div>
      {contents.map((content, index) => (
          <NewsCard key={index} card={content} />
        ))}
      <ul id='lvListCard' className='list_news_card lvList'>
        {/* {contents.map((content, index) => (
          <li className={`N0${content.id}`} key={ content.id }>
            <Link href={`../UnivInfo/ThemeUniv/UnivCardNewsDetail/${content.id}`}>
              <a>
                <NewsCard card={content} />
              </a>
            </Link>
          </li>
        ))} */}
        ::after
      </ul>
      <Pagenation now={0} pageSize={10} url={'a'} type={'a'}/>
    </div>
    
  )
}