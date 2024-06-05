'use client'

type ButtonProps = {
  size: number,
  color: string,
  txt: string
}

export default function Button({ size, color, txt }: ButtonProps) {
  return (
    <div>
      <button>{ txt }</button>
    </div>    
  )
}