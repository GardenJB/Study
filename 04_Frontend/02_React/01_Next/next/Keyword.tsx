import Link from "next/link";

export default function Keyword({ keywords }: { keywords: string[] }) {
  return (
    <p className="keyword">
      {keywords.map((keyword, index) => (
        <Link key={index} href={"/"}>
          <span className="viekeyword">#{keyword}</span>
        </Link>
      ))}
    </p>
  );
}
