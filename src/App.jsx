import "./App.css";
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import useSound from 'use-sound';


import { Droppable } from "./Droppable";
import { Draggable } from "./Draggable";

import c4 from './assets/c4.mp3';
import d4 from './assets/d4.mp3';
import e4 from './assets/e4.mp3';
import f4 from './assets/f4.mp3';
import g4 from './assets/g4.mp3';
import a5 from './assets/a5.mp3';
import b5 from './assets/b5.mp3';
import c5 from './assets/c5.mp3';

function App() {
  const numNotes = 8;
  const numSpots = 25;
  const numIndices = numNotes * numSpots;
  const noteNames = ["C4", "D4", "E4", "F4", "G4", "A5", "B5", "C5"];
  const colors = [
    "#ffadad",
    "#ffd6a5",
    "#fdffb6",
    "#caffbf",
    "#9bf6ff",
    "#a0c4ff",
    "#bdb2ff",
    "#ffc6ff",
  ];

  const [playC4] = useSound(c4);
  const [playD4] = useSound(d4);
  const [playE4] = useSound(e4);
  const [playF4] = useSound(f4);
  const [playG4] = useSound(g4);
  const [playA5] = useSound(a5);
  const [playB5] = useSound(b5);
  const [playC5] = useSound(c5);

  const sounds = [playC4, playD4, playE4, playF4, playG4, playA5, playB5, playC5];

  const [parents, setParents] = useState(Array(numSpots - 1).fill(-1));
  const [noteFrequencies, setNoteFrequencies] = useState(
    Array(numNotes).fill(1)
  );

  function sendSong() {
    const toSend = parents.map((id) => {
      if (id === -1) {
        return -1;
      }
      return Math.floor(id / numSpots);
    });
    const currentDate = new Date(); 
    const timestamp = currentDate.getTime();
    const dweet = {
      "song": toSend,
      "timestamp": timestamp,
    };
    const dweetString = JSON.stringify(dweet);
    const dweetUrl = "https://dweet.io/dweet/for/gened1080?content=" + dweetString;
    fetch(dweetUrl);
  }

  function cancel() {
    setParents(Array(numSpots - 1).fill(-1));
    setNoteFrequencies(Array(numNotes).fill(1));
  }

  function handleDragEnd(event) {
    const { over, active } = event;
    if (!over || !active) {
      return;
    }
    const newParents = [...parents];
    newParents[over.id - numIndices] = active.id;
    setParents(newParents);

    const newNoteFrequencies = [...noteFrequencies];
    const index = Math.floor(active.id / numSpots);
    newNoteFrequencies[index] += 1;
    setNoteFrequencies(newNoteFrequencies);

    sounds[index]();
  }

  return (
    <>
      <header>
        <h1>GenEd 1080 Final Project</h1>
        <h2>Drag the tiles into the spaces below to create a song!</h2>
      </header>
      <div className="noteContainer">
        <DndContext onDragEnd={handleDragEnd}>
          {noteNames.map((id, i) => (
            <Draggable
              key={noteFrequencies[i] + i * numSpots}
              id={noteFrequencies[i] + i * numSpots}
              color={colors[i]}
            >
              {id}
            </Draggable>
          ))}

          {parents.map((id, i) =>
            parents[i] != -1 ? (
              <Draggable
                key={parents[i]}
                id={parents[i]}
                color={colors[Math.floor(parents[i] / numSpots)]}
                disabled={true}
              >
              {noteNames[Math.floor(parents[i] / numSpots)]}
              </Draggable>
            ) : (
              <Droppable key={i + numIndices} id={i + numIndices} />
            )
          )}
        </DndContext>
      </div>
      <footer>
        <button className="cancelButton" onClick={cancel}>Clear</button>
        <button className="sendButton" onClick={sendSong}>Play Song</button>
      </footer>
    </>
  );
}

export default App;
