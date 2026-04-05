import hasLocalStorage from './hasLocalStorage';

describe('hasLocalStorage', () => {
  it('returns false when storage access throws', () => {
    const originalLocalStorage = window.localStorage;

    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {
        setItem: () => {
          throw new Error('blocked');
        },
        getItem: () => null,
        removeItem: () => {},
      },
    });

    expect(hasLocalStorage()).toBe(false);

    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: originalLocalStorage,
    });
  });
});
