# GraphQL & Apollo Federation

This is a small app which the main goal is to run the apollo federation architecture, where we have the supergraph (gateway) and then subgrahps.

## Previews

|                                                    |                                                     |
| -------------------------------------------------- | --------------------------------------------------- |
| ![User Service](/readme_assets/user_service.png)   | ![User Service](/readme_assets/product_service.png) |
| ![User Service](/readme_assets/review_service.png) | ![User Service](/readme_assets/graphql_gateway.png) |

# Prerequisites

- Node.js 16+
- npm (with pnpm)
- Docker

### [IN_PROGRESS] Docker in progress, so for now we have to have some softwares installeds.

## Installation

1. Run a MariaDB container on Docker and then create some databases where you can find on `./scripts/database.sql`

2. Install the dependencies for each project

```bash
  cd ./product-service
  pnpm install
  cd ..

  cd ./user-service
  pnpm install
  cd ..

  cd ./review-service
  pnpm install
  cd ..

  cd ./graphl-gateway
  pnpm install
```

3. Run migrations

```bash
  cd ./product-service
  npx prisma db push
  cd ..

  cd ./user-service
  npx prisma db push
  cd ..

  cd ./review-service
  npx prisma db push
  cd ..
```

4. Create env with database connection string for each service

```bash
  cd ./product-service
  cp .env.example .env
  cd ..

  cd ./user-service
  cp .env.example .env
  cd ..

  cd ./review-service
  cp .env.example .env
  cd ..
```

## Development

1. Run the servers

```bash
  cd ./product-service
  pnpm run dev
  cd ..

  cd ./user-service
  pnpm run dev
  cd ..

  cd ./review-service
  pnpm run dev
  cd ..

  cd ./graphql-gateway
  pnpm run dev
```

1. Open the GraphQL gateway on http://localhost:4000
