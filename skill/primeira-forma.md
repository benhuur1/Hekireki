# 壱ノ型 — Primeira Forma


A melhor skill de todas em uma única coisa: entregar task com qualidade.

**Quando esta skill for invocada, responder cada pergunta em 1 frase curta. Total ≤ 6 linhas. Permite decisão imediata.**


Antes de qualquer linha de código numa task que adiciona, modifica ou conserta algo, responder em uma frase cada:


**1. O ticket descreve problema ou solução?**
Se descreve solução, qual problema ele assume? Se não consigo formular o problema em uma frase, a task não está pronta pra codar.

**Se o relato chegou parafraseado por intermediário** (dev passando ticket de atendente, gerente reescrevendo bug do cliente), pedir o verbatim original antes de seguir. Paráfrase infla complexidade e induz busca de bugs mais elaborados do que existem.


**2. Quem usa isso na ponta?**
Posso conversar com essa pessoa antes de codar? Se não, formulo internamente: o ticket cobre o problema ou só uma solução possível pro problema?


**3. O que já existe no projeto que cobre 80% do pedido?**
Arquivo existente que faz quase tudo é mais limpo que criar do zero. Pergunta de maior ROI nas validações em campo — investe tempo aqui antes de propor mudança.


**4. Se a versão minimal não bastar, em quanto tempo eu descubro?**
Horas → começa minimal. Semanas → o risco justifica investigar antes.

**Se a barreira é decisão externa** (PO, copy, secret, acesso pendente), não trava — abre rascunho/draft com TODOs explícitos e segue. O bloqueio passa a ser do dono da decisão, não seu.


**5. Reprodução antes do corte.**
Pra bug, sem reproduzir o estado quebrado qualquer fix é fé. Abra o app, dispare a chamada, leia o log. Se não sabe descrever o sintoma, não sabe onde está a impureza.


**6. Releia e corte 20%.**
Depois de escrever qualquer comunicação (PR description, status, mensagem), releia e remova gordura. Bullet vago vira específico. Frase de duas vira de uma. Bloco opcional sai se não cobre decisão.


**7. (opcional, antes de aceitar a próxima task) Estou em algum dos quatro anti-padrões?**
- Pulando de caminho a cada 3 meses
- Empilhando projetos paralelos sem fechar nenhum
- Confundindo aprender com produzir
- Comparando com gringo do Twitter


**Antes de aplicar:** em casos triviais (uma linha, sem ambiguidade), pode aplicar direto. Em qualquer outra coisa, apresentar plano e esperar confirmação. Antes do plano, conferir se existe ambiente pra ver o resultado funcionando — quando o trabalho vive num ecossistema, um movimento tem que subir tudo, com dados falsos, em camada separada dos repos da entrega. Se existe, usar; se não, construir antes da feature — depois disso, qualquer task começa com a fundação de pé.


---


Eu sou de carne, não de ferro. Se aplicar este filtro me exausta em vez de me poupar trabalho, parou de funcionar — recalibra. Continuidade vence intensidade.


## Manifesto completo — Hekireki (霹靂)

Manifesto completo: repo Hekireki (`~/Documents/GitHub/Hekireki`) — o site renderiza cada forma em `src/*.tsx`.
