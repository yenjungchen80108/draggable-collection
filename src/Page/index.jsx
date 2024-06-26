import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Tabs from "@radix-ui/react-tabs";

import Puzzle from "./Puzzle";
import "./styles.css";

import { shuffleBoard } from "./Puzzle/DragDrop/action";
import { PictureList } from "./Puzzle/DragDrop/images";

const Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(shuffleBoard(PictureList));
  }, []);

  return (
    <Tabs.Root className="TabsRoot" defaultValue="tab1">
      <Tabs.List className="TabsList" aria-label="Manage your account">
        <Tabs.Trigger className="TabsTrigger" value="tab1">
          React-dnd puzzle
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="TabsContent" value="tab1">
        <Puzzle />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default Page;
