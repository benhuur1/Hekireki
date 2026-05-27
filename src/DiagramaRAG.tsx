import { useMemo } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
  Position,
  type Edge,
  type Node,
  type NodeProps,
} from '@xyflow/react'
import { Handle } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import './DiagramaRAG.css'

type StepData = {
  num: string
  icon: string
  title: string
  detail: string
  tech?: string
  variant: 'index' | 'query' | 'shared'
}

function StepNode({ data }: NodeProps<Node<StepData>>) {
  return (
    <div className={`step-node step-${data.variant}`}>
      <Handle type="target" position={Position.Left} className="step-handle" />
      <div className="step-head">
        <span className="step-num">{data.num}</span>
        <span className="step-icon" aria-hidden>
          {data.icon}
        </span>
      </div>
      <h3>{data.title}</h3>
      <p>{data.detail}</p>
      {data.tech && <code className="step-tech">{data.tech}</code>}
      <Handle type="source" position={Position.Right} className="step-handle" />
    </div>
  )
}

const nodeTypes = { step: StepNode }

const NODE_W = 280
const X_GAP = 100
const ROW_INDEX_Y = 0
const ROW_QUERY_Y = 460
const COL = (i: number) => i * (NODE_W + X_GAP)

const nodes: Node<StepData>[] = [
  // ----- Fase 1: Indexação -----
  {
    id: 'i1',
    type: 'step',
    position: { x: COL(0), y: ROW_INDEX_Y },
    data: {
      num: '1',
      icon: '🌐',
      title: 'Web Scraping',
      detail: 'Lista de URLs do nissan.com.br é baixada via HTTP.',
      tech: 'requests + BeautifulSoup',
      variant: 'index',
    },
  },
  {
    id: 'i2',
    type: 'step',
    position: { x: COL(1), y: ROW_INDEX_Y },
    data: {
      num: '2',
      icon: '📄',
      title: 'Limpeza do HTML',
      detail: 'Menus, rodapés e scripts são removidos. Sobra só texto útil.',
      tech: 'data/pages.json',
      variant: 'index',
    },
  },
  {
    id: 'i3',
    type: 'step',
    position: { x: COL(2), y: ROW_INDEX_Y },
    data: {
      num: '3',
      icon: '✂️',
      title: 'Chunking',
      detail: 'Cada página é quebrada em pedaços de ~500 caracteres.',
      tech: '~500 chars / chunk',
      variant: 'index',
    },
  },
  {
    id: 'i4',
    type: 'step',
    position: { x: COL(3), y: ROW_INDEX_Y },
    data: {
      num: '4',
      icon: '🧮',
      title: 'Embeddings',
      detail: 'Cada chunk vira um vetor numérico que representa seu significado.',
      tech: 'MiniLM-L12-v2',
      variant: 'index',
    },
  },
  // ----- Banco vetorial (compartilhado entre as fases) -----
  {
    id: 'db',
    type: 'step',
    position: { x: COL(4), y: (ROW_INDEX_Y + ROW_QUERY_Y) / 2 },
    data: {
      num: '★',
      icon: '🗄️',
      title: 'Banco Vetorial',
      detail: 'Vetores + texto + metadados gravados em disco. Sobrevive a restart.',
      tech: 'ChromaDB · data/chroma/',
      variant: 'shared',
    },
  },
  // ----- Fase 2: Consulta -----
  {
    id: 'q1',
    type: 'step',
    position: { x: COL(0), y: ROW_QUERY_Y },
    data: {
      num: '1',
      icon: '💬',
      title: 'Pergunta do Cliente',
      detail: 'Usuário digita: "Qual o consumo do Kicks?"',
      tech: 'Streamlit chat',
      variant: 'query',
    },
  },
  {
    id: 'q2',
    type: 'step',
    position: { x: COL(1), y: ROW_QUERY_Y },
    data: {
      num: '2',
      icon: '🧮',
      title: 'Embedding da Pergunta',
      detail: 'A pergunta vira vetor pelo MESMO modelo da indexação.',
      tech: 'mesmo encoder',
      variant: 'query',
    },
  },
  {
    id: 'q3',
    type: 'step',
    position: { x: COL(2), y: ROW_QUERY_Y },
    data: {
      num: '3',
      icon: '🔎',
      title: 'Busca Vetorial',
      detail: 'ChromaDB devolve os 5 chunks mais semelhantes (cosseno).',
      tech: 'top-K = 5',
      variant: 'query',
    },
  },
  {
    id: 'q4',
    type: 'step',
    position: { x: COL(3), y: ROW_QUERY_Y },
    data: {
      num: '4',
      icon: '🧩',
      title: 'Montagem do Prompt',
      detail: 'System prompt + trechos + pergunta → uma mensagem.',
      tech: 'context window',
      variant: 'query',
    },
  },
  {
    id: 'q5',
    type: 'step',
    position: { x: COL(5), y: ROW_QUERY_Y },
    data: {
      num: '5',
      icon: '🤖',
      title: 'LLM (Claude)',
      detail: 'Gera a resposta usando APENAS os trechos. Se não souber, admite.',
      tech: 'claude -p (CLI)',
      variant: 'query',
    },
  },
  {
    id: 'q6',
    type: 'step',
    position: { x: COL(6), y: ROW_QUERY_Y },
    data: {
      num: '6',
      icon: '✅',
      title: 'Resposta + Histórico',
      detail: 'Volta pro chat citando fontes. Tudo salvo no histórico.',
      tech: 'SQLite · data/chat.db',
      variant: 'query',
    },
  },
]

const C_INDEX = '#7a91c4'
const C_QUERY = '#84b094'

const indexEdge = (id: string, source: string, target: string): Edge => ({
  id,
  source,
  target,
  animated: true,
  markerEnd: { type: MarkerType.ArrowClosed, color: C_INDEX },
  style: { stroke: C_INDEX, strokeWidth: 1.5 },
})

const queryEdge = (id: string, source: string, target: string): Edge => ({
  id,
  source,
  target,
  animated: true,
  markerEnd: { type: MarkerType.ArrowClosed, color: C_QUERY },
  style: { stroke: C_QUERY, strokeWidth: 1.5 },
})

const edges: Edge[] = [
  // Indexação
  indexEdge('e-i1-i2', 'i1', 'i2'),
  indexEdge('e-i2-i3', 'i2', 'i3'),
  indexEdge('e-i3-i4', 'i3', 'i4'),
  indexEdge('e-i4-db', 'i4', 'db'),
  // Consulta
  queryEdge('e-q1-q2', 'q1', 'q2'),
  queryEdge('e-q2-q3', 'q2', 'q3'),
  queryEdge('e-q3-q4', 'q3', 'q4'),
  queryEdge('e-q4-q5', 'q4', 'q5'),
  queryEdge('e-q5-q6', 'q5', 'q6'),
  // q3 consulta o banco vetorial (ida e volta)
  {
    id: 'e-q3-db',
    source: 'q3',
    target: 'db',
    animated: true,
    label: 'consulta',
    markerEnd: { type: MarkerType.ArrowClosed, color: C_QUERY },
    style: { stroke: C_QUERY, strokeWidth: 1.5, strokeDasharray: '6 4' },
  },
  {
    id: 'e-db-q3',
    source: 'db',
    target: 'q3',
    animated: true,
    label: 'top-5 chunks',
    markerEnd: { type: MarkerType.ArrowClosed, color: C_QUERY },
    style: { stroke: C_QUERY, strokeWidth: 1.5, strokeDasharray: '6 4' },
  },
]

function DiagramaRAG() {
  const initialNodes = useMemo(() => nodes, [])
  const initialEdges = useMemo(() => edges, [])

  return (
    <main className="page">
      <header className="hero">
        <span className="badge">RAG · Retrieval-Augmented Generation</span>
        <h1>Como o chatbot da Nissan responde com precisão</h1>
        <p className="lead">
          O bot não inventa: ele <strong>busca</strong> os trechos relevantes do site primeiro
          e só depois pede ao LLM pra escrever a resposta.
        </p>
        <div className="legend">
          <span className="legend-item">
            <span className="dot dot-index" /> Indexação (offline · roda 1×)
          </span>
          <span className="legend-item">
            <span className="dot dot-query" /> Consulta (online · cada pergunta)
          </span>
          <span className="legend-item">
            <span className="dot dot-shared" /> Banco vetorial (compartilhado)
          </span>
        </div>
      </header>

      <section className="canvas-wrap">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable
          nodesConnectable={false}
          elementsSelectable
        >
          <Background gap={28} size={1} color="rgba(236, 228, 210, 0.16)" />
          <Controls showInteractive={false} />
        </ReactFlow>
      </section>

      <section className="why">
        <h2>Por que RAG é mais exato que um LLM puro?</h2>
        <ol className="why-list">
          <li>
            <h4>Fonte controlada</h4>
            <p>O modelo só vê o conteúdo do site da Nissan, não a internet inteira.</p>
          </li>
          <li>
            <h4>Atualizável</h4>
            <p>
              Basta rodar o scraper de novo e reindexar pra refletir mudanças de catálogo,
              preço, garantia.
            </p>
          </li>
          <li>
            <h4>Citável</h4>
            <p>Cada resposta vem com os títulos das páginas usadas.</p>
          </li>
          <li>
            <h4>Resistente a alucinação</h4>
            <p>
              System prompt obriga o modelo a dizer "não encontrei" quando o trecho não cobre
              a pergunta.
            </p>
          </li>
        </ol>
      </section>

      <section className="why">
        <h2>A estocada única</h2>
        <p className="why-intro">
          Cada ferramenta da pilha foi escolhida pelo critério da Primeira Forma:
          resolve o problema que a gente tem, ou inventa cinco problemas novos pra
          "crescer junto"? Ao lado de cada escolha, o monstro que poderia ter sido.
        </p>
        <ol className="why-list">
          <li>
            <h4>Python · requests · BeautifulSoup</h4>
            <p>
              <em>Em vez de:</em> Scrapy + Playwright + Selenium + ScrapingBee + Apify
              cluster. O HTML da Nissan é estático — uma chamada HTTP basta.
            </p>
          </li>
          <li>
            <h4>ChromaDB em disco local</h4>
            <p>
              <em>Em vez de:</em> Pinecone + Qdrant + Weaviate + cluster Kafka.
              ~10MB de vetores. Sobreviver a restart é o único requisito.
            </p>
          </li>
          <li>
            <h4>sentence-transformers MiniLM-L12</h4>
            <p>
              <em>Em vez de:</em> OpenAI embeddings + HuggingFace endpoint + LangChain
              wrapper + cache Redis. Roda local, gratuito, suficiente pro português técnico.
            </p>
          </li>
          <li>
            <h4>Claude CLI direto</h4>
            <p>
              <em>Em vez de:</em> LangChain + LangGraph + LangSmith + Semantic Kernel +
              Haystack. <code>claude -p</code> e o prompt — não precisa de framework pra
              mandar texto.
            </p>
          </li>
          <li>
            <h4>SQLite pra histórico de chat</h4>
            <p>
              <em>Em vez de:</em> Postgres + Redis + RabbitMQ + ElasticSearch + DataDog.
              É um arquivo. Sobrevive a tudo. Discord usa em escala.
            </p>
          </li>
          <li>
            <h4>Streamlit como UI do chatbot</h4>
            <p>
              <em>Em vez de:</em> Next.js + tRPC + ShadCN + Vercel + Auth0 + Sentry +
              PostHog. Demonstração interna. <code>streamlit run app.py</code> e tá no ar.
            </p>
          </li>
        </ol>
      </section>

      <footer className="footer">
        <svg className="signature-mark" viewBox="0 0 32 32" aria-hidden>
          <line x1="6" y1="26" x2="24" y2="8" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="24" cy="8" r="1.5" fill="currentColor" />
        </svg>
        <div>
          <strong>Stack</strong>
          <span>Python · ChromaDB · sentence-transformers · Claude Code CLI · Streamlit · SQLite</span>
        </div>
        <div>
          <strong>Pipeline</strong>
          <span>1_scraper.py → 2_index.py → app.py</span>
        </div>
      </footer>
    </main>
  )
}

export default DiagramaRAG
