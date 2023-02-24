import React, {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

interface Props extends PropsWithChildren {
  animationDuration?: number;
}

export function AnimateHeight({ children, animationDuration = 0.5 }: Props) {
  const shadowRef = useRef<HTMLDivElement>(null);
  const actualRef = useRef<HTMLDivElement>(null);
  const [actualInnerHTML, setActualInnerHTML] = useState<ReactNode>(children);
  const shadowInnerHTML = useRef<ReactNode>(children);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  shadowInnerHTML.current = children;

  useEffect(() => {
    if (!shadowRef.current) {
      return;
    }

    const mutationObserver = new MutationObserver(() => {
      if (!shadowRef.current || !actualRef.current) {
        return;
      }

      if (shadowRef.current.offsetHeight >= actualRef.current.offsetHeight) {
        setActualInnerHTML(shadowInnerHTML.current);
      } else {
        setTimeout(() => {
          setActualInnerHTML(shadowInnerHTML.current);
        }, animationDuration * 1000);
      }
    });

    mutationObserver.observe(shadowRef.current, {
      attributes: true,
      attributeFilter: ["style"],
      childList: true,
      subtree: true,
    });
  }, []);

  useEffect(() => {
    if (!shadowRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      if (!shadowRef.current) {
        return;
      }
      setHeight(shadowRef.current.offsetHeight);
    });

    resizeObserver.observe(shadowRef.current);
    return () => resizeObserver.disconnect();
  }, [shadowRef.current]);

  useEffect(() => {
    if (!actualRef.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(() => {
      if (!actualRef.current) {
        return;
      }
      setWidth(actualRef.current.offsetWidth);
    });

    resizeObserver.observe(actualRef.current);
    return () => resizeObserver.disconnect();
  }, [actualRef.current]);

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={shadowRef}
        data-react-animate-height-type="shadow"
        style={{
          opacity: 0,
          top: 0,
          left: 0,
          position: "absolute",
          width,
          zIndex: 1,
        }}
      >
        {shadowInnerHTML.current}
      </div>

      <div
        ref={actualRef}
        style={{
          height,
          transition: `height ${animationDuration}s`,
          overflow: "hidden",
          zIndex: 2,
        }}
        data-react-animate-height-type="actual"
      >
        {actualInnerHTML}
      </div>
    </div>
  );
}
