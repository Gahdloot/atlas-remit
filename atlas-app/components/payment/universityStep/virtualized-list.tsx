"use client";

import { useState, useRef, useEffect } from "react";

interface VirtualizedListProps {
  items: any[];
  itemHeight?: number;
  visibleHeight?: number;
  renderItem: (item: any, index: number) => JSX.Element;
  className?: string;
}

export function VirtualizedList({
  items,
  itemHeight = 48,
  visibleHeight = 240,
  renderItem,
  className = "",
}: VirtualizedListProps) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 2);
  const endIndex = Math.min(
    items.length - 1,
    startIndex + Math.ceil(visibleHeight / itemHeight) + 4
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const offsetY = startIndex * itemHeight;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => setScrollTop(container.scrollTop);
    container.addEventListener("scroll", handleScroll);
    
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`overflow-y-auto ${className}`}
      style={{ height: visibleHeight }}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) =>
            renderItem(item, startIndex + index)
          )}
        </div>
      </div>
    </div>
  );
}