import AdStyle from "./Ad.module.css";
import Script from "next/script";

export default function Ad() {
  return (
    <div className={AdStyle.aside_banner}>
      <Script src="//wads.jinhak.com/RealMedia/ads/adstream_jx.ads/U_jinhakinfo/22_Right@x01" />
      <a href="https://wads.jinhak.com/RealMedia/ads/click_lx.ads/U_jinhakinfo/22_···0_336x113/sangji_2023_0410_336x113.html/792f7563516d5a6578346b4141616959" target="_blank">
        <img src="https://navycdn.contentsfeed.com/RealMedia/ads/Creatives/JINHAK/sangji_2023_0410_336x113/sangji200226_336x113.jpg" border="0" /> 
      </a>   
    </div>
  )
}