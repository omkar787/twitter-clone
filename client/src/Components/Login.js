import React, { useEffect, useLayoutEffect, useState } from 'react'
import { BsTwitter } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import validate from '../methods/validate'
import axios from 'axios'

export default function Login() {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [isLogin, setIsLogin] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        validate()
            .then(response => {
                if (response) {
                    navigate("/", { replace: true })
                }
            })
    }, [])

    async function formSubmitHandle(e) {
        e.preventDefault()
        // await axios.post("/register", {
        //     username: "omkar",
        //     email: "omkar@mail.com",
        //     password: "12345"
        // })
        const { data } = await axios({
            method: "POST",
            url: "/login",
            data: {
                username: username,
                password: password
            }
        })
        console.log(data);
        if (data.ok) {
            localStorage.setItem("token", data.data)
        }
        setIsLogin(data.ok)
    }

    return (
        <div className="h-screen bg-[#242D34]">
            <Modal formSubmitHandle={formSubmitHandle}
                setUsername={setUsername}
                setPassword={setPassword} />

            {isLogin && <Navigate replace to="/" />}
        </div>
    )
}

function Modal({ formSubmitHandle, setUsername, setPassword }) {


    const inputBoxCss = "bg-black p-4 rounded-md outline-none w-full border-2 border-gray-700 placeholder:text-slate-500 focus:border-[#1A89D4]"
    return (
        <div className='h-full w-full md:flex md:justify-center md:items-center'>
            <div className='h-full w-full md:w-[600px] md:h-[592px] bg-black md:rounded-xl relative'>
                <div className='p-2 flex align-middle justify-between'>
                    <div className='pt-1'>
                        <IoMdClose fill='#fff' size={"1.5rem"} />
                    </div>
                    <div>
                        <BsTwitter fill='#fff' size={"2rem"} />
                    </div>
                    <div>
                        {/* Just a Stub */}
                    </div>
                </div>

                <form onSubmit={formSubmitHandle} className='px-6 pt-3 flex flex-col gap-5'>
                    <div className='text-2xl font-medium'>
                        Sign in to Twitter
                    </div>

                    <div className="py-1">
                        <input onChange={(e) => {
                            setUsername(e.target.value)
                        }} className={inputBoxCss} placeholder='Username' type="text" required autoFocus />
                    </div>


                    <div className="py-1">
                        <input onChange={(e) => {
                            setPassword(e.target.value)
                        }} className={inputBoxCss} placeholder='Password' type="password" required minLength={5} />
                    </div>
                    <div className='px-5 pt-5'>
                        <button type='submit' className='text-center bg-white text-black w-full text-xl p-2 font-medium rounded-full'>
                            Next
                        </button>
                    </div>
                </form>

                <div className='px-5 absolute bottom-2 text-gray-500'>
                    Don't have a account ? <span className='text-[#1A89D4]'><Link to="/signup">Sign up</Link></span>
                </div>
            </div>
        </div>
    )
}
