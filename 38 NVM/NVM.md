# NVM (Node Version Manager) – Revision Notes

---

## 1️⃣ What is NVM?

**NVM (Node Version Manager)** is a tool used to:

* Install multiple versions of Node.js
* Switch between different Node versions
* Manage Node versions per project or system-wide

> On Windows, we use **NVM for Windows** (different from Linux/macOS NVM).

---

## 2️⃣ Why Do We Need NVM?

In real projects:

* Project A may require Node 18
* Project B may require Node 20
* Some legacy projects may require Node 14

Without NVM → You must uninstall and reinstall Node repeatedly ❌
With NVM → You can switch versions instantly ✅

---

## 3️⃣ Installing NVM (Windows)

### Step 1: Download

Download **`nvm-setup.exe`** from:
Official NVM for Windows GitHub repository.

### Step 2: Install

* Run `nvm-setup.exe`
* Follow installation steps
* Restart terminal after installation

---

## 4️⃣ Verify NVM Installation

```bash
nvm version
```

✔ If installed correctly, it shows the installed NVM version.

Example:

```
1.1.12
```

---

## 5️⃣ Installing Node Versions Using NVM

### Install Latest Node 18

```bash
nvm install 18
```

This installs the latest available 18.x version.

---

### Install Specific Version

```bash
nvm install 18.20.4
```

This installs exactly Node version **18.20.4**

---

## 6️⃣ Switching Node Version

After installing, activate a version:

```bash
nvm use 18
```

OR

```bash
nvm use 18.20.4
```

This makes the selected version active globally in your system.

---

## 7️⃣ Check Active Node Version

```bash
node -v
```

Example output:

```
v18.20.4
```

This confirms that Node 18 is currently active.

---

## 8️⃣ Important NVM Commands (Revision Table)

| Command                   | Purpose                      |
| ------------------------- | ---------------------------- |
| `nvm version`             | Check NVM version            |
| `nvm install <version>`   | Install Node version         |
| `nvm use <version>`       | Switch Node version          |
| `nvm list`                | Show installed Node versions |
| `nvm uninstall <version>` | Remove Node version          |
| `node -v`                 | Check active Node version    |
| `npm -v`                  | Check npm version            |

---

## 9️⃣ How NVM Works Internally (Concept)

* NVM installs Node versions in a separate directory
* It switches versions by updating:

  * PATH environment variable
  * Symbolic links (internally)
* Only one Node version is active at a time

---

## 🔟 Common Interview Questions

### Q1: What is NVM?

A tool to manage multiple Node.js versions.

### Q2: Difference between `nvm install 18` and `nvm install 18.20.4`?

* `18` → installs latest 18.x version
* `18.20.4` → installs exact version

### Q3: How to check installed Node versions?

```bash
nvm list
```

### Q4: Does NVM remove old Node versions automatically?

❌ No. You must uninstall manually:

```bash
nvm uninstall <version>
```

---

## 11️⃣ Common Issues & Fixes

### ❌ 'nvm is not recognized'

✔ Restart terminal
✔ Check installation path
✔ Ensure NVM added to system PATH

---

### ❌ Node version not switching

✔ Close all terminals
✔ Open new terminal
✔ Run:

```bash
nvm use <version>
```

---

## 12️⃣ Best Practices

✔ Use project-specific Node version
✔ Always check `node -v` after switching
✔ Use LTS versions for production
✔ Avoid installing Node directly when using NVM

---

# ✅ Quick Revision Summary

```
Install NVM → nvm-setup.exe
Check version → nvm version
Install Node → nvm install 18
Install specific → nvm install 18.20.4
Switch version → nvm use 18
Verify → node -v
```

---

If you want, I can also create:

* 🔹 Short one-page interview revision sheet
* 🔹 NVM + npm + npx combined revision notes
* 🔹 Markdown file version for your personal notes
