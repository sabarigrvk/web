# Starter kit for web apps

## Table of Contents

- [Folder Structure](#folder-structure)
  - [Atomic design](#atomic-design)
- [Available Scripts](#available-scripts)
  - [yarn start](#yarn-start)
  - [yarn test](#yarn-test)
  - [yarn build](#yarn-build)
  - [yarn storybook](#yarn-storybook)
  - [yarn deploy](#yarn-deploy)

## Folder Structure
```
├── .storybook  - storybook configuration
├── .vscode     - vscode editor settings
├── config      - configurations for webpack, babel and postcss
├── dist        - build folder
├── docs        - generated documentation
├── src         - project source files
│   ├── assets
│   │   ├── styles
│   │   ├── images
│   │   └── fonts
│   ├── components
│   │   ├── `To be decided... (Probably, atomic design pattern)`
│   └── app.js
├── public      - static files distributed by server
```