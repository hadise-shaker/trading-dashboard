export default function Header() {
    return (
      <div className="flex items-center justify-between mb-6">
        
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">
            Dashboard Overview
          </h1>
          <p className="text-sm text-zinc-500">
            Welcome back 👋
          </p>
        </div>
  
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-zinc-300" />
        </div>
      </div>
    )
  }