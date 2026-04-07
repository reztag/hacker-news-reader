function saveState({ storageKey, state }) {
  try {
    if (typeof state === 'undefined') {
      localStorage.removeItem(storageKey);
      return;
    }

    const serializedState = JSON.stringify(state);

    localStorage.setItem(storageKey, serializedState);
  } catch (err) {
    // Ignore write errors.
  }
}

export default saveState;
