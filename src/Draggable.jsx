import {useDraggable} from '@dnd-kit/core';

export function Draggable({ id, color, children, disabled }) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: id
  });
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    backgroundColor: color,
    border : color == "#ffffff" ? "1px solid black" : undefined,
    borderRadius: "25px",
    cursor: disabled ? "default" : "grab",
    fontSize: "30px",
    fontWeight: "bold",
    height: "100px",
    paddingTop: "70px",
    textAlign: "center",
    width: "200px",
    margin: "5px 5px",
  };


  if (!disabled) {
    return (
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        {children}
      </div>
    );
  } else {
    return (
      <div style={style}>
        {children}
      </div>
    );
  }
}