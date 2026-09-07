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

## Contas locais de demonstração

Execute `php artisan db:seed`. Todas as contas usam a senha `EncontrePJ@123`.

| Perfil              | E-mail                       |
| ------------------- | ---------------------------- |
| Prestador           | `prestador@encontrepj.test`  |
| Empresa contratante | `fornecedor@encontrepj.test` |
| Recrutador          | `recrutador@encontrepj.test` |
| Administrador       | `admin@encontrepj.test`      |
