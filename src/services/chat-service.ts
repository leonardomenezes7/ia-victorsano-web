export async function sendToN8N(message: string, sessionId: string) {
  const res = await fetch("https://n8n.victorsano.com/webhook/d13f7bc4-e3d0-487a-b078-4b0249d842cd", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message,
      sessionId
    })
  })

  if (!res.ok) {
    throw new Error("Erro ao conectar ao servidor.")
  }

  return res.json()
}