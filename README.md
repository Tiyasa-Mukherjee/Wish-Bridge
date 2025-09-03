# Wish Bridge: Empowering Wishes, Connecting Communities 🌟
![thumbnail](./public/assets/landingPage-c96aeb00-c4e2-4ed2-903b-a1dfd11e2b6f)

## 🗂️ Description

Wish Bridge is a web application designed to facilitate wish fulfillment and community support. The platform allows users to create and manage wishes, connect with others, and track progress. This project aims to provide a seamless and engaging experience for users, leveraging modern web technologies and a robust tech stack.

## ✨ Key Features

### 🌈 Core Features

* **Wish Management**: Create, edit, and manage wishes with ease
* **Community Support**: Connect with others, receive support, and fulfill wishes
* **Authentication**: Secure authentication system using Firebase
* **Profile Management**: Manage user profiles and track progress

### 📈 Additional Features

* **Wallet**: Buy tokens and view balance
* **Contact**: Send messages and view contact information
* **How It Works**: Detailed explanation of the wish creation process and platform functionality

## 🗂️ Folder Structure

```mermaid
graph TD;
  src-->wishbridge;
  wishbridge-->app;
  wishbridge-->components;
  wishbridge-->lib;
  app-->layout;
  app-->pages;
  components-->common;
  components-->layout;
```

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white&style=for-the-badge)
![Firebase](https://img.shields.io/badge/Firebase-ffca28?logo=firebase&logoColor=white&style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?logo=framer&logoColor=white&style=for-the-badge)

## ⚙️ Setup Instructions

To run the project locally, follow these steps:

* Git clone the repository: `https://github.com/Tiyasa-Mukherjee/Wish-Bridge.git`
* Install dependencies: `npm install` or `yarn install`
* Start the development server: `npm run dev` or `yarn dev`

## 📝 Configuration

The project uses various configuration files:

* `wishbridge/next.config.ts`: Configures Next.js settings
* `wishbridge/tailwind.config.js`: Configures Tailwind CSS settings
* `wishbridge/eslint.config.mjs`: Configures ESLint settings
* `wishbridge/tsconfig.json`: Configures TypeScript settings

## 🤖 GitHub Actions

The project uses GitHub Actions for continuous integration and deployment. The workflow is defined in `.github/workflows/main.yml`.

## 📁 Code Structure

The codebase is organized into the following directories:

* `wishbridge/app`: Contains page components and layout
* `wishbridge/components`: Contains reusable components
* `wishbridge/lib`: Contains utility functions and Firebase configuration
* `wishbridge/context`: Contains context API definitions

## 🔒 Security

The project uses Firebase Authentication for secure authentication and authorization. Sensitive data is stored securely using Firebase Firestore and Storage.



<br><br>
<div align="center">
<img src="https://avatars.githubusercontent.com/u/183731460?v=4" width="120" />
<h3>Tiyasa Mukherjee</h3>
<p>No information provided.</p>
</div>
<br>
<p align="right">
<img src="https://gitfull.vercel.app/appLogo.png" width="20"/>  <a href="https://gitfull.vercel.app">Made by GitFull</a>
</p>
    