## 🚀 Tech Stack

- **ReactJS**: Robust, flexible front-end library for a responsive, fast, interactive UI.

---

## 📂 Branch Naming Convention

Branches should be named according to their purpose and task:

```plaintext
<prefix>/<WDA-XX>-<task-name>
```

- **Prefix** options:
  - `feature/` – for new features
  - `fix/` – for bug fixes
  - `chore/` – for non-functional tasks
  - `refactor/` – for code restructuring

> Example: If your task is `[WDA-1][FE]Set up Github repository`, your branch name would be `feature/WDA-1-setup-github-repository`.

---

## 💾 Commit Message Convention

Follow a structured commit message format to maintain a clear history:

```plaintext
<prefix>(<WDA-XX>): <commit message>
```

- **Prefix** options:
  - `feat` – for new features
  - `fix` – for bug fixes
  - `chore` – for maintenance tasks
  - `refactor` – for code restructuring

> Example: If your branch is `[WDA-5][FE]create header and footer`, your commit message would be `feat(WDA-5): create header and footer`.

---

## 🔄 Development Workflow

The development process is organized for efficiency and consistency:

1. **Pull** the latest code from the main branch.
2. **Create a new branch** from the main branch.
3. **Code** your assigned task.
4. **Commit** changes and **stash** if needed.
5. **Switch to main branch** and pull any new updates.
6. **Switch back to your working branch** and merge any updates from `main` into it.
7. **Resolve conflicts** if any.
8. **Push** your branch to the remote repository.
9. **Create a pull request** and request reviews.
10. After approval, **squash and merge** the pull request.

```plaintext
┌───────────────────────────────┐
│        Pull from Main         │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│    Create New Branch from     │
│           Main                │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│             Code              │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│     Commit and Stash if       │
│           Needed              │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│   Switch to Main Branch and   │
│         Pull Updates          │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│   Switch to Working Branch    │
│    and Merge Updates from     │
│            Main               │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│   Resolve Conflicts if Any    │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│          Push to Remote       │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│      Create Pull Request      │
│   and Request Review from     │
│            Others             │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│  After Approval, Squash and   │
│            Merge              │
└───────────────────────────────┘
```

---