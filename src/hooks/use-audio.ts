function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

import { useRef, useState } from "react"

export function useAudio() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<BlobPart[]>([])

  const [isRecording, setIsRecording] = useState(false)

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    const recorder = new MediaRecorder(stream, {
      mimeType: "audio/webm"
    })

    mediaRecorderRef.current = recorder
    chunksRef.current = []

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data)
      }
    }

    recorder.start()
    setIsRecording(true)
  }

  async function stopRecording(): Promise<File> {
    return new Promise((resolve) => {
      const recorder = mediaRecorderRef.current
      if (!recorder) return

      const stream = recorder.stream
      stream.getTracks().forEach(track => track.stop())

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" })
        const file = new File([blob], "audio.webm", { type: "audio/webm" })
        resolve(file)
      }

      recorder.stop()
      setIsRecording(false)
    })
  }

  async function sendAudioToN8N(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    const base64 = arrayBufferToBase64(arrayBuffer);

    const res = await fetch("https://n8n.victorsano.com/webhook/b36af2a5-4f43-4636-8b5d-cfc3b73e8df2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        filename: file.name,
        mimetype: file.type,
        data: base64
      })
    })

    return res.json()
  }

  return {
    isRecording,
    startRecording,
    stopRecording,
    sendAudioToN8N
  }
}