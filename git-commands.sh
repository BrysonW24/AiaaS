Here's a comprehensive list of Git commands to help you self-manage your repositories:

Setup and Configuration
    git config --global user.name "[name]" - Set your username
    git config --global user.email "[email]" - Set your email
    git config --list - List all configurations

Creating Repositories
    git init - Initialize a new local repository
    git clone [url] - Clone a repository from URL

Basic Commands
    git status - Check repository status
    git add [file] - Add file to staging area
    git add . - Add all changes to staging area
    git commit -m "[message]" - Commit staged changes with message
    git commit -am "[message]" - Add and commit in one command

Branching and Merging
    git branch - List all local branches
    git branch -a - List all branches (local and remote)
    git branch [branch-name] - Create a new branc
    git checkout [branch-name] - Switch to a branch
    git checkout -b [branch-name] - Create and switch to a new branch
    git merge [branch-name] - Merge branch into current branch
    git branch -d [branch-name] - Delete a branch
    git branch -D [branch-name] - Force delete a branch

Remote Repositories
    git remote -v - List all remote repositories
    git remote add [name] [url] - Add a remote repository
    git remote remove [name] - Remove a remote
    git fetch [remote] - Download objects and refs from remote
    git pull [remote] [branch] - Fetch and merge from remote
    git push [remote] [branch] - Push branch to remote
    git push -u [remote] [branch] - Push and set upstream
    git push --force - Force push (use with caution)

History and Comparison
    git log - View commit history
    git log --oneline - Compact commit history
    git log --graph - Graphical commit history
    git diff - Show unstaged changes
    git diff --staged - Show staged changes
    git diff [commit1] [commit2] - Compare two commits

Undoing Changes
    git restore [file] - Discard changes in working directory
    git restore --staged [file] - Unstage a file
    git reset [commit] - Reset to specific commit (keeps changes)
    git reset --hard [commit] - Reset to specific commit (discard changes)
    git revert [commit] - Create new commit that undoes changes

Stashing
    git stash - Stash change
    git stash list - List stashes
    git stash apply - Apply most recent stash
    git stash apply stash@{n} - Apply specific stash
    git stash drop - Remove most recent stash
    git stash pop - Apply and remove most recent stash
    git stash clear - Remove all stashes

Advanced Commands
    git rebase [branch] - Reapply commits on top of another branch
    git cherry-pick [commit] - Apply specific commit to current branch
    git tag [name] - Create a tag
    git tag -a [name] -m "[message]" - Create annotated tag
    git bisect start - Start binary search for bugs
    git blame [file] - Show who changed what and when
    git reflog - Show reference logs

Cleaning and Maintenance
    git clean -n - Show what would be removed
    git clean -f - Remove untracked files
    git gc - Garbage collection
    git fsck - Check repository integrity
    git prune - Remove unreachable objects