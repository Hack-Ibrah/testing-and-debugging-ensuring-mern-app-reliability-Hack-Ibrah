Testing & Debugging Guide

Backend:
- Install dev deps: npm install
- Run tests: npm test
- Tests included: unit test for validation, integration tests for routes (with mocked DB).
- Debugging: use `node --inspect src/index.js` and connect Chrome DevTools to port 9229.

Frontend:
- Install deps: npm install
- Run tests: npm test
- Component examples using React Testing Library.
- Debugging: use React DevTools, browser console, and network tab. For server errors, check CORS and API base URL.

General:
- To run the whole stack locally, start backend (cd backend && npm install && npm run dev)
- Start frontend (cd frontend && npm install && npm run dev)
- README.md contains sample commands.
