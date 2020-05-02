/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState, useEffect, useRef } from "react";
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
  let [safeAreaBottom, setSafeAreaBottom] = useState<number>(0);
  let scale = getAdjustZoomFactor(width, height - safeAreaBottom);
  let safeAreaChecker = useRef<HTMLDivElement | null>(null);
  let [src, setSrc] = useState<string>();
  useEffect(() => {
    const fetchData = async () => {
      let res = await axios("/entry");
      setSrc(res.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (safeAreaChecker.current) {
      let bottom =
        parseInt(getComputedStyle(safeAreaChecker.current).marginBottom) || 0;
      setSafeAreaBottom(bottom);
    }
  }, [height]);

  return (
    <div
      css={css`
        width: ${gameWidth * scale}px;
        height: ${gameHeight * scale}px;
        margin: auto;
        margin-bottom: ${(height - gameHeight * scale) / 2 >= safeAreaBottom
          ? "auto"
          : `${safeAreaBottom}px`};
        position: absolute;
        top: 0;
        bottom: 0; /* vertical center */
        left: 0;
        right: 0; /* horizontal center */
      `}
    >
      <div
        ref={safeAreaChecker}
        css={css`
          display: none;
          position: absolute;
          bottom: env(safe-area-inset-bottom);
        `}
      />
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
