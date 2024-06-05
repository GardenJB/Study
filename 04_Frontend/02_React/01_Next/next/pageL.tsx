import Keyword from "@/app/components/Keyword";
import List from "@/app/components/List";
import SearchBar from "@/app/components/SearchBar";
import Top from "@/app/components/Top";
import Template from "@/app/components/template/Template";

const keywords: string[] = [
  "React",
  "JavaScript",
  "Web Development",
  "Next.js",
  "TypeScript"
];

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


export default function UnivCardNewsList () {
  return (
    <Template
      Top={
        <Top 
          title="대학 카드뉴스"
          description="테마별 캠퍼스 이야기를 전해드립니다."
          Keyword={
            <Keyword keywords={keywords} />
          }
          SearchBar={<SearchBar />}
        />
      }
    >
      <div>
        <List contents={cards} />
      </div>
    </Template>
  )
}