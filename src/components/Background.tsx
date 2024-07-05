import { createEffect, createSignal, onCleanup, For } from "solid-js";
import { createStore } from "solid-js/store";
import { animate } from "motion";
import { createMousePosition } from "@solid-primitives/mouse";
import "./Background.css";

interface GridElement {
  id: string;
  timestamp: number;
  duration: number;
  active: boolean;
}

interface GridIndex {
  [key: string]: number;
}
//
//const [gridStore, setGridStore] = createStore({
//  elements: [] as any
//});
//
let gridElements = [] as GridElement[];
let gridUnactiveElements = [] as number[];
let gridIndex: GridIndex = {};

const [runtime, updateRuntime] = createSignal(0),
  timer = setInterval(() => updateRuntime(runtime() + 1), 1000);
onCleanup(() => clearInterval(timer));

createEffect(() => {
  const event = runtime();
  const time = Date.now();
  for (let key in gridIndex) {
    const index = gridIndex[key];
    const gridElement = gridElements[index];
    //console.log(index);
    if (gridElement.active) {
      if (time > gridElement.timestamp) {
        gridElement.active = false;
        animate(gridElement.id, { scale: 0 }, { duration: 1 });
      }
    } else {
      gridUnactiveElements.push(index);
      gridElement.active = true;
      delete gridIndex[key];
    }
  }
  //console.log(gridUnactiveElements);
});

const gridID = ["a", "b", "c"];
let prevposX: number,
  prevposY: number,
  gridX: number,
  gridY: number,
  posX: number,
  posY: number,
  posXoffset: number,
  posYoffset: number;

const createGridElement = (event: MouseEvent) => {
  gridX = Math.floor(event.x / 32);
  gridY = Math.floor(event.y / 32);

  const position = gridX + "-" + gridY;
  if (gridIndex[position] != undefined) {
    return;
  }

  posX = gridX * 32;
  posY = gridY * 32;
  if (gridUnactiveElements.length == 0) {
    const newGridElement = document.createElement("div");
    animate(newGridElement, { x: posX, y: posY }, { duration: 0 });
    newGridElement.classList.add("grid-box");
    newGridElement.id = "g" + gridElements.length;

    const newGridElementData: GridElement = {
      id: "#g" + gridElements.length,
      timestamp: Date.now(),
      duration: 1000,
      active: true,
    };

    gridIndex[position] = gridElements.length;
    gridElements.push(newGridElementData);

    document.querySelector<HTMLElement>(".grid")!.appendChild(newGridElement);

    //animate("#" + newGridData.id, {scale: 0}, {duration: 1});
    //console.log(gridIndex);
  } else {
    const gridElement = gridElements[gridUnactiveElements[0]];
    animate(gridElement.id, { x: posX, y: posY, scale: 1 }, { duration: 0 });
    const position = gridX + "-" + gridY;
    gridIndex[position] = gridUnactiveElements[0];
    gridUnactiveElements.shift();
  }
  //console.log(gridElements);
};

export default function Background() {
  const pos = createMousePosition();
  createEffect(() => {
    posX = Math.floor(pos.x / 32) * 32;
    posY = Math.floor(pos.y / 32) * 32;
    if (prevposX != posX || prevposY != posY) {
      animate(
        "#bb",
        { backgroundColor: ["transparent", "rgb(255, 255, 255)"] },
        { duration: 0.5 }
      );
      let content = document
        .querySelector<HTMLElement>("#bb")!
        .querySelector(".cursor-box-content")!;
      animate(content, { opacity: [1, 0.4] }, { duration: 0.7 });
    }
    for (let x = -1; x < 2; x++) {
      posXoffset = x * 32;
      for (let y = -1; y < 2; y++) {
        posYoffset = y * 32;
        let ID = `#${gridID[x + 1]}${gridID[y + 1]}`;
        if (prevposX != posX || prevposY != posY) {
          animate(
            ID,
            { x: posX + posXoffset, y: posY + posYoffset },
            { duration: 0 }
          );
        }
        let box = document.querySelector<HTMLElement>(ID)!; //? use ! for null
        const rect = box.getBoundingClientRect();
        const relX = pos.x - rect.left;
        const relY = pos.y - rect.top;
        box.style.setProperty("--mouse-x", `${relX}px`);
        box.style.setProperty("--mouse-y", `${relY}px`);
      }
    }
    prevposX = posX;
    prevposY = posY;
  });
  return (
    <div class="background" onClick={createGridElement}>
      <div class="cursor">
        <For each={gridID}>
          {(x) => (
            <For each={gridID}>
              {(y) => (
                <div id={`${x}${y}`} class="cursor-box">
                  <div class="cursor-box-content" />
                </div>
              )}
            </For>
          )}
        </For>
      </div>
      <div class="grid"></div>
    </div>
  );
}
