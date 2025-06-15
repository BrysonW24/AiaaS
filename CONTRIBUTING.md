# 🤝 Contributing to AiaaS

Welcome! This repo follows a structured GitFlow branching model to ensure safe, scalable development.

Please **read and follow this guide** to avoid breaking the main branch or causing conflicts across environments.

---

## 🌱 Branching Strategy

We use **3 main branches**:

| Branch      | Purpose                        |
|-------------|--------------------------------|
| `main`      | ✅ Production-ready code only   |
| `testing`   | 🧪 Pre-production staging zone  |
| `develop`   | 👷‍♂️ Ongoing feature development |

All contributions should flow from `develop` → `testing` → `main`.

---

## 🔁 Keeping Branches in Sync

### ✅ Initial Setup

```bash
# 1. Ensure your local main is up-to-date
git checkout main
git pull origin main

# 2. Update testing from main
git checkout testing
git pull origin testing
git merge main
git push origin testing

# 3. Update develop from testing
git checkout develop
git pull origin develop
git merge testing
git push origin develop
````

---

## 📦 Best Practice: Forward-Only GitFlow

When making changes:

```bash
# 1. Work on develop
git checkout develop
# Create files and folders, commit changes
git add .
git commit -m "🚧 Add initial file structure"
git push origin develop

# 2. Sync develop → testing
git checkout testing
git merge develop
git push origin testing

# 3. Sync testing → main when production-ready
git checkout main
git merge testing
git push origin main
```

---

## 🔐 Branch Protection Rules (Recommended)

* 🔒 **Protect `main`** — no direct commits
* ✅ Require PR reviews before merging to `main`
* 🚫 Disallow force pushes to `main` or `testing`

---

## 🛠️ Optional Sync Script

Create `sync-branches.sh` to streamline syncing:

```bash
#!/bin/bash

git checkout main
git pull origin main

git checkout testing
git pull origin testing
git merge main
git push origin testing

git checkout develop
git pull origin develop
git merge testing
git push origin develop
```

Run it regularly to keep branches aligned.

---

## 🏷️ Tagging Releases

When you push stable code to `main`, tag it!

```bash
git checkout main
git merge testing
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin main --tags
```

---

## 📊 Workflow Diagram

```text
[feature-xyz]
     ↓
  [develop]
     ↓
  [testing]
     ↓
   [main]
```

🚨 Never commit directly to `main`.

---

## 💬 Questions?

Create an issue or reach out to @codetocognition for help!

