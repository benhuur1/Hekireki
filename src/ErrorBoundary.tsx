import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { erro: Error | null }

/**
 * Última linha de defesa contra a tela branca.
 *
 * As páginas são carregadas com lazy(). Depois de um deploy, uma aba
 * aberta ainda referencia os chunks antigos — que já não existem no
 * servidor. O import() rejeita, o lazy lança durante o render e, sem um
 * boundary, o React desmonta a árvore inteira: página em branco, sem
 * mensagem, até o usuário recarregar por conta própria.
 *
 * O caminho de escape limpa service worker e caches antes de recarregar,
 * porque num deploy manual o cache do SW é justamente o que prende o
 * usuário na versão quebrada.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { erro: null }

  static getDerivedStateFromError(erro: Error): State {
    return { erro }
  }

  componentDidCatch(erro: Error, info: ErrorInfo) {
    console.error('[hekireki] erro não tratado', erro, info.componentStack)
    window.gtag?.('event', 'exception', {
      description: `${erro.name}: ${erro.message}`,
      fatal: true,
    })
  }

  private recarregar = async () => {
    try {
      const regs = await navigator.serviceWorker?.getRegistrations()
      await Promise.all((regs ?? []).map((r) => r.unregister()))
      const chaves = await caches?.keys()
      await Promise.all((chaves ?? []).map((k) => caches.delete(k)))
    } catch {
      /* segue para o reload de qualquer forma */
    }
    window.location.reload()
  }

  render() {
    if (!this.state.erro) return this.props.children

    return (
      <div className="hk-erro" role="alert">
        <p className="hk-erro-kanji" aria-hidden="true">
          雷
        </p>
        <h1 className="hk-erro-titulo">O raio caiu no lugar errado.</h1>
        <p className="hk-erro-texto">
          Uma parte da página não carregou — normalmente porque uma versão nova
          foi publicada enquanto esta aba estava aberta.
        </p>
        <button type="button" className="hk-erro-botao" onClick={this.recarregar}>
          recarregar limpo
        </button>
      </div>
    )
  }
}
