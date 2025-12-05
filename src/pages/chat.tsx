import { Header } from "@/components/header";
import { MessageList } from "@/components/message-list"
import { ChatInput } from "@/components/chat-input"
import { useChat } from "@/hooks/use-chat"

export function Chat() {
  const { messages, sendMessage, addAssistantMessage, addUserMessage, updateLastAssistantMessage } = useChat()

  return(
    <div className="h-screen flex flex-col bg-slate-100">
      <Header variant="chat"/>

      <main className="flex-1 flex flex-col min-h-0 px-4 py-4 items-center">
        <div className="w-full max-w-3xl border rounded-xl p-6 bg-slate-50 flex flex-col flex-1 min-h-0">
          <div className="flex-1 min-h-0 overflow-y-auto">
            <MessageList
              messages={ messages }
            />
          </div>
          <ChatInput 
            onSend={sendMessage}
            onAssistantMessage={addAssistantMessage}
            onUserMessage={addUserMessage}
            onUpdateLastAssistantMessage={updateLastAssistantMessage}
          />
        </div>
      </main>
    </div>
  )
}