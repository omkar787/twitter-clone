import { BsTwitter } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import {
    TwitterHome,
    TwitterExplore,
    TwitterNotification,
    TwitterMessage,
    TwitterBookmark,
    TwitterList,
    TwitterProfile,
    TwitterMore,
    Profile,
} from "../../static/assets/images";


const LeftPanel = ({ user }) => {
    const iconCss = "h-7";
    const navItemCss =
        "flex items-center gap-5 py-3 cursor-pointer text-xl hover:bg-[#2D3741] " +
        "w-fit rounded-full w-fit rounded-full px-5 transition ease-out duration-300";
    return (
        <div className="h-screen w-[317px] border-r border-gray-600 pl-14 pt-5 flex flex-col gap-5 justify-around">
            <div>
                <BsTwitter className="ml-3" size={"30px"} />
            </div>

            <div>
                <div className={`${navItemCss} `}>
                    <img src={TwitterHome} className={`${iconCss}`} />
                    <div>Home</div>
                </div>

                <div className={`${navItemCss}`}>
                    <img src={TwitterExplore} className={`${iconCss}`} />
                    <div>Explore</div>
                </div>
                <div className={`${navItemCss}`}>
                    <img src={TwitterNotification} className={`${iconCss}`} />
                    <div>Notifications</div>
                </div>
                <div className={`${navItemCss}`}>
                    <img src={TwitterMessage} className={`${iconCss}`} />
                    <div>Messages</div>
                </div>
                <div className={`${navItemCss}`}>
                    <img src={TwitterBookmark} className={`${iconCss}`} />
                    <div>Bookmarks</div>
                </div>
                <div className={`${navItemCss}`}>
                    <img src={TwitterList} className={`${iconCss}`} />
                    <div>Lists</div>
                </div>
                <div className={`${navItemCss}`}>
                    <img src={TwitterProfile} className={`${iconCss}`} />
                    <div>Profile</div>
                </div>
                <div className={`${navItemCss}`}>
                    <img src={TwitterMore} className={`${iconCss}`} />
                    <div>More</div>
                </div>

                <div className="mt-2">
                    <button className="bg-[#1D9BF0] hover:bg-[#1B8CD9] transition ease-out duration-300 text-center text-xl px-5 w-56 h-12 rounded-3xl">
                        Tweet
                    </button>
                </div>
            </div>

            <div className="">
                {user ? (
                    <div className="rounded-full flex gap-3 items-center py-3 px-3 cursor-pointer hover:bg-[#2D3741] transition ease-out duration-300 w-60">
                        <div className="h-10">
                            <img src={Profile} width={"40px"} />
                        </div>
                        <div>
                            <div className="font-semibold">@{user.username}</div>
                            <div className="text-gray-500">{user.emai}</div>
                        </div>
                        <div>
                            <FiMoreHorizontal size={"20px"} />
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default LeftPanel