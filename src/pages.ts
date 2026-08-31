import type { ComponentType } from 'react'
import PrimeiraForma from './PrimeiraForma'
import type { Slug } from './routes'

/**
 * Registro síncrono de páginas.
 *
 * Por que não React.lazy: com o HTML prerenderizado, `lazy` suspende na
 * primeira renderização do cliente (o chunk ainda não chegou), o React
 * descarta o HTML vindo do servidor naquela subárvore e mostra o fallback.
 * O resultado é um flash e, pior, a perda exata do conteúdo que o prerender
 * pagou para gerar.
 *
 * Aqui o componente da rota de entrada é carregado ANTES de hidratar, então
 * a primeira renderização bate com o HTML estático. Navegação client-side
 * para outra rota continua assíncrona, com o mesmo fallback de antes.
 *
 * O code-splitting é preservado: os import() abaixo seguem gerando um chunk
 * por página.
 */
const carregadores: Record<Exclude<Slug, 'primeira'>, () => Promise<{ default: ComponentType }>> = {
  lentes: () => import('./AsQuatroLentes'),
  corte: () => import('./OCorte'),
  espelho: () => import('./OEspelho'),
  lexico: () => import('./OLexico'),
  portao: () => import('./OPortao'),
  tanren: () => import('./TanRen'),
  setimo: () => import('./SetimoEstilo'),
  kakurai: () => import('./KakuRaiNoKami'),
  cronica: () => import('./ACronica'),
}

// PrimeiraForma entra estático: é a rota de entrada e o fallback de slug
// desconhecido, então nunca vale a pena adiar.
const carregadas = new Map<Slug, ComponentType>([['primeira', PrimeiraForma]])

/** Componente já disponível, ou undefined se o chunk ainda não chegou. */
export function paginaCarregada(slug: Slug): ComponentType | undefined {
  return carregadas.get(slug)
}

export async function carregarPagina(slug: Slug): Promise<ComponentType> {
  const pronta = carregadas.get(slug)
  if (pronta) return pronta
  const mod = await carregadores[slug as Exclude<Slug, 'primeira'>]()
  carregadas.set(slug, mod.default)
  return mod.default
}

/** Usado só pelo prerender: renderToString é síncrono e não espera import(). */
export async function carregarTodas(): Promise<void> {
  await Promise.all((Object.keys(carregadores) as Exclude<Slug, 'primeira'>[]).map(carregarPagina))
}
