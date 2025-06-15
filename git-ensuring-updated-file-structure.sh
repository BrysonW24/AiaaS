To copy the file structure from main to your testing and development branches, 
and to avoid this issue in the future, follow these steps:

Immediate Fix: Copy Structure from Main to Other Branches
    # 1. Update your local main branch
    git checkout main
    git pull origin main

    # 2. Update testing branch with main's content
    git checkout testing
    git pull origin testing
    git merge main
    git push origin testing

    # 3. Update develop branch with testing's content
    git checkout develop
    git pull origin development
    git merge testing
    git push origin development

---

Preventing This Issue in the Future
    Always follow the branch hierarchy:
    # Create initial structure in develop first
    git checkout develop
    
    # Create files and folders
    git add .
    git commit -m "Add initial file structure"
    git push origin development

    # Then propagate to testing
    git checkout testing
    git merge develop
    git push origin testing

    # Finally to main (only when ready for production)
    git checkout main
    git merge testing
    git push origin main

---

Use branch protection rules (on GitHub/GitLab):
    Require pull requests for main branch
    Enforce the workflow: develop → testing → main

---

Set up automated synchronization:
    # Create a script to keep branches in sync
    # sync-branches.sh
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

---

Use tags for releases:
    # When releasing to main
    git checkout main
    git merge testing
    git tag -a v1.0.0 -m "Version 1.0.0"
    git push origin main --tags

---

Document the workflow for your team:
    Create a CONTRIBUTING.md file explaining the branch structure

    Include diagrams showing the proper flow of changes

    Remember: In GitFlow, changes should flow upward from feature branches → develop → testing → main, not directly to main. 
    If you pushed directly to main, you've broken the flow, which is why your other branches are out of sync.