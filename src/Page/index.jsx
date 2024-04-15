import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Tabs from "@radix-ui/react-tabs";

import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import "./styles.css";

import { shuffleBoard } from "../components/DragDrop/action";
import { PictureList } from "../components/DragDrop/images";

const Page = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(shuffleBoard([...PictureList].sort(() => Math.random() - 0.5)));
  }, []);

  return (
    <Tabs.Root className="TabsRoot" defaultValue="tab1">
      <Tabs.List className="TabsList" aria-label="Manage your account">
        <Tabs.Trigger className="TabsTrigger" value="tab1">
          React-draggable
        </Tabs.Trigger>
        <Tabs.Trigger className="TabsTrigger" value="tab2">
          React-dnd
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="TabsContent" value="tab1">
        <Tab1 />
      </Tabs.Content>
      <Tabs.Content className="TabsContent" value="tab2">
        <Tab2 />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default Page;
