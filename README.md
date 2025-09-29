# 🌎 @imjxsx/ln (v1.0.2)

## A simple and lightweight multilingual (i18n) system built with TypeScript

### 📥 Installation

---

#### - With NPM

```bash
npm install @imjxsx/ln
```

#### - With PNPM

```bash
pnpm add @imjxsx/ln
```

#### - With YARN

```bash
yarn add @imjxsx/ln
```

---

### 🚀 Example of Use

```javascript
// index.js
import Ln from "@imjxsx/ln";
import path from "node:path";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const ln = new Ln({
  default: "es",
  directory: path.join(dirname, "locales"),
});
// Load all locales
await ln.load();
// Example translations
console.log(ln.t("hello.world", "es")); // "Hola Mundo!"
console.log(ln.t("welcome.user", "es", {
  user: "ImJxsx",
  place: "GitHub",
})); // "Hola ImJxsx, bienvenido a GitHub."
```

```txt
# locales/es.lang
hello.world=Hola Mundo!
welcome.user=Hola %user%, bienvenido a %place%.
```

---

Developed with **❤** by **[imjxsx](https://github.com/imjxsx)**
