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
	TwitterArrow,
	Profile,
} from "../../static/assets/images";

const LeftPanel = ({ user }) => {
	const iconCss = "h-7";
	const navItemCss =
		"flex items-center gap-5 py-3 cursor-pointer text-xl hover:bg-[#2D3741] " +
		"w-fit rounded-full w-fit rounded-full px-5 transition ease-out duration-300";
	return (
		<div className="h-screen w-3/12 border-r border-gray-600 pl-14 pt-5 flex flex-col gap-5 justify-around">
			<div>
				<BsTwitter className="ml-3" size={"30px"} />
			</div>

			<div>
				<div className={`${navItemCss} `}>
					<img src={TwitterHome} className={`${iconCss}`} alt="Home" />
					<div>Home</div>
				</div>

				<div className={`${navItemCss}`}>
					<img src={TwitterExplore} className={`${iconCss}`} alt="Explore" />
					<div>Explore</div>
				</div>
				<div className={`${navItemCss}`}>
					<img
						src={TwitterNotification}
						className={`${iconCss}`}
						alt="Notification"
					/>
					<div>Notifications</div>
				</div>
				<div className={`${navItemCss}`}>
					<img src={TwitterMessage} className={`${iconCss}`} alt="Messages" />
					<div>Messages</div>
				</div>
				<div className={`${navItemCss}`}>
					<img src={TwitterBookmark} className={`${iconCss}`} alt="Bookmarks" />
					<div>Bookmarks</div>
				</div>
				<div className={`${navItemCss}`}>
					<img src={TwitterList} className={`${iconCss}`} alt="Lists" />
					<div>Lists</div>
				</div>
				<div className={`${navItemCss}`}>
					<img src={TwitterProfile} className={`${iconCss}`} alt="Profile" />
					<div>Profile</div>
				</div>
				<div className={`${navItemCss}`}>
					<img src={TwitterMore} className={`${iconCss}`} alt="More Options" />
					<div>More</div>
				</div>

				<div className="mt-2">
					<button className="bg-[#1D9BF0] hover:bg-[#1B8CD9] transition ease-out duration-300 text-center text-xl px-5 w-56 h-12 rounded-3xl">
						Tweet
					</button>
				</div>
			</div>

			<div className="pr-6">
				{user ? (
					// <div className="flex flex-col">
					// 	<div className=" ">
					// 		<div className="shadow-sm shadow-white"></div>
					// 		<span>
					// 			<img
					// 				src={TwitterArrow}
					// 				alt="Arrow"
					// 				className="rotate-180 w-5 shadow-sm shadow-white"
					// 			/>
					// 		</span>
					// 	</div>
					<div className="rounded-full flex  items-center justify-around py-3 px-3 cursor-pointer hover:bg-[#2D3741] transition ease-out duration-300 ">
						<div className="">
							<img src={Profile} width={"40px"} alt="Profile" />
						</div>
						<div>
							<div className="font-semibold">@{user.username}</div>
							<div className="text-gray-500">{user.emai}</div>
						</div>
						<div>
							<FiMoreHorizontal size={"20px"} />
						</div>
					</div>
				) : // </div>
				null}
			</div>
		</div>
	);
};

export default LeftPanel;
