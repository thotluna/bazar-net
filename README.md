<p align="center">
  <a href="https://bazar-net.vercel.app/">
       <img src="https://github.com/thotluna/Reading-Bookshop/assets/9143737/fa5197a0-f117-422b-bc06-2e33fa147068" width="300px" height="92px" alt="Bazar Net logo"/>
  </a>

<h1 align="center">
  < 🛒 > Bazar-Net | You shop online
</h1>

<p align="center">
    <a href="https://github.com/thotluna/bazar-net/actions/workflows/publish_vercel.yml"><img src="https://github.com/thotluna/bazar-net/actions/workflows/publish_vercel.yml/badge.svg" alt="Build status"/></a>
</p>

<p align="center">
  This web shop offers a wide variety of products for women, men, and children. Customers can either purchase products directly or select them for later consultation and purchase. The shop offers a variety of payment options and shipping methods to make it easy for customers to get the products they need.  
  <br />
  <br />
  <a href="https://github.com/thotluna/bazar-net">Stars are welcome 😊</a>
</p>

## 📚 Application Summary

<p>In the second challenge of <a href='https://pruebastecnicas.com/'>"Pruebas técnicas de Programación"</a>, We are a bazaar with all kinds of products. We want to create our web app. For now, our market will be mobile. In this first version, users will be able to search for the product name, we will show them a list of products, and they will be able to click on each one to see the details.</p>

## 🔨 Install and Run

- `git clone https://github.com/thotluna/bazar-net.git`: Clone repository
- `pnpm install`: Install dependencies
- `pnpm dev`: Run app in mode development

## ✅ Testing

- `pnpm test`: Run unit test
- `npm test.e2e`: Execute e2e test with cypress with ui

## 🔦 Linting & Format

- `pnpm lint`: Run linter
- `pnpm fmt`: Fix format issues
- `pnpm fmt.check`: Check format issues

## 🚀 CI and Publishing

This project comes with a GitHub Actions workflow to automatically publish to any push to main.

For publishing to work you will need to add a secret VERCEL_ORG_ID and VERCEL_PROJECT_ID to your repository

Read the [full documentation on the vercel publish github action](https://vercel.com/guides/how-can-i-use-github-actions-with-vercel).

## 🌈 Tech Stack

- [TypeScript](https://www.typescriptlang.org)
- [vite](https://nextjs.org/)
- [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
- [React](https://react.dev/)
- [tailwindcss](https://tailwindcss.com/)
- [Cypress](https://www.cypress.io/) for e2e test
- [jest](https://jestjs.io/) with [Testing Library](https://testing-library.com/docs/) for component tests
- [GitHub Action Workflows](https://github.com/features/actions) set up to run tests and linting on push
- [.editorconfig](https://editorconfig.org) for sharing the IDE config
