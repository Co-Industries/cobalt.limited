import { createEffect, For } from "solid-js";
import { animate } from "motion";
import { createMousePosition } from "@solid-primitives/mouse";
import "./Background.css";

const gridID = ["a", "b", "c", "d", "e"];
let prevposX: number, prevposY: number, posX: number, posY: number, posXoffset: number, posYoffset: number;

export default function Background() {
  const pos = createMousePosition();
  createEffect(() => {
    posX = Math.floor(pos.x / 32) * 32;
    posY = Math.floor(pos.y / 32) * 32;
    if (prevposX != posX || prevposY != posY) {
        animate("#cc", {backgroundColor: ["transparent", "rgb(255, 255, 255)"]}, {duration: 0.5});
        let content = document.querySelector<HTMLElement>("#cc")!.querySelector(".box-content")!;
        animate(content, {opacity: [1, 0.4]}, {duration: 0.7});
    }
    for(let x = -2; x < 3; x++)
        {
            posXoffset = x * 32;
            for (let y = -2; y < 3; y++)
                {
                    posYoffset = y * 32;
                    let ID = `#${gridID[x + 2]}${gridID[y + 2]}`;
                    if (prevposX != posX || prevposY != posY) {
                        animate(ID, {x: posX + posXoffset, y: posY + posYoffset}, {duration: 0});
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
    <div class="background">
<For each={gridID}>
    {(x) => (
  <For each={gridID}>
    {(y) => (
          <div id={`${x}${y}`} class="box">
            <div class="box-content"/>
          </div>
    )}
    </For>
)}
  </For>
  </div>
);
}
