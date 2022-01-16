import { Profile, TwitterTweets } from "../../static/assets/images";

const MainPanelPostTweet = ({
    tweet,
    handleOnChange,
    disabled,
    handleOnClick,
}) => {
    return (
        <div className="border-b border-gray-600 px-3 pb-2">
            <div className="flex items-center justify-between sticky backdrop-blur-sm">
                <div>
                    <div className="text-2xl font-semibold">Home</div>
                </div>
                <div>
                    <img src={TwitterTweets} className="h-7" />
                </div>
            </div>

            <div>
                <div className="pt-5 flex gap-5 items-center text-xl">
                    <div>
                        <img src={Profile} width={"40px"} />
                    </div>
                    <div className="w-full">
                        <textarea
                            style={{ resize: "none" }}
                            className="bg-transparent border-0 outline-none w-full break-words  overflow-y-auto "
                            placeholder="What's happening?"
                            spellCheck="false"
                            value={tweet}
                            onChange={handleOnChange}
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        className={`transition ease-out duration-300 text-center text-md px-8 py-2 rounded-3xl ${disabled ? "bg-[#185D8C]" : "bg-[#1D9BF0] hover:bg-[#1B8CD9]"
                            }`}
                        onClick={handleOnClick}
                    >
                        Tweet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MainPanelPostTweet