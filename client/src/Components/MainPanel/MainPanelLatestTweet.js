import React from "react";
import { FcBusinessman, FcBusinesswoman, FcManager } from "react-icons/fc"
export default function MainPanelLatestTweet({ latestTweets }) {
	// console.log(latestTweets);
	return (
		<div className="">
			{latestTweets.map((twt, index) => {
				return <IndividualTweets key={index} data={twt} />;
			})}
		</div>
	);
}

const IndividualTweets = ({ data }) => {
	// console.log(data);
	const icons = [<FcBusinessman size={"40px"} />, <FcBusinesswoman size={"40px"} />, <FcManager size={"40px"} />]
	return (
		<div className="pt-5 px-3 pb-1 flex gap-5 text-sm border-b border-gray-600 
						hover:bg-[#2D3741] transition duration-500 ease-in-out cursor-pointer">
			<div>
				{/* <img src={icons[Math.floor(Math.random() * icons.length)]} width={"40px"} alt="Profile" /> */}
				{
					icons[Math.floor(Math.random() * icons.length)]
				}
			</div>
			<div className="w-full">
				<div className="flex items-center gap-2">
					<div className="text-lg font-bold">{(data.createdBy.charAt(0)).toUpperCase() + data.createdBy.slice(1)}</div>
					<div className="text-slate-300">@{data.createdBy}</div>
				</div>
				<div>{data.msg}</div>
			</div>
		</div>
	);
};
