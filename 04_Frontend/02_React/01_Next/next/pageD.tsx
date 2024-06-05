// 'use client'

import Ad from "@/app/components/Ad";
import Aside from "@/app/components/Aside";
import CardTag from "@/app/components/CardTag";
import ClipNShareNPrint from "@/app/components/ClipNShareNPrint";
import PopularList from "@/app/components/PopularList";
import RecommendList from "@/app/components/RecommendList";
import Top from "@/app/components/Top";
import ViewNDate from "@/app/components/ViewNDate";
import Layout from "@/app/components/layout/Layout";
import Link from "next/link";
// import { useRouter } from "next/router";

type Card = {
  id: number;
  title: string;
  tag: string[];
  content: string;
  viewCount: number;
  date: string;
};

const card = {
  id: 1,
  title: "Understanding React Hooks",
  tag: ["React", "JavaScript", "Hooks"],
  content: "React Hooks provide a powerful and expressive way to use state and other React features in functional components.",
  viewCount: 1200,
  date: "2024-06-01",
};

const cards: Card[] = [
  {
    id: 1,
    title: "Understanding React Hooks",
    tag: ["React", "JavaScript", "Hooks"],
    content: "React Hooks provide a powerful and expressive way to use state and other React features in functional components.",
    viewCount: 1200,
    date: "2024-06-01",
  },
  {
    id: 2,
    title: "Getting Started with Next.js",
    tag: ["Next.js", "JavaScript", "SSR"],
    content: "Next.js is a React framework that enables server-side rendering and static site generation for React applications.",
    viewCount: 950,
    date: "2024-05-15",
  },
  {
    id: 3,
    title: "TypeScript for Beginners",
    tag: ["TypeScript", "JavaScript", "Programming"],
    content: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript and adds optional static typing to the language.",
    viewCount: 850,
    date: "2024-04-20",
  },
  {
    id: 4,
    title: "Building a REST API with Node.js",
    tag: ["Node.js", "API", "Backend"],
    content: "Node.js allows you to build scalable network applications using JavaScript on the server-side, perfect for building REST APIs.",
    viewCount: 670,
    date: "2024-03-30",
  },
  {
    id: 5,
    title: "Introduction to GraphQL",
    tag: ["GraphQL", "API", "Backend"],
    content: "GraphQL is a query language for your API that allows clients to request exactly the data they need, making APIs more efficient and powerful.",
    viewCount: 1050,
    date: "2024-02-15",
  },
];

const goList = (keyword: string) => {
  return `https://www.jinhak.com/UnivInfo/ThemeUniv/UnivCardNewsList.aspx?&Keyword=${keyword}`;
};

export default function UnivCardNewsListId() {
  // const router = useRouter();

  return (
    <Layout
      Top={
        <Top
          title="대학 카드뉴스"
          description="테마별 컨퍼스 이야기를 전해드립니다"
        />
      }
      Aside={
        <Aside
          PopularList={<PopularList cards={cards} />}
          Ad={<Ad />}
          RecommendList={<RecommendList card={card} cards={cards} />}
        />
      }
    >
      <div className="section_cont">
        <div className="detail_news">
          <div className="top">
            <p id="pTitle" className="subj">{card.title}</p>
            <ViewNDate hit={card.viewCount} date={card.date} />
            <ClipNShareNPrint />
          </div>
          <div id="HtmlCont" className="article_view">
            {cards.map((card) => (
              <div key={card.id}>
                {card.content}
                <br />
                <br />
              </div>
            ))}
          </div>
          <p id="pTag" className="tag">
            {/* {card.tag.map((tag, index) => (
              <Link href={goList(tag)} key={index}>
                <a className="HashTag">
                  <CardTag keywords={card.tag} />
                </a>
              </Link>
            ))} */}
          </p>
          <div className="foot">
            <p id="sourceCompany" className="source">
              Copyright 진학사 All right reserved.
            </p>
          </div>
        </div>
        {/* <p className="btn_center">
          <button onClick={() => router.push(goList(''))} className="btn_com7 bg1">
            목록
          </button>
        </p> */}
      </div>
    </Layout>
  );
}
