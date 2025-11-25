**package.json**

Main config file containing:
* project name, version
* dependencies
* devDependencies
* scripts
* entry point

Example:

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}
```
=======================================================================

**package-lock.json**

Created automatically (npm v5+)

Contains:

* **exact versions** of installed packages
* nested dependency tree
* ensures same version for all developers

### Difference:

| package.json          | package-lock.json  |
| --------------------- | ------------------ |
| Manually written      | Auto-generated     |
| Version ranges        | Exact versions     |
| Declares dependencies | Locks dependencies |