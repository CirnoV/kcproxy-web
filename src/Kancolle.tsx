/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useEffect } from "react";
import axios from "axios";

const getWidth = () => window.innerWidth;
const getHeight = () => window.innerHeight;

function useViewport(): [number, number] {
  let [width, setWidth] = useState(getWidth());
  let [height, setHeight] = useState(getHeight());

  useEffect(() => {
    let timeoutId: number | null = null;
    const resizeListener = () => {
      clearTimeout(timeoutId!);
      timeoutId = window.setTimeout(() => {
        setWidth(getWidth());
        setHeight(getHeight());
      }, 150);
    };
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return [width, height];
}

const gameWidth = 1200;
const gameHeight = 720;
const gameAspectRatio = gameWidth / gameHeight;

function getAdjustZoomFactor(width: number, height: number): number {
  let aspectRatio = width / height;
  let zoomFactor = 1.0;

  if (aspectRatio < gameAspectRatio) {
    zoomFactor = width / gameWidth;
  } else {
    zoomFactor = height / gameHeight;
  }

  return zoomFactor;
}

function Kancolle() {
  let [width, height] = useViewport();
  let scale = getAdjustZoomFactor(width, height);
  let [src, setSrc] = useState<string>();
  useEffect(() => {
    const fetchData = async () => {
      let res = await axios("/entry");
      setSrc(res.data);
    };
    fetchData();
  }, []);

  return (
    <div
      css={css`
        width: 100vw;
        height: 60vw; /* 100/60 = 1.6667 */
        max-height: 100vh;
        max-width: 166.67vh; /* 5/3 = 1.6667 */
        margin: auto;
        position: absolute;
        top: 0;
        bottom: 0; /* vertical center */
        left: 0;
        right: 0; /* horizontal center */
      `}
    >
      <div
        css={css`
          display: flex;
          transform: scale(${scale});
          transform-origin: 0 0;
          position: absolute;
        `}
      >
        {
          <iframe
            title="game-view"
            src={src}
            css={css`
              width: 1200px;
              height: 720px;
              border: 0;
            `}
          />
        }
      </div>
    </div>
  );
}

export default Kancolle;
