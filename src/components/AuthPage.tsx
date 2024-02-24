import React, { ReactNode } from "react";
import Image from "next/image";

interface AuthProps {
  children: ReactNode;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  return (
    <>
      <div className="w-full h-full flex">
        <div className="w-[60%]">
          <div className="relative h-screen">
            <Image
              src="/hand.jpeg"
              alt="Background Image"
              layout="fill"
              objectFit="cover"
              className="h-screen"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Image
                src="/astronova-logo.png"
                alt="Astronova Logo"
                width={400}
                height={400}
              />
            </div>
          </div>
        </div>
        <div className="w-[40%]">{children}</div>
      </div>
    </>
  );
};

export default Auth;
