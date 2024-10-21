/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toast";
import axios from "axios";
import Autocomplete from "./components/AutoComplete";
import Input from "./components/Input";

export default function Home() {

  const [distance, setDistance] = useState<string>();
  const [inputValue, setInputValue] = useState<string>();
  const [searchValue, setSearchValue] = useState<any>();
  const [filteredOptions, setFilteredOptions] = useState<Array<any>>([]);

  const [events, setEvents] = useState<Array<any>>([]);

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: inputValue,
            key: "AIzaSyD5SWtYvepl_a7bHPs9S2dUSCYVF6Whgmg",
          },
        }
      );

      if (response.data.status === "OK") {
        const _locations = response.data.results;
        setFilteredOptions(_locations);
      } else {
        setFilteredOptions([]);
        throw new Error("Error fetching cities");
      }
    } catch (err) {
      console.log(err);
      setFilteredOptions([]);
    }
  };

  const search = async() => {
    if(distance && searchValue){
      const payload = {
        location: searchValue.formatted_address,
        distance: distance
      };

      const response = await fetch("/api/events", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (response.status === 200) {
        const data = await response.json();
        const _data  = await JSON.parse(data.message);
        setEvents([..._data]);

      } else {
        console.log("error");
      }
    }
  };

  const save = async() => {
    if(searchValue){
      const payload = {
        address: searchValue.formatted_address,
      };

      const response = await fetch("/api/events/create", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (response.status === 200) {
        toast.success('successfully created!')
      } else {
        console.log("error");
      }
    }
  };

  useEffect(() => {
    fetchCities();
  }, [inputValue]);

  return (
    <main className="flex flex-col items-center p-10 gap-5">
      <h1>Hello, this is Event Search Endpoint Project.</h1>
      <div className="flex justify-center items-center gap-4">
        <Autocomplete
          options={filteredOptions}
          inputVal={inputValue}
          setInputValue={(v: string) => setInputValue(v)}
          value={searchValue}
          setValue={(item: any) => setSearchValue(item)}
        />
        <Input
          type="text"
          className="rounded-lg p-2 bg-stone-900 border border-gray-300"
          placeHolder="Type distance..."
          value={distance}
          onChange={(d: string) => setDistance(d)}
        />
        <button
          type="button"
          className=" bg-stone-900 rounded-xl p-2 border border-gray-300 hover:bg-green-800"
          onClick={() => search()}
        >
          Search
        </button>
        <button
          type="button"
          className=" bg-stone-900 rounded-xl p-2 border border-gray-300 hover:bg-green-800"
          onClick={() => save()}
        >
          Save
        </button>
      </div>
      <div>
        {events.map((e: any, index: number) => (
          <div key={index}><span>{index + 1}.</span>{e.entityId}</div>
        ))}
      </div>
    </main>
  );
}
