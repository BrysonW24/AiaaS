Git Workspace Management Commands

Branch Management
# List branches
    git branch                      # List local branches
    git branch -a                   # List all branches (local and remote)
    git branch -v                   # List branches with last commit
    git branch -vv                  # List branches with tracking info
    git branch --merged             # List merged branches
    git branch --no-merged          # List unmerged branches

# Branch cleanup
    git branch -d branch-name       # Delete local branch (if merged)
    git branch -D branch-name       # Force delete local branch
    git push origin --delete branch # Delete remote branch
    git remote prune origin         # Remove references to deleted remote branches
    git fetch --prune               # Fetch and prune in one command

---

Workspace Cleaning
# Check workspace status
    git status                      # Show working tree status
    git status -s                   # Short format status

# Discard changes
    git checkout -- file            # Discard changes in file
    git checkout -- .               # Discard all unstaged changes
    git restore file                # Discard changes in file (Git 2.23+)
    git restore .                   # Discard all unstaged changes (Git 2.23+)

# Clean workspace
    git clean -n                    # Show what would be removed
    git clean -f                    # Remove untracked files
    git clean -fd                   # Remove untracked files and directories
    git clean -fx                   # Remove untracked and ignored files
    git reset --hard                # Discard all changes in tracked files
    git reset --hard HEAD           # Reset to last commit, discarding changes

# Stash changes
    git stash                       # Stash changes
    git stash save "message"        # Stash with message
    git stash list                  # List stashes
    git stash apply                 # Apply most recent stash
    git stash pop                   # Apply and remove most recent stash
    git stash drop                  # Remove most recent stash
    git stash clear                 # Remove all stashes

---

Pre/Post Pull/Push Operations
# Before pulling
    git fetch                       # Fetch remote changes without merging
    git fetch --all                 # Fetch from all remotes
    git diff origin/branch          # Compare local with remote before pull
    git branch --set-upstream-to=origin/branch # Set tracking branch

# After pulling
    git log ORIG_HEAD..             # View commits that were pulled
    git diff ORIG_HEAD              # See changes from pull
    git submodule update            # Update submodules after pull

# Before pushing
    git log origin/branch..HEAD     # View commits to be pushed
    git diff --stat origin/branch   # Show stats of changes to be pushed
    git remote -v                   # Verify remote repository
    git remote show origin          # Show remote branch info

# After pushing
    git tag -a v1.0 -m "Version 1.0" # Create annotated tag
    git push --tags                 # Push tags to remote

---

Repository Information
# Check remotes
    git remote -v                   # List remote repositories
    git remote show origin          # Show info about remote repository

# View history
    git log --oneline --graph       # Compact, graphical history
    git log --author="username"     # Filter by author
    git log --since="2 weeks ago"   # Filter by date
    git reflog                      # Reference log of HEAD changes

# Check for issues
    git fsck                        # Check repository integrity
    git gc                          # Clean up repository
    git verify-pack -v .git/objects/pack/pack-*.idx | sort -k 3 -n | tail # Find large objects

---

Configuration
# View config
    git config --list              # List all configurations
    git config --global --list     # List global configurations

# Set config
    git config --global user.name "Your Name"
    git config --global user.email "your.email@example.com"
    git config --global core.editor "code --wait" # Set VS Code as editor
    git config --global pull.rebase true # Set pull to rebase by default
    git config --global alias.st status # Create alias for status

---

Troubleshooting
# Fix common issues
    git commit --amend             # Modify last commit
    git rebase -i HEAD~3           # Interactive rebase of last 3 commits
    git bisect start               # Start binary search for bugs
    git bisect bad                 # Mark current commit as bad
    git bisect good commit-hash    # Mark commit as good
    git blame file                 # Show who changed each line
