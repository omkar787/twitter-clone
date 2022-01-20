import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { Profile } from "../../static/assets/images";
import jwtdecode from "jwt-decode";

const RightPanel = ({ setChange, change }) => {
	const [users, setUsers] = useState(null);
	const [curr, setCurr] = useState(() => {
		if (localStorage.getItem("token")) {
			const temp = jwtdecode(localStorage.getItem("token"));
			return temp;
		}
	});
	useEffect(() => {
		const func = async () => {
			const { data } = await axios.get("/get-user", {
				headers: {
					Authorization: `bearer ${localStorage.getItem("token")}`,
				},
			});
			// console.log(data);
			setUsers(data);
		};

		func();
	}, []);

	return (
		<div className="h-screen py-1 pt-4 pl-10 pr-16 w-4/12">
			{/* Search bar */}
			<div className="flex   items-center align-middle gap-2 p-3 bg-[#182634] w-full rounded-full">
				<FiSearch size={"20px"} />
				<input
					className="bg-transparent outline-none w-full"
					type="text"
					placeholder="Search Twitter"
				/>
			</div>

			{/* Who to follow */}
			{users && curr ? (
				users.length > 0 ? (
					<div className="bg-[#182634] rounded-lg mt-5 py-2 pb-5">
						<div className="text-2xl px-3 font-bold">Who to follow</div>
						<div className="overflow-y-auto h-52 no-scrollbar">
							{users.map((element, index) => {
								if (
									!curr.following.includes(element.username) &&
									!(curr.username === element.username)
								) {
									return (
										<Users
											key={index}
											username={element.username}
											curr={curr}
											setCurr={setCurr}
											setChange={setChange}
											change={change}
										/>
									);
								}
							})}
						</div>
					</div>
				) : null
			) : null}
		</div>
	);
};

const Users = ({ username, curr, setCurr, setChange, change }) => {
	const onClickHandle = (e) => {
		e.target.classList.remove(
			"bg-gray-50",
			"hover:bg-gray-200",
			"text-gray-900"
		);
		e.target.classList.add("text-white", "border", "border-gray-500");
		async function func() {
			const { data } = await axios.post(
				"/follow",
				{
					username: e.target.name,
				},
				{
					headers: {
						authorization: `bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			if (data.ok) {
				setChange(!change);
				setCurr(jwtdecode(data.token));
				localStorage.setItem("token", data.token);
				e.target.textContent = "Following";
			}
		}

		func();
	};
	return (
		<div className="px-3 hover:bg-[#202E3A] cursor-pointer transition ease-out duration-300 ">
			<div className="rounded-full flex  items-center justify-between py-3 px-3 ">
				<div className="flex gap-1">
					<div>
						<img src={Profile} width={"40px"} alt="Profile" />
					</div>
					<div>
						<div className="font-semibold">@{username}</div>
						<div className="text-transparent">{curr.emai}</div>
					</div>
				</div>
				<button
					onClick={onClickHandle}
					name={username}
					className="bg-gray-50 hover:bg-gray-200 font-semibold  text-gray-900  rounded-full py-2 px-5"
				>
					Follow
				</button>
			</div>
		</div>
	);
};

export default RightPanel;
