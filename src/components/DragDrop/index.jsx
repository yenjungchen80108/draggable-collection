import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useDrop } from "react-dnd";
import {
  initializeBoard,
  shuffleBoard,
  addImageToBoard,
  clearBoard,
} from "./action";
import Picture from "../Picture";
import { Button } from "@radix-ui/themes";

const DragDrop = ({
  className,
  board,
  puzzle,
  addImageToBoard,
  clearBoard,
}) => {
  const [, drop] = useDrop(() => ({
    accept: "image",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        // 計算畫面中心位置的偏移量
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const centerX = screenWidth / 2;
        const centerY = screenHeight / 2;

        // 調整拖曳位置，使其以畫面中心為原點
        const adjustedX = offset.x - centerX;
        const adjustedY = offset.y - centerY;

        // 根據調整後的位置計算所在的九宮格位置
        const x = Math.floor((adjustedX + 150) / 100); // 每個格子的寬度為100px，並加上每個格子的一半寬度
        const y = Math.floor((adjustedY + 150) / 100); // 每個格子的高度為100px，並加上每個格子的一半高度
        const position = y * 3 + x - 2; // 計算所在九宮格的位置

        addImageToBoard(item.id, position - 1); // 呼叫 addImageToBoard 函數並傳遞位置參數
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const clearData = () => {
    clearBoard();
  };

  return (
    <div className={className}>
      <div className="pictures">
        {board.map((picture, index) => {
          return <Picture key={index} url={picture.url} id={picture.id} />;
        })}
      </div>
      <div className="board" ref={drop}>
        {puzzle.map((picture, index) => {
          return (
            <Picture
              key={index}
              url={picture.url}
              id={picture.id}
              className="piece"
            />
          );
        })}
      </div>
      <Button variant="solid" onClick={clearData}>
        Clear
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  initialBoard: state.initialBoard,
  board: state.board,
  puzzle: state.puzzle,
});

const mapDispatchToProps = {
  shuffleBoard,
  addImageToBoard,
  clearBoard,
  initializeBoard,
};

const ConnectedDragDropComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDrop);

export default styled(ConnectedDragDropComponent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .pictures {
    width: 300px;
    height: 300px;
    border: 1px solid black;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 1px;
    margin: 15px;
  }

  img {
    margin: 0;
    width: 100%;
    object-fit: contain;
  }

  .board {
    width: 300px;
    height: 300px;
    border: 1px solid black;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 1px;
    background-image: url("../images/dogs_light.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    margin-bottom: 15px;
  }
`;
