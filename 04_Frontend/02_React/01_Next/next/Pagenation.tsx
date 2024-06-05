export default function Pagenation({ now, pageSize, url, type }: { now: number, pageSize: number, url: string, type: string }) {
  return (
    <div>
      {type !== 'scroll' && (
        <p>page</p>
      )}
      {type !== 'page' && (
        <p className="btn_more">
          <button type="button">
            <span>
              <em>
                더보기
                ::after
              </em>
            </span>
          </button>
        </p>
      )}
    </div>
  )
}
