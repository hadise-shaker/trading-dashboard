import Image from "next/image"
import { Shield, TrendingUp, Zap } from "lucide-react"

export default function AuthSide() {
  return (
    <div className="relative h-full w-full overflow-hidden">

      <Image
        src="/images/chart5.jpg"
        alt="chart"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 p-10 text-white flex flex-col justify-center h-full">
        <h2 className="text-3xl font-semibold mb-4 leading-snug">
          Trade Smarter,
          <br />
          Grow Faster
        </h2>

        <p className="text-sm text-blue-100 mb-8 max-w-xs">
          Access global markets, advanced tools, and real-time insights — all in one powerful platform.
        </p>

        <div className="space-y-5 text-sm">
          
          <Feature icon={<TrendingUp size={28} color="#2b7fff" />} title="Advanced Trading Tools" className="h-14 w-14 bg-blue-500/30" />
          <Feature icon={<Shield size={28} color="#7dd993" />} title="Secure & Reliable" className="h-14 w-14 bg-[#7dd993]/30" />
          <Feature icon={<Zap size={28} color="#b273f3" />} title="Fast Execution" className="h-14 w-14 bg-[#b273f3]/30" />

        </div>
      </div>
    </div>
  )
}

function Feature({ icon, title, className='bg-white/10' }: { icon: React.ReactNode; title: string; className?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 flex items-center justify-center rounded-full ${className}`}>
        {icon}
      </div>
      <span>{title}</span>
    </div>
  )
}