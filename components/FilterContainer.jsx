"use client";

import Divider from "@mui/material/Divider";
import BarChartComponent from "./BarChartComponent";
import BarListComponent from "./BarListComponent";
import LineChartComponent from "./LineChartComponent";
import { useState, useEffect, useMemo } from "react";
import AutoComponent from "./AutoComponent";
import AccordionComponent from "./AccordionComponent";

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const FilterContainer = ({ filteredEntries, displayDate }) => {
  const [triggers, setTriggers] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [selectedTrigger, setSelectedTrigger] = useState("");

  useEffect(() => {
    const fetchTriggersAndSymptoms = async () => {
      const [triggersData, symptomsData] = await Promise.all([
        fetchData("/api/stored/trigger"),
        fetchData("/api/stored/symptom"),
      ]);
      setTriggers(triggersData);
      setSymptoms(symptomsData);
    };

    fetchTriggersAndSymptoms();
  }, []);

  const filteredEntriesFinal = useMemo(() => {
    const filteredBySymptomEntries = selectedSymptom
      ? filteredEntries.filter((entry) => entry.symptom === selectedSymptom)
      : filteredEntries;

    return filteredBySymptomEntries.filter(
      (entry) => !selectedTrigger || entry.trigger === selectedTrigger
    );
  }, [filteredEntries, selectedSymptom, selectedTrigger]);

  return (
    <div className="flex flex-col w-full max-w-full mt-10">
      <h1 className="pb-2 pl-4 pr-10 text-2xl font-bold border-b-2 border-b-dark-blue-2 text-dark-blue-1 w-fit">
        {displayDate}
      </h1>
      <div className="px-4 py-2 my-5 w-fit">
        <span className="font-bold font-inter text-dark-blue-1">
          Total Entries:{" "}
        </span>
        <span>{filteredEntriesFinal.length}</span>
      </div>
      <Divider className="pt-5 pb-10 text-dark-blue-2" sx={{}}>
        Filter by Symptom or Trigger
      </Divider>
      <div className="flex flex-col items-center w-full md:flex-row justify-evenly">
        <div className="w-full mt-4 md:w-1/3 md:mt-0">
          <AutoComponent
            options={symptoms}
            selectedValue={selectedSymptom}
            setSelectedValue={setSelectedSymptom}
            labelKey="symptom"
            placeholder="Select Symptom"
          />
        </div>
        <div className="w-full mt-4 md:w-1/3 md:mt-0">
          <AutoComponent
            options={triggers}
            selectedValue={selectedTrigger}
            setSelectedValue={setSelectedTrigger}
            labelKey="trigger"
            placeholder="Select Trigger"
            className="flex-1"
          />
        </div>
      </div>

      <Divider className="py-10 text-dark-blue-2" sx={{}}>
        Number of Symptom and Trigger Entries
      </Divider>
      <div className="flex px-4 bg-white rounded-xl py-2">
        <BarChartComponent entries={filteredEntriesFinal} type="symptom" />
        <BarChartComponent entries={filteredEntriesFinal} type="trigger" />
      </div>
      <Divider className="py-10 text-dark-blue-2" sx={{}}>
        Most Common Triggers Per Symptom
      </Divider>
      <div className="px-4">
        <BarListComponent entries={filteredEntriesFinal} />
      </div>
      <Divider className="py-10 text-dark-blue-2" sx={{}}>
        Spread of Entries Over Time
      </Divider>
      <div className="px-4 pb-14 bg-white rounded-xl">
        <LineChartComponent entries={filteredEntriesFinal} />
      </div>
      <Divider className="py-10 text-dark-blue-2" sx={{}}>
        See All Entries
      </Divider>
      <div className="px-4 pb-14">
        <AccordionComponent entries={filteredEntriesFinal} />
      </div>
    </div>
  );
};

export default FilterContainer;
