import { useState, useRef, useEffect, useLayoutEffect } from "react";
import Draggable from "react-draggable";
import useResize from "../../hooks/useResize";
/**
 *
 * @param {Number} param.xPos - 物件所在x座標
 * @param {Number} param.yPos - 物件所在y座標
 * @param {Number} param.containerWidth - 物件父層寬度
 * @param {Number} param.bottomCoverHeight - 底部內縮高度
 * @param {Function} param.onHandleClick - 點按按鈕的 callback
 * @returns
 */

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const DragBlock = ({
  xPos,
  yPos,
  containerWidth,
  bottomCoverHeight,
  children,
  // onHandleClick = () => {},
}) => {
  const blockRef = useRef();
  const [, setIsReady] = useState(false);
  const [, setDragging] = useState(false);
  const [currentPosition, setPosition] = useState({
    x: 0,
    y: yPos,
  });

  // const getStyles = useCallback((x, y, dragging) => {
  //   const transform = `translate3d(${x}px, ${y}px, 0)`;

  //   return {
  //     transform,
  //     WebkitTransform: transform,
  //     cursor: dragging ? "grabbing" : "grab",
  //     touchAction: dragging ? "none" : "auto",
  //     position: "fixed",
  //     zIndex: 1,
  //   };
  // }, []);

  // 如螢幕寬度改變, 拖曳物件定位為寬度 - 物件寬度
  // const handleResize = useCallback(() => {
  //   setPosition((prev) => ({
  //     ...prev,
  //     x: window.innerWidth - containerWidth,
  //   }));
  // }, [setPosition, containerWidth]);
  const defineWindow = () => {
    if (blockRef.current) {
      setPosition((prev) => ({
        ...prev,
        x: xPos > window.innerWidth ? window.innerWidth - containerWidth : xPos,
      }));
      setIsReady(true);
    }
  };

  // render之前設定初始 x 座標為寬度 - 物件寬度
  useIsomorphicLayoutEffect(() => {
    if (currentPosition.x === 0) {
      defineWindow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 監聽resize事件
  useResize({
    onResize: () => {
      defineWindow();
    },
  });

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.addEventListener("resize", handleResize);
  //   }

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [handleResize]);

  const onDrag = (e) => {
    setDragging(true);
    let clientX, clientY;

    if (e.type === "touchmove") {
      const touch = e.changedTouches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else if (e.type === "mousemove") {
      clientX = e.clientX;
      clientY = e.clientY;
      // console.log("clientX", clientX);
      // console.log("clientY", clientY);
      // console.log("window.innerWidth", window.innerWidth);
      // console.log("containerWidth", containerWidth);
    }

    if (clientX !== undefined && clientY !== undefined) {
      setPosition({
        x:
          clientX >= window.innerWidth - containerWidth
            ? window.innerWidth - containerWidth
            : Math.max(clientX, 10),
        y:
          clientY >= window.innerHeight - bottomCoverHeight
            ? window.innerHeight - bottomCoverHeight
            : Math.max(clientY, 10),
      });
    }
  };

  // const onStop = (...args) => {
  //   // onStop如果非拖曳狀態監聽是否有click事件，有的話就觸發
  //   if (!isDragging) {
  //     onHandleClick?.(...args);
  //   }

  //   setDragging(false);
  // };

  return (
    <Draggable
      handle=".handle"
      // defaultPosition={{ x: 0, y: 0 }}
      // grid={[25, 25]}
      // scale={1}
      // position={{
      //   x: currentPosition.x,
      //   y: currentPosition.y,
      // }}
      onDrag={onDrag}
      // onStop={onStop}
    >
      <div
        className="handle"
        ref={blockRef}
        // style={{
        //   ...getStyles(currentPosition.x, currentPosition.y, isDragging),
        //   visibility: isReady ? "visible" : "hidden",
        // }}
      >
        {children}
      </div>
    </Draggable>
  );
};

export default DragBlock;
