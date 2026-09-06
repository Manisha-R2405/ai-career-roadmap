# Contributing to AI Career Roadmap

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## How to Contribute

### 1. Fork the Repository

```bash
git clone https://github.com/Manisha-R2405/ai-career-roadmap.git
cd ai-career-roadmap
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/description` - New feature
- `bugfix/description` - Bug fix
- `docs/description` - Documentation
- `refactor/description` - Code refactoring

### 3. Make Changes

Following the coding standards:

- Use clear, descriptive variable names
- Add comments for complex logic
- Follow existing code style
- Write meaningful commit messages

### 4. Test Your Changes

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd ../client
npm test
```

### 5. Commit Your Changes

```bash
git add .
git commit -m "feat: Add new feature description"
```

Commit message format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test changes

### 6. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 7. Create Pull Request

1. Go to GitHub
2. Click "Compare & pull request"
3. Add title and description
4. Reference related issues
5. Submit PR

## Pull Request Guidelines

### PR Title Format

```
[Type] Brief description

Examples:
[Feature] Add interview practice module
[Fix] Resolve login authentication error
[Docs] Update API documentation
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
- Test 1
- Test 2

## Screenshots (if UI changes)
[Add screenshots]

## Related Issues
Fixes #123

## Checklist
- [ ] Code follows style guide
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
```

## Coding Standards

### JavaScript/Node.js

```javascript
// Use const/let, not var
const name = 'value';

// Use arrow functions
const handleClick = () => {};

// Use descriptive names
const getUserById = (id) => {};

// Add comments for complex logic
// Calculate discount based on user tier
const discount = tier === 'premium' ? 0.15 : 0.05;

// Use async/await
const fetchData = async () => {
  try {
    const response = await api.get('/data');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### React/JSX

```jsx
// Component naming
const UserProfile = () => {
  return (
    <div className="user-profile">
      <h1>User Profile</h1>
    </div>
  );
};

// Use functional components
const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
};

// Use hooks properly
const useApi = (url) => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Fetch data
  }, [url]);
  
  return data;
};
```

### CSS/Tailwind

```css
/* Use Tailwind utility classes */
<div className="flex gap-4 p-4 bg-white rounded-lg shadow">
  <h2 className="text-2xl font-bold text-gray-800">
    Title
  </h2>
</div>

/* Use responsive classes */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>
```

## Project Structure

When adding new features:

```
Feature Name/
├── Component.jsx          # React component
├── Component.css          # Component styles
├── Component.test.jsx     # Component tests
├── hooks/                 # Custom hooks
├── services/              # API services
└── utils/                 # Utility functions
```

## Adding New Features

### Database Schema Changes

1. Update `server/database/schema.sql`
2. Create migration script in `server/database/migrations/`
3. Update seed script if needed
4. Document schema changes

### New API Endpoint

1. Create controller in `server/controllers/`
2. Create route in `server/routes/`
3. Add service in `client/services/`
4. Update API documentation
5. Add tests

### New React Component

1. Create component in `client/src/components/`
2. Add component tests
3. Update parent component imports
4. Document component props
5. Add to storybook if applicable

## Testing

### Backend Tests

```javascript
// Example test
describe('User Authentication', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
        educationLevel: 'UG',
        department: 'CSE'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();
  });
});
```

### Frontend Tests

```javascript
// Example test
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

## Documentation

- Update README if adding features
- Add JSDoc comments for functions
- Document API changes
- Update CHANGELOG.md
- Add examples if applicable

## Performance

- Avoid unnecessary re-renders
- Use React.memo for expensive components
- Optimize images and assets
- Lazy load components when possible
- Monitor bundle size

## Accessibility

- Use semantic HTML
- Add alt text to images
- Ensure keyboard navigation
- Use ARIA labels when needed
- Test with screen readers

## Common Issues

### Merge Conflicts

```bash
# Pull latest changes
git pull origin main

# Resolve conflicts in files
# Then:
git add .
git commit -m "Resolve merge conflicts"
git push origin feature/your-feature
```

### Rebase on Latest Main

```bash
git fetch origin
git rebase origin/main
git push origin feature/your-feature --force
```

## Getting Help

- Open an issue for questions
- Check existing issues and discussions
- Email manisha240507@gmail.com
- Join our community

## Review Process

1. Maintainer reviews your PR
2. Suggestions and changes may be requested
3. Make requested changes
4. PR is approved and merged
5. Your branch is deleted

## Recognition

Contributors will be:
- Added to CONTRIBUTORS.md
- Mentioned in release notes
- Credited in project

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🎉
