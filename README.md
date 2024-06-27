# Study
학습 내용 정리
import { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from '../components/PostList';
import KeywordFilter from '../components/KeywordFilter';
import Keyword from '../components/Keyword';
import { fetchPosts } from '../lib/api';

interface Post {
  id: number;
  target: string;
  categoryCode: string;
  title: string;
  shortTitle: string;
  shortContent: string;
  subContent: string;
  keyword: string;
  hit: number;
  image: string;
  regDate: string;
  isView: boolean;
  companyID: number;
  // 기타 게시글 필드들
}

interface HomeProps {
  initialPosts: Post[];
}

export default function Home({ initialPosts }: HomeProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [keyword, setKeyword] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleKeywordChange = async (newKeyword: string) => {
    setKeyword(newKeyword);
    setPage(1);
    const response = await fetchPosts(newKeyword, 1);
    setPosts(response.data);
  };

  const handleKeywordClick = (clickedKeyword: string) => {
    handleKeywordChange(clickedKeyword);
  };

  const loadMorePosts = async () => {
    setIsLoading(true);
    const nextPage = page + 1;
    const response = await fetchPosts(keyword, nextPage);
    setPosts(prevPosts => [...prevPosts, ...response.data]);
    setPage(nextPage);
    setIsLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2 && !isLoading) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, keyword, page]);

  return (
    <div>
      <KeywordFilter keyword={keyword} onKeywordChange={handleKeywordChange} />
      <Keyword keywords={['키워드1', '키워드2', '키워드3']} onKeywordClick={handleKeywordClick} />
      <PostList posts={posts} />
      {isLoading && <p>Loading more posts...</p>}
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetchPosts('', 1);
  return {
    props: {
      initialPosts: response.data,
    },
  };
}




const cards = [
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




'use client'

import { getKeyword, getList } from "@/api/api";
import Keyword from "@/app/components/Keyword";
import List from "@/app/components/List";
import SearchBar from "@/app/components/SearchBar";
import Top from "@/app/components/Top";
import { useEffect, useState } from "react";


export default function UnivCardNewsList() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState<string>('');
  const [nowPage, setNowPage] = useState<number>(1);

  useEffect(() => {
    const fetchInitialData = async () => {
      const keywordList = await getKeyword()
                                .then(res =>{
                                  let list: string[] =[];
                                  for( let key of res[0]) {
                                    list.push(key.Keyword)
                                  }
                                  return list
                                })
      setKeywords(keywordList);
      const cardList = await getList('', 1)
                              .then(res =>{
                                 return res[0]  
                              })
      setCards(cardList)
    }
    fetchInitialData();
  }, []);

  // useEffect(() => {
  //   const fetchCards = async () => {
  //     const cardNewList = await getList(selectedKeyword, nowPage)
  //                                 .then(res =>{
  //                                   return res[0]  
  //                                 })
  //     setCards(cardNewList[0]);
  //   }

  //   if (selectedKeyword !== '') {
  //     fetchCards();
  //   }
  // }, [selectedKeyword]);

  // const handleKeywordClick = (keyword: string) => {
  //   setSelectedKeyword(keyword);
  // };

  return (
    <div>
      <Top
        title="대학 카드뉴스"
        description="테마별 캠퍼스 이야기를 전해드립니다."
        Keyword={
          <Keyword keywords={keywords} />
        }
      />
      <div className="container bg_dark">
        <div className="contents">
          <SearchBar />
          <List contents={cards} />
        </div>
      </div>
    </div>
  );
}