import { useState } from "react";
import Split from "react-split";
import { getRandomGradient } from "../utils/getRandomGradiant";
import Partition from "../components/Partition";

function LayoutBuilder() {
  const [layout, setLayout] = useState({
    id: 1,
    direction: null,
    gradient: getRandomGradient(),
    children: [],
  });

  const splitPartition = (id, direction) => {
    setLayout((prevLayout) => {
      const newLayout = { ...prevLayout };
      const findAndSplit = (node) => {
        if (node.id === id) {
          node.direction = direction;
          node.children = [
            {
              id: Date.now(),
              direction: null,
              gradient: node.gradient,
              children: [],
            },
            {
              id: Date.now() + 1,
              direction: null,
              gradient: getRandomGradient(),
              children: [],
            },
          ];
          return true;
        }
        return node.children.some(findAndSplit);
      };
      findAndSplit(newLayout);
      return newLayout;
    });
  };

  const deletePartition = (id) => {
    setLayout((prevLayout) => {
      const newLayout = { ...prevLayout };
      const findAndDelete = (node, parent) => {
        const index = node.children.findIndex((child) => child.id === id);
        if (index !== -1) {
          if (node.children.length === 2) {
            const remainingChild = node.children[1 - index];
            node.direction = remainingChild.direction;
            node.gradient = remainingChild.gradient;
            node.children = remainingChild.children;
          } else {
            node.children.splice(index, 1);
          }
          return true;
        }
        return node.children.some((child) => findAndDelete(child, node));
      };
      if (newLayout.id !== id) {
        findAndDelete(newLayout);
      }
      return newLayout;
    });
  };

  const renderLayout = (node, parentGradient = null) => {
    if (!node.direction) {
      return (
        <Partition
          key={node.id}
          id={node.id}
          onSplit={splitPartition}
          onDelete={deletePartition}
          gradient={node.gradient}
          parentGradient={parentGradient}
        />
      );
    }

    return (
      <Split
        key={node.id}
        sizes={Array(node.children.length).fill(100 / node.children.length)}
        direction={node.direction}
        minSize={100}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        cursor={node.direction === "horizontal" ? "col-resize" : "row-resize"}
        style={{ height: "100%", width: "100%" }}
      >
        {node.children.map((child) => renderLayout(child, node.gradient))}
      </Split>
    );
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {renderLayout(layout)}
    </div>
  );
}

export default LayoutBuilder;
