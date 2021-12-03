# .rpy Parser

A simple [Ren.py](https://www.renpy.org/) file parser for NodeJS.

## 💾 Installation

```js
npm install --save renpy-parser

// or

yarn add renpy-parser
```

## 🌠 Quick Start

<details>
  <summary>
    <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png" alt="Typscript" width="20px" align="center" />&nbsp;
    Typescript
  </summary>

  ```ts
  import Parser from 'renpy-parser';

  const parsed = Parser.parseFromFile('<.rpy file>');

  // Your code
  ```

</details>

<details>
  <summary>
    <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" alt="Typscript" width="20px" align="center" />&nbsp;
    Javascript
  </summary>

  ```ts
  const { Reader } = require('renpy-parser');

  const parsed = Reader.parseFromFile('<.rpy file>');

  // Your code
  ```

</details>

## 📖 Documentation

[Click here](https://edqe14.github.io/renpy-parser/) to view all references

## 📋 License

This project is [MIT Licensed](https://github.com/Edqe14/renpy-parser/blob/main/LICENSE)
