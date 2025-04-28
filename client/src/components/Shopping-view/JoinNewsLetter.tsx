import { AiOutlineArrowRight } from "react-icons/ai";
import { Input } from "../ui/input";
import React, { useState } from "react";

const JoinNewsLetter = () => {
    const [email, setEmail] = useState('');
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!email) return;
        alert(`Sorry our News Letter is not yet ready, please ${email} subscribe to our social media to get the latest news and updates. Thank you for your support.`);
        setEmail('');
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit} className="relative flex items-center">
            <Input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={handleEmailChange}
                className="p-6 border-solid border rounded-full bg-white lg:w-[20rem] xl:w-[90%] border-pink-300 shadow-lg text-sm lg:text-[1.3rem] outline-pink-400 selection:shadow-pink-400 text-gray-700"
            />
            <button
                className="p-4 bg-pink-300 flex items-center absolute justify-center z-[1] right-[.5%] lg:right-[10%] rounded-full hover:bg-pink-500 duration-300 hover:shadow-lg"
                type="submit"
            >
                <AiOutlineArrowRight />
            </button>
        </form>
    );
};

export default JoinNewsLetter;