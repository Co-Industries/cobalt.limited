// TODO Translations could be loaded on the server (not important for a small app)
// TODO cookie expiration is set as session

import en from "./i18n/en.json";
import lv from "./i18n/lv.json";

import { createSignal, onMount } from 'solid-js';
export const [currentLanguage, setCurrentLanguage] = createSignal("en");
export const [language, setLanguage] = createSignal({...en});

const languages = ["en", "lv"]
const languageFiles = [en, lv];

export const changeLanguage = (newLanguage: string) => {
  console.log(newLanguage);
  let index = languages.findIndex((value: string) => {return value == newLanguage});
  setCurrentLanguage(newLanguage);
  setLanguage({...languageFiles[index]});
  document.cookie = `language=${index.toString()}`;
  console.log(language(), currentLanguage());
};

onMount(() => {
  console.log(Number(document.cookie.charAt(document.cookie.length - 1)));
  if (Number(document.cookie.charAt(document.cookie.length - 1)) < 0) {
      document.cookie = "language=0";
  }
  setTimeout(() => {
    changeLanguage(languages[Number(document.cookie.charAt(document.cookie.length - 1))]);
  }, 10);
});

