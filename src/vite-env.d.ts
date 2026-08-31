/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** ID de medição do GA4 (G-XXXXXXXXXX). Vazio = analytics desligado. */
  readonly VITE_GA_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
