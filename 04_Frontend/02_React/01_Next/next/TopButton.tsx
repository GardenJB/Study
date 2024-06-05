'use client'

export default function TopButton() {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <p className="btn_gotop" style={{ display: 'block', bottom: '25px', position: 'fixed'} }>
      <button type="button" onClick={scrollToTop}>TOP으로 이동</button>
    </p>
  )
}