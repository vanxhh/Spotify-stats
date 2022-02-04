import React from "react";

export default function Login() {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <a href='/login'>
        <h1 className='underline underline-offset-4 md:underline-offset-8 text-2xl md:text-3xl lg:text-5xl font-bold tracking-widest hover:text-green-primary transition'>
            Login to spotify
        </h1>
      </a>
    </div>
  );
}
