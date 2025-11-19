Intentional bugs & debugging tasks included:

1. Frontend: BugList toggle uses simplified toggle logic; in real app we'd support 'in-progress' state.
2. Frontend: No stable keys for items using _id is fine, but some components don't handle network errors fully.
3. Backend: Validation helper returns plain string error (not an object) — tests expect this shape.
4. Backend: Index.js will attempt Mongo connection and start server even if connection fails (graceful fallback included).

Use console.log, browser DevTools, and Node inspector to step through these when running locally.
