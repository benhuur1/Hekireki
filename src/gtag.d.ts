declare global {
  interface Window {
    /**
     * Definido pelo snippet do Google Analytics em index.html.
     * Opcional de propósito: bloqueadores de anúncio impedem o script de
     * carregar, e nada no site pode depender da existência dele.
     */
    gtag?: (...args: unknown[]) => void
  }
}

export {}
