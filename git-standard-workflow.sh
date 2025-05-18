Standard Git Workflow

Initial Setup (One-time)
# 1. Create or clone repository
    git clone <repository-url>
# OR
    git init
    git remote add origin <repository-url>

# 2. Set up main branches
    git checkout -b main
    git push -u origin main

    git checkout -b develop main
    git push -u origin develop

# 3 Checking status
    git status
    dir
    git pull


---

Feature Development Workflow
    # 1. Create feature branch from develop
        git checkout develop
        git pull origin develop
        git checkout -b feature/my-feature

    # 2. Create files/folders
        mkdir -p new-folder/subfolder
        touch new-folder/subfolder/new-file.txt

    # 3. Edit files and make changes
    # (Use your editor to modify files)

    # 4. Check status and stage changes
        git status
        git add new-folder/

    # 5. Commit changes
        git commit -m "Add new feature files"

    # 6. Push feature branch to remote
        git push -u origin feature/my-feature

    # 7. Create pull request (via GitHub/GitLab/etc.)
    # (This is done through the web interface)

    # 8. After review, merge to develop
        git checkout develop
        git pull origin develop
        git merge feature/my-feature
        git push origin develop

    # 9. Delete feature branch after merge
        git branch -d feature/my-feature
        git push origin --delete feature/my-feature

---

Testing Workflow
    # 1. Create testing branch from develop
        git checkout develop
        git pull origin develop
        git checkout -b testing/my-feature

    # 2. Run tests and make fixes
    # (Make necessary changes to fix issues)

    # 3. Commit test fixes
        git add .
        git commit -m "Fix test issues"

    # 4. Push testing branch
        git push -u origin testing/my-feature

    # 5. After testing is complete, merge to develop
        git checkout develop
        git merge testing/my-feature
        git push origin develop

---

Release Workflow
    # 1. Create release branch from develop
        git checkout develop
        git pull origin develop
        git checkout -b release/v1.0.0


    # 2. Make final adjustments and version bumps
    # (Update version numbers, etc.)

    # 3. Commit release changes
        git add .
        git commit -m "Prepare release v1.0.0"

    # 4. Merge to main
        git checkout main
        git pull origin main
        git merge release/v1.0.0
        git tag -a v1.0.0 -m "Version 1.0.0"
        git push origin main
        git push origin --tags

    # 5. Merge back to develop
        git checkout develop
        git merge release/v1.0.0
        git push origin develop

    # 6. Delete release branch
        git branch -d release/v1.0.0
        git push origin --delete release/v1.0.0

---

Hotfix Workflow
    # 1. Create hotfix branch from main
        git checkout main
        git pull origin main
        git checkout -b hotfix/critical-fix

    # 2. Make emergency fixes
    # (Fix the critical issue)

    # 3. Commit hotfix
        git add .
        git commit -m "Fix critical issue"

    # 4. Merge to main
        git checkout main
        git merge hotfix/critical-fix
        git tag -a v1.0.1 -m "Version 1.0.1"
        git push origin main
        git push origin --tags

    # 5. Merge to develop
        git checkout develop
        git merge hotfix/critical-fix
        git push origin develop

    # 6. Delete hotfix branch
        git branch -d hotfix/critical-fix
        git push origin --delete hotfix/critical-fix

This workflow follows the GitFlow branching model, which is widely used for managing development, testing, and production code.