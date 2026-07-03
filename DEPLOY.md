# Deploy na Vercel — Esclima Refrigeração

## URLs

| Ambiente | URL |
|----------|-----|
| **Production** (`main`) | https://esclima-site.vercel.app ✅ |
| **Preview** (`staging`) | Deploy automático a cada push em `staging` |
| **GitHub** | https://github.com/RodoxCB/esclima-site |
| **Vercel Dashboard** | https://vercel.com/vdveiculos/esclima-site |

## Branches e ambientes

| Branch | Ambiente Vercel | Uso |
|--------|-----------------|-----|
| `staging` | **Preview** | Desenvolvimento e validação antes de ir para produção |
| `main` | **Production** | Produção — só após aprovação explícita |

## Fluxo de trabalho

1. Trabalhar sempre na branch `staging`
2. Commit e push em `staging` → deploy automático de **Preview** na Vercel
3. Validar o preview (URL gerada pela Vercel)
4. Só depois de confirmar que está ok, merge/push em `main`
5. Push em `main` → deploy automático de **Production**

**Nunca commitar direto em `main` sem validação prévia em `staging`.**

## Variáveis de ambiente (Vercel)

| Variável | Obrigatória | Ambientes |
|----------|-------------|-----------|
| `ADMIN_PASSWORD` | Sim | Production + Preview |
| `BLOB_READ_WRITE_TOKEN` | Recomendada | Production + Preview |

Sem `BLOB_READ_WRITE_TOKEN`, o painel admin não persiste alterações em produção (filesystem read-only na Vercel). Adicione o **Vercel Blob** ao projeto no dashboard para injetar o token automaticamente.

## Setup inicial (uma vez)

```bash
gh auth login
vercel login
vercel link
vercel git connect
```

No dashboard Vercel (**Project Settings → Git**):

- **Production Branch:** `main`
- Preview deployments: habilitado (inclui `staging`)

## Deploy manual (opcional)

```bash
vercel          # Preview
vercel --prod   # Production
```
