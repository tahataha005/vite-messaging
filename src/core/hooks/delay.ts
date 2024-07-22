import { useEffect, useRef, useState } from "react";

let isInitialRender = true;

const useDelay = (
  callback: () => void | ((t: NodeJS.Timeout) => void),
  deps: any[]
) => {
  const [hasChanged, setHasChanged] = useState(false);
  const cleanupRef = useRef<(t: NodeJS.Timeout) => void>();

  const dependenciesRef = useRef(deps);

  const dependenciesChanged = deps.some((dep, index) => {
    return dependenciesRef.current[index] !== dep;
  });

  useEffect(() => {
    console.log("useDelay");

    if (isInitialRender || dependenciesChanged) {
      dependenciesRef.current = deps;

      const t = setTimeout(() => {
        callback();
      }, 1000);

      if (cleanupRef.current !== undefined) {
        cleanupRef.current(t);
      }

      isInitialRender = false;

      setHasChanged(true);
    }
  }, deps);

  useEffect(() => {
    return () => {
      isInitialRender = true;
    };
  }, []);
};

export default useDelay;
