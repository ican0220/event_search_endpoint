/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";

interface AutocompletePops{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Array<any> | [],
  inputVal: string | undefined,
  setInputValue: (v: string) => void,
  value: any,
  setValue: (i :any) => void
};

const Autocomplete: React.FC<AutocompletePops> = ({options, inputVal, setInputValue, setValue}) => {
 
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const filtered = options.filter((option: any) =>
        option.formatted_address.toLowerCase().includes(value.toLowerCase())
      );
      console.log(filtered, 'filtered');
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  };

  const handleOptionClick = (option: any) => {
    setInputValue(option.formatted_address);
    setValue(option);
    setFilteredOptions([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={inputVal}
        onChange={handleChange}
        className="border border-gray-300 bg-stone-900 rounded-lg p-2 w-full"
        placeholder="Type a location..."
      />
      {filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-green-900 border border-gray-300 rounded-lg mt-1 max-h-60 overflow-auto">
          {filteredOptions.map((option: any, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className="p-2 hover:bg-green-800 cursor-pointer"
            >
              {option.formatted_address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
