// 배열이 아닌 스트링을 받게 바꾸기

export default function CardTag({ keywords }: { keywords: string[] }) {
  return (
    <div>
      <p className="tag pTag">
        {keywords.map((keyword, index) =>(
          <span key={index} >
            #{keyword}
          </span>
        ))}
      </p>
    </div>
  )
}