import { useEffect, useRef, useState } from 'react';
import { setFocusableElements } from './helpers';

export default function useKeyboard(
  nodeRef: React.MutableRefObject<HTMLElement | null>,
  _cb: Function,
) {
  const focusables = useRef<HTMLElement[] | null>(null);
  const [focusedEl, setFocusedEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (focusables.current === null || focusedEl !== null) return;
    setFocusedEl(focusables.current[0]);
  }, []);

  function moveFocus(
    arr: HTMLElement[],
    currEl: HTMLElement,
    direction: 'up' | 'down',
  ) {
    const steps = {
      up: -1,
      down: +1,
    };

    const currentIndex = arr.findIndex((el) => el === currEl);

    const maxLength = arr.length - 1;

    if (currentIndex + steps[direction] === maxLength + 1) {
      setFocusedEl(arr[0]);
      return;
    }
    if (currentIndex + steps[direction] < 0) {
      setFocusedEl(arr[maxLength]);
      return;
    }
    setFocusedEl(arr[currentIndex + steps[direction]]);
    return;
  }

  useEffect(() => {
    if (nodeRef.current === null) {
      return;
    }

    const node = nodeRef.current;
    node.tabIndex = -1;
    focusables.current = setFocusableElements(node);
    focusables.current.unshift(node);

    function handleKeyPress(event: KeyboardEvent) {
      if (focusables.current === null || focusedEl === null) return;
      const { code } = event;
      switch (true) {
        case code === 'Escape': {
          event.preventDefault();
          _cb();
          break;
        }
        case event.shiftKey && code === 'Tab': {
          event.preventDefault();
          moveFocus(focusables.current, focusedEl, 'up');
          break;
        }
        case code === 'Tab': {
          event.preventDefault();
          moveFocus(focusables.current, focusedEl, 'down');
          break;
        }
      }
    }

    node.addEventListener('keydown', handleKeyPress);
    return () => node.removeEventListener('keydown', handleKeyPress);
  }, [focusedEl]);

  useEffect(() => {
    if (focusedEl !== null) focusedEl.focus();
  }, [focusedEl]);
}
