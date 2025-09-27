<h1 align="center">🌍 ln (v1.0.0)</h1>
<p align="center">A simple multi-language (i18n) system inspired by Minecraft, built with TypeScript.</p>
<p align="center">Load language files, manage placeholders, and translate your app with ease.</p>

<h2>📥 Install</h2>
<h3>- PNPM</h3>

```bash
pnpm add github:imjxsx/ln
```

<h3>- NPM</h3>


```bash
npm install github:imjxsx/ln
```

<h3>- YARN</h3>

```bash
yarn add github:imjxsx/ln
```

<h2>🚀 Usage</h2>

```ts
//index.js

import Ln from "ln";
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
console.log(ln.t("hello.world", "es")); 
// -> "Hola Mundo!"

console.log(ln.t("welcome.user", "es", {
  user: "ImJxsx",
  place: "GitHub",
})); 
// -> "Hola ImJxsx, bienvenido a GitHub."
```
```txt
#locales/es.lang

hello.world=Hola Mundo!
welcome.user=Hola %user%, bienvenido a %place%.
```

<h2>🔷 Features</h2>
<ul>
  <li>Lightweight & easy i18n system</li>
  <li>Customizable default locale</li>
  <li>Simple file format (<code>key=value</code>)</li>
  <li>Placeholder replacement (<code>%var%</code>)</li>
  <li>Fallback to default locale if key not found</li>
  <li>Logger support for debugging</li>
</ul>
