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

export default Partition;
