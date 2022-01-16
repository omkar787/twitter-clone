import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import validate from "../methods/validate";

import LeftPanel from "./LeftPanel/LeftPanel";
import MainPanel from "./MainPanel/MainPanel";

export default function Home() {
	const [user, setUser] = useState(null);

	const navigate = useNavigate();

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
			<MainPanel />
			<RightPanel />
		</div>
	);
}

const RightPanel = () => {
	return <div className="h-screen pt-5">Right Panel</div>;
};
