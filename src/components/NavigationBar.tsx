import { NavigationMenu, Orientation } from "@kobalte/core/navigation-menu";
import { Link } from "@kobalte/core/link";

import { VsChevronDown } from 'solid-icons/vs'
import { createSignal } from "solid-js";

import LanguageSelect from "./LanguageSelect";
import { language } from "./i18n";
import "./NavigationBar.css";

const updateMenuOrigin = (value: string | undefined | null) => {
  setTimeout(() => {
  if (value)
  {
    try {
      const rect = document.querySelector(".navigation-menu__viewport")!.getBoundingClientRect();
      const app = document.querySelector<HTMLElement>("#app")!;
      app.style.setProperty("--nbx", `${rect.x}`);
      app.style.setProperty("--nby", `${rect.y}`);
    } catch {
    console.warn("[navigation-bar]: menu-origin update failed");
    updateMenuOrigin(value);
    }
  }
}, 1000)
};

export default function NavigationBar() {
  const [orientation, setOrientation] = createSignal<Orientation>("horizontal");
  return (
      <>
      <div class="navigation-bar">
      <Link class="logo" href="https://cobalt.limited">
      <img src="/icons/logo.svg" style="margin: 16px; height: 36px"/>
      </Link>
      <NavigationMenu fitViewport onValueChange={updateMenuOrigin} class="navigation-menu__root" orientation={orientation()}>
      <NavigationMenu.Menu>
          <NavigationMenu.Trigger class="navigation-menu__trigger">
            {language().NB1}{" "}
            <NavigationMenu.Icon class="navigation-menu__trigger-indicator">
              <VsChevronDown />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Portal>
            <NavigationMenu.Content class="navigation-menu__content content-1">
              <NavigationMenu.Item
                class="navigation-menu__item-callout"
                href="https://cobalt.limited"
              >
                <img
                  src="/icons/logo.svg"
                  role="presentation"
                  alt=""
                />
                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                  Cobalt Industries Ltd.
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                {language().NB1C1}
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
              <article data-glow />
              <NavigationMenu.Item
                class="navigation-menu__item"
                href="https://cobalt.limited/RMDLab"
                style="width: 100%; grid-column: span 2"
              >
                <img src="/icons/rmdlab.png" style="position: absolute; margin: 13px; width: 16px;"/>
                <NavigationMenu.ItemLabel style="color: #4D9BE6; left: 20px; position: relative; font-family: BauhausStd" class="navigation-menu__item-label">
                  RMDLab
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                  {language().NB1C2}
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
              <NavigationMenu.Item
                class="navigation-menu__item"
                href="https://cobalt.limited/about"
              >
                
                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                  {language().NB1C3}
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                {language().NB1C4}
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
              <NavigationMenu.Item
                class="navigation-menu__item"
                href="https://github.com/Co-Industries"
              >
                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                  GitHub
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                  {language().NB1C5}
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
            </NavigationMenu.Content>
          </NavigationMenu.Portal>
        </NavigationMenu.Menu>
        <NavigationMenu.Menu>
          <NavigationMenu.Trigger class="navigation-menu__trigger">
            {language().NB2}{" "}
            <NavigationMenu.Icon class="navigation-menu__trigger-indicator">
              <VsChevronDown />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Portal>
            <NavigationMenu.Content class="navigation-menu__content content-2">
              <NavigationMenu.Item
                class="navigation-menu__item"
                href="https://cobalt.limited/prosthetics"
              >
                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                  Advanced Prosthetics
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                Trenscending the limits of human flesh with our advanced prosthetics, designed to forge a new breed of humanity.
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
              <article data-glow />
              <NavigationMenu.Item
                class="navigation-menu__item"
                href="https://cobalt.limited/robotics"
              >
                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                Robotics
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                Our robots are more than automatons; they are tireless enforcers.
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
              <NavigationMenu.Item
                class="navigation-menu__item"
                href="https://cobalt.limited/neurology"
              >
                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                Neural Interfaces
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                  Unstyled and compatible with any styling solution.
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
              <NavigationMenu.Item
                class="navigation-menu__item"
                href="https://cobalt.limited/audio"
              >
                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                Sonic Manipulation Systems
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                Music is not merely entertainment—it is a tool of influence and control. 
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
              <NavigationMenu.Item
                class="navigation-menu__item"
                href="https://cobalt.limited/products"
              >
                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                  Product Demos
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                Enter the realm of Cobalt Industries' power with our interactive product demos.
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
              <NavigationMenu.Item
                class="navigation-menu__item"
                href="https://cobalt.limited/research"
              >
                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                  Research Papers
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                  We are the vanguard of a new era of knowledge and power.
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
            </NavigationMenu.Content>
          </NavigationMenu.Portal>
        </NavigationMenu.Menu>
        <NavigationMenu.Menu>
          <NavigationMenu.Trigger class="navigation-menu__trigger">
            {language().NB3}{" "}
            <NavigationMenu.Icon class="navigation-menu__trigger-indicator">
              <VsChevronDown />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Portal>
            <NavigationMenu.Content class="navigation-menu__content content-2">
              <NavigationMenu.Item
                class="navigation-menu__item"
                href="https://cobalt.limited/prosthetics"
              >
                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                Bomboclat TikTok
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                Turkish quandale never fails to alpha monday left me broken mogged 🗿🍷
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
              <article data-glow />
              <NavigationMenu.Item
                class="navigation-menu__item"
                href="https://cobalt.limited/robotics"
              >
                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                Skibidi Freddy Fazbear
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                Womp womp bombastic side eye fire in the hole.
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
              <NavigationMenu.Item
                class="navigation-menu__item"
                href="https://cobalt.limited/neurology"
              >
                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                🤣🤣🤣
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                Oi oi oi water on the hill 🍷🗿.
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
              <NavigationMenu.Item
                class="navigation-menu__item"
                href="https://cobalt.limited/products"
              >
                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                Blud lives in water on the hill rizzing up
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                Lil blud never fails to sturdy sturdy. 
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
              <NavigationMenu.Item
                class="navigation-menu__item"
                href="https://cobalt.limited/products"
              >
                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                Mogwarts
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                Patrick bateman thinks he gooning edge 💀
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
              <NavigationMenu.Item
                class="navigation-menu__item"
                href="https://cobalt.limited/research"
              >
                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                💀
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                  Lil blud thinks he water on the hill water on the hill 🍷🗿.
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
            </NavigationMenu.Content>
          </NavigationMenu.Portal>
        </NavigationMenu.Menu>
        <NavigationMenu.Menu>
          <NavigationMenu.Trigger class="navigation-menu__trigger">
            {language().NB4}{" "}
            <NavigationMenu.Icon class="navigation-menu__trigger-indicator">
              <VsChevronDown />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Portal>
            <NavigationMenu.Content class="navigation-menu__content content-2">
              <NavigationMenu.Item
                class="navigation-menu__item"
                href="https://kobalte.dev/docs/core/overview/introduction"
              >
                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                  Ohio
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                Lil bro is not mewing.
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
              <article data-glow />
              <NavigationMenu.Item
                class="navigation-menu__item"
                href="https://kobalte.dev/docs/core/overview/getting-started"
              >
                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                Glazing
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                prime fortnite.
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
              <NavigationMenu.Item
                class="navigation-menu__item"
                href="https://kobalte.dev/docs/core/overview/styling"
              >
                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                Level 6 gyatt
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                Yapper.
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
              <NavigationMenu.Item
                class="navigation-menu__item"
                href="https://kobalte.dev/docs/core/overview/animation"
              >
                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                Edge 
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                Monday left me broken drake 🗿🍷.
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
              <NavigationMenu.Item
                class="navigation-menu__item"
                href="https://cobalt.limited/products"
              >
                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                did you pray toda
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                patrick bateman
                .
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
              <NavigationMenu.Item
                class="navigation-menu__item"
                href="https://cobalt.limited/research"
              >
                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                a blue tie kid
                </NavigationMenu.ItemLabel>
                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                brainrot poppy playtime like busting it down.
                </NavigationMenu.ItemDescription>
              </NavigationMenu.Item>
            </NavigationMenu.Content>
          </NavigationMenu.Portal>
        </NavigationMenu.Menu>
        <NavigationMenu.Viewport class="navigation-menu__viewport">
          <NavigationMenu.Arrow class="navigation-menu__arrow" />
        </NavigationMenu.Viewport>
      </NavigationMenu>
      
      <LanguageSelect/>
      </div>
      </>
    );
}
