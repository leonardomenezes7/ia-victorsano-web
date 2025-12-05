import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mic, Send } from "lucide-react"
import { useAudio } from "@/hooks/use-audio"

type ChatInputProps = {
  onSend: (message: string) => void
  onUserMessage: (message: string) => void
  onAssistantMessage: (message: string) => void
  onUpdateLastAssistantMessage: (message: string) => void
  disabled?: boolean
}

export function ChatInput({
  onSend,
  onAssistantMessage,
  onUserMessage,
  onUpdateLastAssistantMessage,
  disabled = false
}: ChatInputProps) {
  const [value, setValue] = useState("")

  const {
    isRecording,
    startRecording,
    stopRecording,
    sendAudioToN8N
  } = useAudio()

  // Enviar texto normal
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const msg = value.trim()
    if (!msg) return

    onSend(msg)
    setValue("")
  }

  // Clicar no mic / stop
  async function handleRecordClick() {
    if (!isRecording) {
      await startRecording()
      onUserMessage("🎤 Gravando áudio…")
    } else {
      const file = await stopRecording()

      // Criar bubble temporária da IA (pensando)
      onAssistantMessage("")

      const response = await sendAudioToN8N(file)
      console.log("RESPONSE DO N8N:", response)

      if (response?.reply) {
        // Substituir a bubble temporária pelo texto final
        onUpdateLastAssistantMessage(response.reply)
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 border-t pt-4 mt-4"
    >
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Digite sua mensagem…"
        className="min-h-[42px] max-h-32 flex-1 resize-none rounded-md text-sm py-2"
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const msg = value.trim();
            if (msg) {
              onSend(msg);
              setValue("");
            }
          }
        }}
      />

      {/* Botão de enviar texto */}
      <Button
        type="submit"
        disabled={disabled || !value.trim()}
        className="h-[42px] w-[42px] flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <Send className="w-5 h-5" />
      </Button>

      {/* Botão de áudio */}
      <Button
        type="button"
        disabled={disabled}
        onClick={handleRecordClick}
        className={`h-[42px] aspect-square flex items-center justify-center rounded-full border border-slate-300
        ${isRecording ? "bg-red-500/20 animate-pulse" : "bg-muted hover:bg-muted/80"}`}
      >
        {isRecording ? (
          // Ícone de STOP
          <div className="w-3 h-3 rounded-sm bg-red-600" />
        ) : (
          <Mic className="w-5 h-5 text-slate-700" />
        )}
      </Button>
    </form>
  )
}