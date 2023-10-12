/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useWindowSize } from "@react-hook/window-size";
import justifyLayout from "justified-layout";
import { MasonryScroller, useContainerPosition, usePositioner } from "masonic";

import mockData from "./data.json";

const arr: any = [];
let justifyLen = 0;
type JustifyLayoutResult = ReturnType<typeof justifyLayout>;
const jusifyLayouts: JustifyLayoutResult[] = [];

function Home() {
  const containerRef = useRef(null);
  const [windowWidth, windowHeight] = useWindowSize();
  const { offset, width } = useContainerPosition(containerRef, [
    windowWidth,
    windowHeight,
  ]);

  if (width > 0) {
    while (mockData.length > justifyLen) {
      const d = justifyLayout(mockData, {
        maxNumRows: 5,
        containerWidth: width - 15,
        containerPadding: 0,
        boxSpacing: 12,
        showWidows: false,
      });
      arr.push(mockData.slice(0, d.boxes.length));
      justifyLen += d.boxes.length;
      jusifyLayouts.push(d);
    }
  }

  const positioner = usePositioner({
    width: width,
    columnGutter: windowWidth < 768 ? 4 : 12,
    columnCount: 1,
  });

  return (
    <MasonryScroller
      positioner={positioner}
      offset={offset}
      height={windowHeight}
      containerRef={containerRef}
      items={jusifyLayouts}
      render={({ data, index }) => {
        const items = arr?.[index];

        return (
          <div
            className="abc"
            style={{
              height: data.containerHeight + "px",
              position: "relative",
            }}
          >
            {data.boxes.map((box, i) => {
              const p = items[i].palettes[0];
              return (
                <div
                  key={i}
                  className="flex items-center justify-center rounded"
                  style={{
                    width: `${box.width}px`,
                    height: `${box.height}px`,
                    position: "absolute",
                    top: `${box.top}px`,
                    left: `${box.left}px`,
                    backgroundColor: `rgba(${p.color.join(",")},${
                      p.ratio / 100
                    })`,
                  }}
                >
                  <strong>{index}</strong>-{i}
                </div>
              );
            })}
          </div>
        );
      }}
    />
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
