import {useDroppable} from '@dnd-kit/core';

export function Droppable({id, children}) {
  const {isOver, setNodeRef} = useDroppable({
    id: id
  });
  const imgUrl = new URL('./assets/music_note.png', import.meta.url).href
  const style = {
    backgroundColor: isOver ? '#f7f7f5' : '#ffffff',
    backgroundImage: "url(" + imgUrl + ")",
    backgroundSize: "100px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    border: isOver ? '1px solid blue' : '1px dashed black',
    borderRadius: "25px",
    fontSize: "20px",
    fontWeight: "200",
    height: "100px",
    paddingTop: "80px",
    textAlign: "center",
    width: "200px",
    margin: "5px 5px",
  };
  
  
  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}