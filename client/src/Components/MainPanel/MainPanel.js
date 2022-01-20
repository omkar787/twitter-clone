import { useEffect, useState } from "react";
import MainPanelPostTweet from "./MainPanelPostTweet";
import MainPanelLatestTweet from "./MainPanelLatestTweet";
import axios from "axios";

const MainPanel = ({ change }) => {
    const [disabled, setDisabled] = useState(true);
    const [tweet, setTweet] = useState("");
    const [latestTweets, setLatestTweets] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const { data } = await axios.get("/tweet/get-all", {
                headers: {
                    Authorization: `bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(data.data);
            setLatestTweets(data.data)
        }
        fetchData()
    }, [change])

    const handleOnChange = (e) => {
        const txt = e.target.value;
        setTweet(txt);
        if (txt.trim().length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    const handleOnClick = async (e) => {
        const headers = {
            Authorization: `bearer ${localStorage.getItem("token")}`,
        };
        if (!disabled) {
            const { data } = await axios.post(
                `/tweet/add`,
                {
                    msg: tweet,
                },
                {
                    headers: headers,
                }
            );

            console.log(data);
            if (data.ok) {
                setTweet("");
                setDisabled(true);
                setLatestTweets([data.data, ...latestTweets])
                console.log(latestTweets);
                console.log("Tweet successfully sent");
            }
        }
    };
    return (
        <div className="h-screen w-[45%] overflow-y-auto no-scrollbar border-r border-gray-600 pt-5">
            <div className="">
                {/* upper main panel for tweeeting */}
                <MainPanelPostTweet
                    tweet={tweet}
                    handleOnChange={handleOnChange}
                    disabled={disabled}
                    handleOnClick={handleOnClick}
                />

                {/* lower panel for showing latest tweets */}
                {latestTweets.length > 0 && <MainPanelLatestTweet latestTweets={latestTweets} />}
                <div></div>
            </div>
        </div>
    );
};

export default MainPanel