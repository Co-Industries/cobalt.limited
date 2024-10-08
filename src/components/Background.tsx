import { createEffect, createSignal, onCleanup, onMount, For } from "solid-js";
import { animate } from "motion";
import {
  createMousePosition,
  MousePositionInside,
  makeMouseInsideListener
} from "@solid-primitives/mouse";
import "./Background.css";

interface GridElement {
  id: string;
  tick: number;
}

interface GridIndex {
  [key: string]: number;
}

interface GridActiveElement {
  x: number;
  y: number;
}

interface GridUnactiveElement {
  position: string;
}

let gridElements = [] as GridElement[];
let gridUnactiveElements = [] as GridUnactiveElement[];
let gridUnusedElements = [] as number[];
let gridUnusedElementsTick = [] as number[];
let gridActiveElements = [] as GridActiveElement[]; // ! Probably should use Sets instead of x, y arrays;
let checkedNeighbors = new Set<string>();
let gridIndex: GridIndex = {};

let tickspeed = 1000;
let tickspeedSeconds = tickspeed / 1000;
let gridSize = 16;

let insideBackground: boolean;
let prevInsideBackground: boolean;

const [runtime, updateRuntime] = createSignal(0),
  timer = setInterval(() => updateRuntime(runtime() + 1), tickspeed);

  onMount(() => {
  const listener = makeMouseInsideListener(document.querySelector<HTMLElement>(".background")!, inside => {insideBackground = inside}, { touch: true });
});

function checkNeighbors(position: string) {
  let neighborSize = checkedNeighbors.size;
  checkedNeighbors.add(position);
  if (neighborSize == checkedNeighbors.size) {
    return
  }
  
  let neighbors = 0;
  let [gx, gy] = position.split("/");
  let nx: number, ny: number;
  for (let xoffset = -1; xoffset < 2; xoffset++) {
    nx = Number(gx) + xoffset;
    for (let yoffset = -1; yoffset < 2; yoffset++) {
      ny = Number(gy) + yoffset;
      let nposition = nx + "/" + ny;
      if (gridIndex[nposition] == gridIndex[position]) {
        continue;
      }
      if (gridIndex[nx + "/" + ny] != undefined) {
        neighbors++;
      } else if (gridIndex[position] != undefined) {
        checkNeighbors(nx + "/" + ny);
      }
    }
  }
  if (gridIndex[position] == undefined) {
    if (neighbors == 3) {
      gridActiveElements.push({x: Number(gx), y: Number(gy)})
    }
  } else {
    //console.log(neighbors);
    if (neighbors == 2 || neighbors == 3) {
      return true;
    }
  }
  return false;
}

function activateGridElements() {
  for (let index in gridActiveElements) {
    const gridActiveElement = gridActiveElements[index];
    activateGridElement(gridActiveElement.x, gridActiveElement.y);
  }
}

function unactivateGridElements() {
  for (let index in gridUnactiveElements) {
    const position = gridUnactiveElements[index].position;
    const gridElement = gridElements[gridIndex[position]];
    gridUnusedElements.push(gridIndex[position]);
    gridUnusedElementsTick.push(runtime());
    delete gridIndex[position];
    animate(gridElement.id, { scale: 0 }, { duration: tickspeedSeconds });
  }
}

createEffect(() => {
  const tick = runtime();
  gridActiveElements.length = 0;
  gridUnactiveElements.length = 0;
  checkedNeighbors.clear();
  for (let position in gridIndex) {
    const index = gridIndex[position];
    const gridElement = gridElements[index];
      if (tick > gridElement.tick && !checkNeighbors(position)) {
        gridUnactiveElements.push({position: position});
      }
  }
  activateGridElements();
  unactivateGridElements();
});

const gridID = ["a", "b", "c"];
let prevpx: number,
  prevpy: number,
  gx: number,
  gy: number,
  px: number,
  py: number,
  xoffset: number,
  yoffset: number;

const activateGridElement = (gx: number, gy: number) => {
  const position = gx + "/" + gy;
  px = gx * gridSize;
  py = gy * gridSize;

  if (gridUnusedElements.length == 0) {
    const newGridElement = document.createElement("div");
    animate(newGridElement, { x: px, y: py, scale: 0 }, { duration: 0 });
    animate(newGridElement, {scale: 1}, {duration: tickspeedSeconds });
    newGridElement.classList.add("grid-box");
    newGridElement.id = "g" + gridElements.length;

    const newGridElementData: GridElement = {
      id: "#g" + gridElements.length,
      tick: runtime(),
    };

    gridIndex[position] = gridElements.length;
    gridElements.push(newGridElementData);

    document.querySelector<HTMLElement>(".grid")!.appendChild(newGridElement);
  } else {
    const gridElement = gridElements[gridUnusedElements[0]];
    animate(gridElement.id, { x: px, y: py, scale: 0}, { duration: 0 });
    animate(gridElement.id, {scale: 1}, {duration: tickspeedSeconds});
    gridElement.tick = runtime();
    const position = gx + "/" + gy;
    gridIndex[position] = gridUnusedElements[0];
    gridUnusedElements.shift();  
    gridUnusedElementsTick.shift();
  }
}

const createGridElement = (pos: MousePositionInside) => {
  gx = Math.floor(pos.x / gridSize);
  gy = Math.floor(pos.y / gridSize);

  const position = gx + "/" + gy;
  if (gridIndex[position] != undefined) {
    return;
  }

  px = gx * gridSize;
  py = gy * gridSize;
  if (gridUnusedElements.length == 0 || runtime() == gridUnusedElementsTick[0]) {
    const newGridElement = document.createElement("div");
    animate(newGridElement, { x: px, y: py }, { duration: 0 });
    newGridElement.classList.add("grid-box");
    newGridElement.id = "g" + gridElements.length;

    const newGridElementData: GridElement = {
      id: "#g" + gridElements.length,
      tick: runtime(),
    };

    gridIndex[position] = gridElements.length;
    gridElements.push(newGridElementData);

    document.querySelector<HTMLElement>(".grid")!.appendChild(newGridElement);
  } else {
    const gridElement = gridElements[gridUnusedElements[0]];
    animate(gridElement.id, { x: px, y: py, scale: 1 }, { duration: 0 });
    gridElement.tick = runtime();
    const position = gx + "/" + gy;
    gridIndex[position] = gridUnusedElements[0];
    gridUnusedElements.shift();
    gridUnusedElementsTick.shift();
  }
};

export default function Background() {
  const pos = createMousePosition();
  let mouseActive = false;
  createEffect(() => {
    if (mouseActive) createGridElement(pos);
    const app = document.querySelector<HTMLElement>("#app")!;
    app.style.setProperty("--x", `${pos.x}`);
    app.style.setProperty("--y", `${pos.y}`);
    app.style.setProperty("--xp", `${pos.x / window.innerWidth}`);
    app.style.setProperty("--xy", `${pos.y / window.innerHeight}`);

    if (prevInsideBackground != insideBackground)
    {
      animate(document.querySelector(".cursor")!, {opacity: +!!insideBackground}, {duration: 0.7}); // ? +!! some magic that change true / false to 1 or 0
    }
    prevInsideBackground = insideBackground;
    
    px = Math.floor(pos.x / gridSize) * gridSize;
    py = Math.floor(pos.y / gridSize) * gridSize;
    
    if (prevpx != px || prevpy != py) {
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
      xoffset = x * gridSize;
      for (let y = -1; y < 2; y++) {
        yoffset = y * gridSize;
        let ID = `#${gridID[x + 1]}${gridID[y + 1]}`;
        if (prevpx != px || prevpy != py) {
          animate(
            ID,
            { x: px + xoffset, y: py + yoffset },
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
    prevpx = px;
    prevpy = py;
  });
  return (
    <>
    <div
      class="background"
      onclick={() => createGridElement(pos)}
      onmousedown={() => (mouseActive = true)}
      onmouseup={() => (mouseActive = false)}
    >
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
    </>
  );
}
