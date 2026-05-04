"use client"

import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import AuthSide from "./AuthSide"

type Props = {
  mode: "login" | "signup"
  setMode: (mode: "login" | "signup") => void
}

export default function AuthContainer({ mode, setMode }: Props) {
  const isLogin = mode === "login"

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 p-4">
      
      <div className="relative w-full max-w-7xl h-[700px] bg-white rounded-3xl shadow-lg overflow-hidden">

      <div className="flex w-full h-full">
        
        {/* LEFT */}
        <div className="w-1/2 h-full relative overflow-hidden">
          
          <div className={`absolute inset-0 transition-all duration-700
            ${isLogin ? "translate-x-0" : "-translate-x-full"}`}>
            <AuthSide />
          </div>

          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700
            ${!isLogin ? "translate-x-0" : "translate-x-full"}`}>
            <SignupForm onSwitch={() => setMode("login")} />
          </div>

        </div>

        {/* RIGHT */}
        <div className="w-1/2 h-full relative overflow-hidden">
          
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700
            ${isLogin ? "translate-x-0" : "-translate-x-full"}`}>
            <LoginForm onSwitch={() => setMode("signup")} />
          </div>

          <div className={`absolute inset-0 transition-all duration-700
            ${!isLogin ? "translate-x-0" : "translate-x-full"}`}>
            <AuthSide />
          </div>

        </div>

      </div>

      </div>
    </div>
  )
}