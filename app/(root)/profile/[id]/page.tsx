import { ProfileHeader } from "@/components/cards/Profilecard.home";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server"

async function Page({  params}:{params:{id:string}}){
  const {id} = await params;
  const user = await currentUser();
  if(!user) return null
  const userInfo = await fetchUser(params.id);
  console.log(`THIS IS USER - ${userInfo}`);
  

  return(
    <section className="text-white mt-40 ml-80">
      <ProfileHeader
        accountId = {userInfo._id}
        authUserId = {user.id}
        name = {userInfo.name}
        username = {userInfo.username}
        ImageUrl = {userInfo.image}
        bio = {userInfo.bio}
      />
    </section>
  )
}
export default Page