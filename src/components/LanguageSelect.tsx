import { Select } from "@kobalte/core/select";
import { VsChevronDown } from 'solid-icons/vs'

import { changeLanguage, currentLanguage, setCurrentLanguage } from './i18n';

import "./LangaugeSelect.css";

export default function LanguageSelect() {
  const handleChange = (value: string) => {
    changeLanguage(value);
  };

  return (
    <Select
      disallowEmptySelection
      style="pointer-events: auto; margin: 16px"
      value={currentLanguage()}
      onChange={handleChange}
      options={["en", "lv"]}
      placeholder=""
      itemComponent={props => (
        <Select.Item item={props.item} class="select__item">
          <Select.ItemLabel>{props.item.rawValue}</Select.ItemLabel>
        </Select.Item>
      )}
    >
      <Select.Trigger class="select__trigger" aria-label="Fruit">
        <Select.Value<string> class="select__value">
          {state => state.selectedOption()}
        </Select.Value>
        <Select.Icon class="select__icon">
          <VsChevronDown/>
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content class="select__content">
          <Select.Listbox class="select__listbox" />
        </Select.Content>
      </Select.Portal>
    </Select>
  );
}