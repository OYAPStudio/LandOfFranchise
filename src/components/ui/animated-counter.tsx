"use client";

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  useComma?: boolean;  // Added parameter to control separator
  className?: string;
  label?: string;
  labelClassName?: string;
  inline?: boolean;  // Added parameter for inline display
}

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2.5,
  decimals = 0,
  useComma = false,  // Default to no comma separator
  className = "",
  label,
  labelClassName = "",
  inline = false,  // Default to block display
}: AnimatedCounterProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  // Determine the separator based on useComma parameter
  const separator = useComma ? "," : "";

  // Container class depends on inline or block display
  const containerClass = inline ? "inline" : "text-center";

  return (
    <div ref={ref} className={containerClass}>
      <div className={`${inline ? "inline" : "text-4xl"} font-bold ${className}`}>
        {hasAnimated ? (
          <CountUp
            start={0}
            end={value}
            duration={duration}
            decimals={decimals}
            separator={separator}
            prefix={prefix}
            suffix={suffix}
            useEasing={true}
          />
        ) : (
          <span>{prefix}0{suffix}</span>
        )}
      </div>
      {label && (
        <div className={`${inline ? "inline ml-2" : "mt-2 text-sm text-gray-600 dark:text-gray-400"} ${labelClassName}`}>
          {label}
        </div>
      )}
    </div>
  );
}