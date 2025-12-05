import { ChatBubble } from "@/components/chat-bubble"
import { useEffect, useRef } from "react"

type Message = {
  id: string | number
  role: "user" | "assistant"
  content: string
}

type MessageListProps = {
  messages: Message[]
  className?: string
}

export function MessageList({ messages }: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages])

  return(
    <div
      ref={containerRef}
      className="overflow-y-auto h-full px-2 py-3 md:px-3 md:py-4 space-y-3 md:space-y-4"
    >
      {messages.map((msg) => (
        <ChatBubble
          key={msg.id}
          role={msg.role}
          content={msg.content}
        />
      ))}
    </div>
  )
}