import {useDraggable} from '@dnd-kit/core';

export function Draggable({ id, color, children }) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: id
  });
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    backgroundColor: color,
    borderRadius: "25px",
    cursor: "grab",
    fontSize: "30px",
    fontWeight: "bold",
    height: "100px",
    paddingTop: "70px",
    textAlign: "center",
    width: "160px",
    margin: "5px 5px",
  };


  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}