import { useState } from "react"
import { sendToN8N } from "@/services/chat-service"

export function useChat() {
  const [messages, setMessages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // STREAM: função que vai preenchendo a bolha da IA aos poucos
  async function streamText(id: string, fullText: string) {
    for (let i = 0; i < fullText.length; i++) {
      await new Promise(r => setTimeout(r, 10)) // controla velocidade da digitação

      setMessages(prev =>
        prev.map(m =>
          m.id === id
            ? { ...m, content: fullText.slice(0, i + 1) }
            : m
        )
      )
    }
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return

    // 1) Mensagem do usuário aparece na hora
    const userMessage = {
      id: crypto.randomUUID(),
      role: "user" as const,
      content: trimmed,
    }

    setMessages(prev => [...prev, userMessage])

    // 2) Cria IMEDIATAMENTE a bolha da IA vazia (mostra animação de pensamento)
    const assistantId = crypto.randomUUID()

    setMessages(prev => [
      ...prev,
      {
        id: assistantId,
        role: "assistant" as const,
        content: "", // <- isso ativa o thinkingIndicator do ChatBubble
      },
    ])

    setIsLoading(true)

    try {
      // 3) Chama o n8n
      const response = await sendToN8N(trimmed, "sessao-001")

      const reply = response.reply || ""

      // 4) Preenche a bolha da IA aos poucos (stream)
      await streamText(assistantId, reply)
    } catch (error) {
      console.error(error)

      // Se der erro, atualiza a bolha da IA com mensagem de erro
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? {
                ...m,
                content: "Não consegui responder agora. Tente novamente.",
              }
            : m
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  function addAssistantMessage(text: string) {
    const id = crypto.randomUUID()
    setMessages(prev => [
      ...prev,
      { id, role: "assistant", content: text }
    ])
  }

  function addUserMessage(text: string) {
    const id = crypto.randomUUID()
    setMessages(prev => [
      ...prev,
      { id, role: "user", content: text }
    ])
  }

  function updateLastAssistantMessage(text: string) {
    setMessages(prev => {
      const updated = [...prev]
      for (let i = updated.length - 1; i >= 0; i--) {
        if (updated[i].role === "assistant") {
          updated[i] = { ...updated[i], content: text }
          break
        }
      }
      return updated
    })
  }

  return {
    messages,
    isLoading,
    sendMessage,
    addAssistantMessage,
    addUserMessage,
    updateLastAssistantMessage,
  }
}