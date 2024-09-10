import React, { useState, useCallback } from "react";
import Partition from "../components/Partition";
import getRandomColor from "../utils/getRandomGradiant";

const LayoutBuilder = () => {
  const [layout, setLayout] = useState([
    {
      id: Date.now(),
      direction: null,
      color: getRandomColor(),
      children: [],
    },
  ]);
  const [resizing, setResizing] = useState(null);

  const splitPartition = useCallback((id, direction) => {
    setLayout((prevLayout) => {
      const newLayout = [...prevLayout];

      const findAndSplit = (node) => {
        if (node.id === id) {
          const newColor = getRandomColor();
          node.direction = direction;
          node.children.push(
            {
              id: Date.now(), // New partition retains the old color
              direction: null,
              color: node.color,
              children: [],
            },
            {
              id: Date.now() + 1, // New partition gets a new random color
              direction: null,
              color: newColor,
              children: [],
            }
          );
        }
        node.children.forEach(findAndSplit);
      };

      newLayout.forEach(findAndSplit);
      return newLayout;
    });
  }, []);

  const deletePartition = useCallback((id) => {
    setLayout((prevLayout) => {
      const deepCloneAndRemove = (node) => {
        if (node.id === id) return null;
        const newChildren = node.children
          .map(deepCloneAndRemove)
          .filter((child) => child !== null);
        return { ...node, children: newChildren };
      };

      return prevLayout.map(deepCloneAndRemove).filter((node) => node !== null);
    });
  }, []);

  const onResizeStart = (e, id) => {
    e.preventDefault();
    setResizing({ id, startX: e.clientX, startY: e.clientY });
  };

  const onMouseMove = useCallback(
    (e) => {
      if (!resizing) return;
      const { id, startX, startY } = resizing;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      const resizePartition = (node) => {
        if (node.id === id) {
          node.width = (node.width || 200) + deltaX; // Resize width
          node.height = (node.height || 200) + deltaY; // Resize height
        }
        node.children.forEach(resizePartition);
      };

      setLayout((prevLayout) => {
        const newLayout = [...prevLayout];
        newLayout.forEach(resizePartition);
        return newLayout;
      });

      setResizing({ ...resizing, startX: e.clientX, startY: e.clientY });
    },
    [resizing]
  );

  const onMouseUp = () => {
    setResizing(null);
  };

  const renderLayout = (nodes) => {
    return nodes.map((node) => {
      if (node.children.length > 0) {
        return (
          <div
            key={node.id}
            style={{
              flexGrow: 1,
              display: "flex",
              flexDirection: node.direction === "horizontal" ? "row" : "column",
              position: "relative",
              minHeight: "50px",
              minWidth: "50px",
            }}
          >
            {renderLayout(node.children)}
          </div>
        );
      }

      return (
        <Partition
          key={node.id}
          id={node.id}
          direction={node.direction}
          color={node.color}
          onSplit={splitPartition}
          onDelete={deletePartition}
          onResizeStart={onResizeStart}
          isResizable={node.children.length === 0}
        />
      );
    });
  };

  return (
    <div
      style={{ height: "100vh", width: "100vw", display: "flex" }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {renderLayout(layout)}
    </div>
  );
};

export default LayoutBuilder;
