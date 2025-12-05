import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react"
import tria from "../assets/tria.png"

type HeaderProps = {
  variant?: "chat" | "landing"
}

export function Header({ variant = "chat" }: HeaderProps) {
  return(
    <header className="border-b border-border bg-slate-50">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-3 md:h-16 md:px-0">
        {variant === "chat" && (
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Voltar para a página inicial</span>
            </Button>

            <div>
              <span className="text-xl font-semibold">IA Victor Sano</span>
            </div>
          </>
        )}
        {variant === "landing" && (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground">Powered by</span>
              <a
                href="https://www.instagram.com/tria.contato"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <img
                  src={tria}
                  alt="Logo da Tria"
                  className="h-36 w-40 -ml-8"
                />
              </a>
            </div>

            <div>
              <span className="text-xl font-semibold">IA Victor Sano</span>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}