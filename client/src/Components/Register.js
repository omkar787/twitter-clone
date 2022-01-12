import React, { useEffect, useState } from 'react'
import { BsTwitter } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import validate from '../methods/validate'

export default function Register() {
    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [registered, setRegistered] = useState(false)
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
            url: "/register",
            data: {
                username: username,
                email: email,
                password: password
            }
        })
        console.log(data);
        setRegistered(data.ok)
    }

    return (
        <div className="h-screen bg-[#242D34]">
            <SignUp formSubmitHandle={formSubmitHandle}
                setUsername={setUsername}
                setEmail={setEmail}
                setPassword={setPassword} />

            {registered && <Navigate replace to="/login" />}
        </div>
    )
}

function SignUp({ formSubmitHandle, setUsername, setEmail, setPassword }) {


    const inputBoxCss = "bg-black p-4 rounded-md outline-none w-full border-2 border-gray-700 placeholder:text-slate-500"
    return (
        <div className='h-full w-full md:flex md:justify-center md:items-center'>
            <div className='h-full w-full md:w-[600px] md:h-[592px] bg-black md:rounded-xl'>
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
                        Create your account
                    </div>

                    <div className="py-1">
                        <input onChange={(e) => {
                            setUsername(e.target.value)
                        }} className={inputBoxCss} placeholder='Username' type="text" required />
                    </div>

                    <div className="py-1">
                        <input onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                            className={inputBoxCss}
                            placeholder='Email' type="email" required />
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

            </div>
        </div>
    )
}
