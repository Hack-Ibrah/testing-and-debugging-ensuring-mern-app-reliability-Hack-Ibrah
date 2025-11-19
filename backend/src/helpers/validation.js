exports.validateBug = (payload) => {
  if (!payload || typeof payload !== 'object') return { error: 'Invalid payload' };
  if (!payload.title || payload.title.trim().length < 3) return { error: 'Title must be at least 3 characters' };
  // further rules can be added
  return { error: null };
};
