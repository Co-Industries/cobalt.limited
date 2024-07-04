import { createEffect, For } from "solid-js";
import { createStore } from "solid-js/store";
import { animate } from "motion";
import { createMousePosition } from "@solid-primitives/mouse";
import "./Background.css";

interface Grid {
  id: string;
  gx: number;
  gy: number;
  x: number;
  y: number;
  timestamp: number;
  cooldown: 1000;
}

const [gridStore, setGridStore] = createStore({
  grid: [] as any,
}); 

const gridID = ["a", "b", "c"];
let prevposX: number,
  prevposY: number,
  posX: number,
  posY: number,
  posXoffset: number,
  posYoffset: number;

const createGridElement = (event: MouseEvent) => {
  const newGridElement = document.createElement("div");
  const gridX = Math.floor(event.x / 32);
  const gridY = Math.floor(event.y / 32);
  const posX = gridX * 32;
  const posY = gridY * 32;
  console.log(event.x, event.y);
  animate(
    newGridElement,
    { x: posX, y: posY},
    { duration: 0 }
  );
  newGridElement.classList.add("grid-box");
  newGridElement.id = "g" + gridStore.grid.length;

  const newGridData: Grid = {
    id: "g" + gridStore.grid.length,
    gx: gridX,
    gy: gridY,
    x: posX,
    y: posY,
    timestamp: Date.now(),
    cooldown: 1000
  };

  setGridStore("grid", (currentGrid) => [...currentGrid, newGridData])
  document.querySelector<HTMLElement>(".grid")!.appendChild(newGridElement);
  animate("#" + newGridData.id, {scale: 0}, {duration: 1});

  console.log(gridStore.grid);
}

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
      <div class="grid">
      </div>
    </div>
  );
}
