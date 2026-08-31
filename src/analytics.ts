/**
 * Google Analytics 4, ligado por variável de ambiente.
 *
 * Sem VITE_GA_ID definido no build, nada é carregado e nenhuma requisição
 * sai da página — o site continua exatamente tão hermético quanto era.
 * Para ligar: crie a propriedade no GA4 e ponha o ID de medição num .env
 *
 *   VITE_GA_ID=G-XXXXXXXXXX
 *
 * O texto da Sétima Forma sobre coleta de dados lê a mesma variável, então
 * a página nunca descreve um comportamento diferente do real.
 */
export const GA_ID: string = import.meta.env.VITE_GA_ID ?? ''
export const analyticsAtivo = GA_ID !== ''

export function iniciarAnalytics() {
  if (!analyticsAtivo || typeof window === 'undefined') return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  // A fila do gtag precisa existir antes do script terminar de carregar.
  const dataLayer: unknown[] = ((window as unknown as { dataLayer?: unknown[] }).dataLayer ??= [])
  window.gtag = function gtag(...args: unknown[]) {
    dataLayer.push(args)
  }
  window.gtag('js', new Date())
  /* send_page_view desligado de propósito: a navegação escreve direto em
     window.location.hash, que não passa pelos hooks de History do GA4 de
     forma confiável. Com o automático ligado, ou os pageviews somem, ou
     chegam duplicados. Mandamos todos explicitamente, pelo mesmo caminho. */
  window.gtag('config', GA_ID, { send_page_view: false })
}

/**
 * Um pageview por rota. `caminho` é sintético enquanto o roteamento for por
 * hash — o GA4 descarta o fragmento de page_location nos relatórios, então
 * sem isso as 10 formas apareceriam somadas numa linha só.
 */
export function registrarPageview(caminho: string, titulo: string) {
  window.gtag?.('event', 'page_view', {
    page_title: titulo,
    page_path: caminho,
    page_location: `${window.location.origin}${caminho}`,
  })
}
