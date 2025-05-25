import React from "react";

export default function Hero() {
return (
    <div
    className="relative w-full h-screen bg-cover bg-center"
    style={{
        backgroundImage: `url('https://i.pinimg.com/736x/d1/74/f9/d174f950f83f90e22cb7634a8d725417.jpg')`,
    }}
    >
      {/* Overlay */}
    <div className="absolute inset-0  bg-opacity-40"></div>

      {/* Content */}
    <div className="relative z-10 flex flex-col items-center justify-center text-white text-center h-full px-8">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
        Let Us Take U Where <br />  U Want To Go <br /> 
        </h1>
    </div>
    </div>
);
}
