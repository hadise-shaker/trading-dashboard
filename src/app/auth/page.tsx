"use client"

import { useState } from "react"
import AuthContainer from "@/components/auth/AuthContainer"

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login")

  return (
    <AuthContainer mode={mode} setMode={setMode} />
  )
}