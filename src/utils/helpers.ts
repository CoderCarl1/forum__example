/**
 * Gets keyboard-focusable elements within a specified element
 * @param {Element} [Element]
 * @returns {Array} Array of Elements that now have a tabIndex of -1
 */
export function setFocusableElements(element: Element) {
  if (!element) throw new Error('No element passed as an argument');

  const elementsArray = Array.from(
    element.querySelectorAll(
      'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])',
    ),
  ).filter(
    (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'),
  );

  if (elementsArray.length > 0)
    return elementsArray.map((el) => {
      (el as HTMLElement).tabIndex = -1;
      return el as HTMLElement;
    });

  return [];
}
