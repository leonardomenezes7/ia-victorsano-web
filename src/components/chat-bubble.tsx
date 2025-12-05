import { AIWaveform } from "./ai-waveform"

type ChatBubbleProps = {
  role: "user" | "assistant"
  content: string
}

export function ChatBubble({ role, content }: ChatBubbleProps) {
  const isUser = role === "user"

  const baseClasses =
    "max-w-[80%] rounded-2xl px-3 py-2 text-sm md:text-base leading-relaxed"

  const userClasses =
    "bg-primary text-primary-foreground rounded-br-sm"

  const assistantClasses =
    "bg-slate-200 text-slate-900 rounded-bl-sm"

  const thinkingBubbleClasses =
    "min-h-[45px] min-w-[80px] flex items-center justify-center px-4 py-2"

  const isThinking = !isUser && content.trim() === ""

  const animationClasses = "opacity-0 animate-[bubbleIn_0.28s_ease-out_forwards]";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} ${animationClasses}`}>
      <div
        className={
          isThinking
            ? `${baseClasses} whitespace-pre-wrap ${assistantClasses} ${thinkingBubbleClasses} transition-all duration-300 ease-out ${animationClasses}`
            : `${baseClasses} whitespace-pre-wrap ${isUser ? userClasses : assistantClasses} transition-all duration-300 ease-out ${animationClasses}`
        }
      >
        {isThinking ? <AIWaveform /> : content}
      </div>
    </div>
  )
}