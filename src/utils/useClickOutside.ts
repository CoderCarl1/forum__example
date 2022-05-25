import { useRef, useEffect } from 'react';

/**
 *
 * @param _cb - a Callback that will be run when the user clicks outside
 * @returns {React.MutableRefObject<HTMLElement>} domRef
 */

function UseClickOutside<T extends HTMLElement>(_cb: Function) {
  const domRef = useRef<T>(null);

  useEffect(() => {
    function outsideClickHandler(event: MouseEvent) {
      const target = event.target as HTMLElement;

      if (!domRef.current?.contains(target)) {
        _cb();
        return;
      }
    }

    document.addEventListener('mousedown', outsideClickHandler, true);

    return () => {
      document.removeEventListener('mousedown', outsideClickHandler, true);
    };
  }, [_cb]);

  return domRef;
}

export default UseClickOutside;
