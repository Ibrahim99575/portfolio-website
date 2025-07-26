# Git History Cleanup Instructions

## ⚠️ WARNING: This will rewrite Git history!

### Option 1: Remove Sensitive File from History
```bash
# Remove the file from all commits
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch src/config/emailConfig.js' --prune-empty --tag-name-filter cat -- --all

# Force push to overwrite GitHub history
git push origin --force --all
```

### Option 2: BFG Repo Cleaner (Recommended)
```bash
# Install BFG
# Download from: https://rtyley.github.io/bfg-repo-cleaner/

# Clone a fresh copy
git clone --mirror https://github.com/Ibrahim99575/portfolio-website.git

# Remove sensitive data
java -jar bfg.jar --replace-text passwords.txt portfolio-website.git

# Push cleaned history
cd portfolio-website.git
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push --force
```

### Option 3: Create New Repository (Safest)
1. Create a new GitHub repository
2. Copy current code (without .git folder)
3. Initialize new git repo
4. Push to new repository
5. Update all links/references
6. Delete old repository

## 🔒 After Cleanup:
1. Update all EmailJS credentials
2. Add new secrets to GitHub repository
3. Test contact form functionality
