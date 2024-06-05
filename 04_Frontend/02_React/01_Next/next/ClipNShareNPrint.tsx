'use client'

import { usePathname } from "next/navigation";

export default function ClipNShareNPrint() {

  const URLCopy = () => {
    const pathname = usePathname()
    return console.log(pathname);
  }

  const OpenPrintWindow = () => {
    return 'print';
  }

  return (
    <div className="buttonBox right" >
      <div className="util_clip">
        {/* 클립하기 작성 */}
      </div>
      <div className="util_copy">
        <button type="button" className="btn share" id="btnURLCopy" onClick={ URLCopy }>공유</button>
      </div>
      <div className="util_print">
        <button type="button" className="tn print" onClick={ OpenPrintWindow }>프린트</button>
      </div>
    </div>
  )
}