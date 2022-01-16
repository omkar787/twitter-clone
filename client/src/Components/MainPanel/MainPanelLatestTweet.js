import React from "react";
import { Profile } from "../../static/assets/images";

export default function MainPanelLatestTweet({ latestTweets }) {
	return (
		<div className="">
			{latestTweets.map((twt) => {
				return <IndividualTweets data={twt} />;
			})}
		</div>
	);
}

const IndividualTweets = ({ data }) => {
	return (
		<div className="pt-5 px-3 pb-1 flex gap-5 text-sm border-b border-gray-600">
			<div>
				<img src={Profile} width={"40px"} alt="Profile Image" />
			</div>
			<div className="w-full">
				<div className="text-lg font-bold">Omkar</div>
				<div>{data.msg}</div>
			</div>
		</div>
	);
};
