
// 사용할지 안할지 결정

// permanentRedirect > viewUpdate >> 요청 많을 경우 제한 가능 일단 api호출로

// 'use server'
 
// import { permanentRedirect } from 'next/navigation'
// import { revalidateTag } from 'next/cache'
 
// export async function updateUsername(username: string, formData: FormData) {
//   try {
//     // Call database
//   } catch (error) {
//     // Handle errors
//   }
 
//   revalidateTag('username') // Update all references to the username
//   permanentRedirect(`/profile/${username}`) // Navigate to the new user profile
// }

export default function ViewNDate({ hit, date}: { hit: number, date: string}) {
  return (
    <p>
      <span id="spanHit" className="hit">
        ::before
        { hit }
      </span>
      <span id="spanDate" className="date">
        ::before
        { date }
      </span>
    </p>
  )
}