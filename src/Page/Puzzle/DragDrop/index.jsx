import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { addImageToBoard, clearBoard } from "./action";
import Picture from "../Picture";
import { Button } from "@radix-ui/themes";

const puzzleState = (state) => state.puzzle;

const DragDrop = ({ className }) => {
  const { board, puzzle } = useSelector(puzzleState);
  const dispatch = useDispatch();

  const [, drop] = useDrop(() => ({
    accept: "image",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset) {
        // calculate the center X, Y
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const centerX = screenWidth / 2;
        const centerY = screenHeight / 2;

        // calculate the diff between mouse point to center
        const adjustedX = offset.x - centerX;
        const adjustedY = offset.y - centerY;

        // calculate x, y position
        const x = Math.floor((adjustedX + 150) / 100);
        const y = Math.floor((adjustedY + 150) / 100);
        const position = y * 3 + x - 2;

        dispatch(addImageToBoard(item.id, position - 1));
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const clearData = () => {
    dispatch(clearBoard());
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

export default styled(DragDrop)`
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
