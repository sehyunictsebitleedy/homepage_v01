"use client";

import { useEffect, useRef, useState } from "react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%!*";

interface Props {
  text: string;
  className?: string;
  /** 시작 딜레이 (초) */
  delay?: number;
}

/**
 * 무작위 문자가 점점 실제 텍스트로 해독되는 decode 효과.
 */
export default function ScrambleText({ text, className, delay = 0 }: Props) {
  const [output, setOutput] = useState(() =>
    text
      .split("")
      .map((c) => (c === " " ? " " : CHARSET[0]))
      .join("")
  );
  const rafRef = useRef<number>(0);
  const iterRef = useRef(0);

  useEffect(() => {
    iterRef.current = 0;
    const MAX = text.length * 4;

    const timer = setTimeout(() => {
      const run = () => {
        setOutput(
          text
            .split("")
            .map((char, idx) => {
              if (char === " ") return " ";
              if (idx < iterRef.current / 4) return char;
              return CHARSET[Math.floor(Math.random() * CHARSET.length)];
            })
            .join("")
        );
        iterRef.current++;
        if (iterRef.current <= MAX) {
          rafRef.current = requestAnimationFrame(run);
        } else {
          setOutput(text);
        }
      };
      rafRef.current = requestAnimationFrame(run);
    }, delay * 1000);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
    };
  }, [text, delay]);

  return (
    <span className={className} aria-label={text}>
      {output}
    </span>
  );
}
