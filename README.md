# Esclima Refrigeração — Site Institucional

Site institucional moderno para empresa de climatização e refrigeração, com foco em conversão via WhatsApp e painel administrativo.

## Branches

| Branch | Ambiente | Uso |
|--------|----------|-----|
| `staging` | Preview (Vercel) | Branch de trabalho |
| `main` | Production (Vercel) | Produção |

**Fluxo:** commit em `staging` → validar preview → aprovar → merge em `main`.

Veja [DEPLOY.md](./DEPLOY.md) para instruções completas de deploy.

## Funcionalidades

- Site responsivo (mobile-first) com seções: Hero, Serviços, Diferenciais, Avaliações, Galeria, Sobre e Contato
- Botão flutuante de WhatsApp sempre visível
- CTAs estratégicos em todas as seções
- Painel admin em `/admin` para gestão de conteúdo
- Pronto para deploy na Vercel

## Desenvolvimento local

```bash
npm install
cp .env.example .env.local
# Edite .env.local com ADMIN_PASSWORD
npm run dev
```

Acesse:
- Site: http://localhost:3000
- Admin: http://localhost:3000/admin

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `ADMIN_PASSWORD` | Senha do painel administrativo |
| `BLOB_READ_WRITE_TOKEN` | Token Vercel Blob (produção) |

## Deploy na Vercel

1. Conecte o repositório na Vercel
2. Configure `ADMIN_PASSWORD` nas variáveis de ambiente
3. (Opcional) Configure `BLOB_READ_WRITE_TOKEN` para persistência de conteúdo e uploads em produção
4. Deploy automático

Sem o token Blob, o conteúdo é salvo em `data/content.json` localmente e uploads vão para `public/assets/uploads/`.

## Painel Admin

Gerencie:
- **Informações gerais**: WhatsApp, endereço, horário
- **Serviços**: criar, editar, excluir
- **Projetos**: upload de imagens com categoria
- **Avaliações**: depoimentos de clientes
- **Diferenciais & Sobre**: textos institucionais
