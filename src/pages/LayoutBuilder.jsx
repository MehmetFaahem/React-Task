import React, { useState, useCallback } from "react";

// Utility function to generate a random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Partition = ({
  id,
  direction,
  color,
  onSplit,
  onDelete,
  onResizeStart,
  isResizable,
}) => {
  return (
    <div
      style={{
        position: "relative",
        flexGrow: 1,
        backgroundColor: color,
        display: "flex",
        flexDirection: direction === "horizontal" ? "row" : "column",
        border: "1px solid #000",
        minWidth: "50px",
        minHeight: "50px",
        resize: isResizable ? "both" : "none", // Enable resizing for top-level nodes
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 5, left: 5 }}>
        <button onClick={() => onSplit(id, "horizontal")}>H</button>
        <button onClick={() => onSplit(id, "vertical")}>V</button>
        <button onClick={() => onDelete(id)}>-</button>
      </div>
      {isResizable && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "10px",
            height: "10px",
            backgroundColor: "black",
            cursor: "nwse-resize",
          }}
          onMouseDown={(e) => onResizeStart(e, id)}
        />
      )}
    </div>
  );
};

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
