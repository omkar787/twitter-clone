import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import validate from "../methods/validate";

import LeftPanel from "./LeftPanel/LeftPanel";
import MainPanel from "./MainPanel/MainPanel";
import RightPanel from "./RightPanel/RightPanel";

export default function Home() {
	const [user, setUser] = useState(null);
	const [change, setChange] = useState(false);
	const navigate = useNavigate();
	document.title = "Home / Twitter"
	useEffect(() => {
		validate().then((response) => {
			console.log(response);
			if (response) {
				setUser(response);
			} else {
				navigate("/login", { replace: true });
			}
		});
	}, []);
	return (
		<div className="bg-[#14212B] h-screen overscroll-y-auto flex">
			<LeftPanel user={user} />
			<MainPanel change={change} />
			<RightPanel setChange={setChange} change={change} />
		</div>
	);
}


