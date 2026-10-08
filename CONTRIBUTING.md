# Contributing to Extly

Thank you for your interest in contributing to **Extly**! We welcome all contributions from bug reports and documentation enhancements to major feature additions.

Extly is built to be **100% free, open source, and accessible to everyone**.

---

## 🛠️ Local Development Setup

### 1. Prerequisites
- **Node.js** v18.17+ or v20+
- **npm**, **pnpm**, or **yarn**

### 2. Clone & Install
```bash
git clone https://github.com/SayyadAdeel-a/extly.git
cd extly
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

> [!NOTE]
> Extly is **Zero-Database**: No PostgreSQL, Supabase, or external API keys are required to run the full application locally!

---

## 🧪 Code Quality & Tests

Before submitting your Pull Request, ensure that your code passes TypeScript checks and builds cleanly:

```bash
# Type-check with TypeScript
npx tsc --noEmit

# Production build check
npm run build
```

---

## 🌿 Contribution Workflow

1. **Fork the repository** on GitHub.
2. **Create a topic branch** from `main`:
   ```bash
   git checkout -b feature/my-new-feature
   ```
3. **Commit your changes**:
   ```bash
   git commit -m "feat: add support for X"
   ```
4. **Push to your fork**:
   ```bash
   git push origin feature/my-new-feature
   ```
5. **Open a Pull Request** describing your changes and link any related issues.

---

## 📜 Code of Conduct

- Be respectful and constructive in all discussions.
- Follow Clean Code and strict TypeScript standards.
- Keep the user experience fast, frictionless, and 100% free.

Thank you for helping make Extly better for extension creators everywhere!
