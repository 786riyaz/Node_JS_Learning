When you import **two modules that export functions with the same name**, you must **avoid name collision** in your current file.

There are 3 clean and professional ways to handle this in Node.js:

---

# ✅ 1️⃣ Rename While Importing (Best Practice – Cleanest)

## 🔹 CommonJS (`require`)

### mathA.js

```js
exports.calculate = () => {
  console.log("From Module A");
};
```

### mathB.js

```js
exports.calculate = () => {
  console.log("From Module B");
};
```

### main.js

```js
const { calculate: calculateA } = require('./mathA');
const { calculate: calculateB } = require('./mathB');

calculateA();
calculateB();
```

👉 `calculate` is renamed to `calculateA` and `calculateB`.

---

## 🔹 ES Modules (`import`)

```js
import { calculate as calculateA } from './mathA.js';
import { calculate as calculateB } from './mathB.js';

calculateA();
calculateB();
```

✔ This is the most professional and readable solution.

---

# ✅ 2️⃣ Import Entire Module as Object (Namespacing)

This avoids collision automatically.

## CommonJS

```js
const mathA = require('./mathA');
const mathB = require('./mathB');

mathA.calculate();
mathB.calculate();
```

## ES Modules

```js
import * as mathA from './mathA.js';
import * as mathB from './mathB.js';

mathA.calculate();
mathB.calculate();
```

👉 This method is very scalable in large applications.

---

# ✅ 3️⃣ Default Exports (If They Export Default)

If both modules export default functions:

### mathA.js

```js
export default function calculate() {
  console.log("Module A");
}
```

### mathB.js

```js
export default function calculate() {
  console.log("Module B");
}
```

### main.js

```js
import calculateA from './mathA.js';
import calculateB from './mathB.js';

calculateA();
calculateB();
```

Here, the function name inside the module doesn’t matter — you control the name during import.

---

# ⚠️ What You CANNOT Do

```js
const { calculate } = require('./mathA');
const { calculate } = require('./mathB'); ❌
```

This will throw:

```
Identifier 'calculate' has already been declared
```

Because JavaScript does not allow duplicate variable names in the same scope.

---

# 🎯 Industry Recommendation

For clean architecture in Node.js projects:

✔ Prefer **namespacing (`import * as module`)** for large modules
✔ Prefer **aliasing (`as`)** for small utilities
