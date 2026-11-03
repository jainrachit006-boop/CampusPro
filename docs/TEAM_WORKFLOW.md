# Team Workflow - Campus Intelligence

## Role Assignments

### Person 1: Core Application and Integration
- Owns the overall codebase integration
- Responsible for frontend-backend connectivity
- Manages git repository and version control
- **GitHub ownership belongs to Person 1**

### Person 2: Supabase and Database
- Owns Supabase project setup and configuration
- Responsible for SQL schema and RLS policies
- Manages database migrations and structure
- **Supabase project ownership belongs to Person 2**

### Person 3: Hosting and Deployment
- Handles frontend deployment to Vercel
- Manages backend deployment configuration
- Sets up CI/CD pipelines
- Configures domain and SSL

### Person 4: UI/UX and QA
- Responsible for visual design and refinement
- Conducts usability testing
- Ensures accessibility and responsive design
- Creates component libraries and design systems

## Git Workflow

1. Create a branch from `main` for each feature/fix
2. Work in short-lived branches
3. Submit pull requests for code review
4. Merge only after approval from at least one other person
5. Keep commit messages concise and descriptive

## Branch Naming Conventions
- Features: `feature/<short-description>`
- Bug fixes: `bugfix/<short-description>`
- Hotfixes: `hotfix/<short-description>`

## Pull Request Process
1. Push branch to remote
2. Open PR against `main`
3. Fill PR template with description and checklist
4. Request review from team members
4. Address review feedback
5. Merge upon approval

## Communication
- Use Issues for tracking bugs and feature requests
- Use Discussions for design questions
- Tag relevant person when blocking issues arise