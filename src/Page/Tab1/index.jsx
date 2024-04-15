import DragBlock from "../../components/DragBlock";

const Tab1 = () => (
  <div>
    <DragBlock
      xPos={100}
      yPos={100}
      containerWidth={75}
      bottomCoverHeight={100}
      // onHandleClick={handleBtnClick}
    >
      <img src="../images/logo_btn.png" width="100px" alt="" />
    </DragBlock>
  </div>
);

export default Tab1;
