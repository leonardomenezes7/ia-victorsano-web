export function AIWaveform() {
  return (
    <div className="flex items-center justify-center h-6 gap-1">
      <div className="w-1 h-full bg-linear-to-b from-cyan-400 via-blue-500 to-purple-500 animate-wave" />
      <div className="w-1 h-full bg-linear-to-b from-cyan-400 via-blue-500 to-purple-500 animate-wave [animation-delay:0.15s]" />
      <div className="w-1 h-full bg-linear-to-b from-cyan-400 via-blue-500 to-purple-500 animate-wave [animation-delay:0.3s]" />
      <div className="w-1 h-full bg-linear-to-b from-cyan-400 via-blue-500 to-purple-500 animate-wave [animation-delay:0.45s]" />
      <div className="w-1 h-full bg-linear-to-b from-cyan-400 via-blue-500 to-purple-500 animate-wave [animation-delay:0.6s]" />
    </div>
  )
}