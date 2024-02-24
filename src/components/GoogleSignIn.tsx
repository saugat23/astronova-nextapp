import { signIn } from 'next-auth/react';
import Image from 'next/image';

interface GoogleSignInButtonProps {
//   children: React.ReactNode
  callbackUrl: string
}
const GoogleSignInButton = ({
//   children,
  callbackUrl
}: GoogleSignInButtonProps) => {

  const loginWithGoogle = async () => {
    await signIn("google", { callbackUrl })
  }

  return (
    <button type="button"
    className="w-[406px] h-[58px] text-black rounded-md text-xl font-medium shadow-md relative"
    onClick={loginWithGoogle}
  >
    <Image src="/google-icon.png" width={32} height={32} alt="Google Icon" className="absolute top-4 left-12" />
    Sign In with Google
    {/* {children} */}
    </button>
  )
}

export default GoogleSignInButton