import { UserType } from "../../../types/ContextTypes";

const UserContainer: React.FC<{userInfo: UserType}> = ( { userInfo }) => {
    const { image, name, username } = userInfo;

    const dynamicImage = require(`../../../assets/user-images/${image}`);

  return (
    <div className="flex items-center gap-8">
        <div className="w-10 h-10">
               <img src={dynamicImage} alt="user" className="object-cover w-full h-auto rounded-full"/> 
        </div>
        <div className="text-[0.8125rem] md:text-[0.875rem]">
            <p className="font-bold tracking-[-0.181px] text-[#3A4374]">{name}</p>
            <p>@{username}</p>
        </div>
    </div>
  )
}

export default UserContainer