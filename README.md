# EncontrePJ

Plataforma brasileira para conectar empresas a prestadores PJ especializados, com matching por competências e disponibilidade, contratos individuais, execução privada por tarefas, documentos fiscais e acompanhamento financeiro.

## Stack

- Laravel
- React + Inertia
- PostgreSQL
- Pest

## Desenvolvimento local

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
composer run dev
```

O aplicativo móvel será construído posteriormente com React Native e Expo, consumindo a mesma API Laravel.
