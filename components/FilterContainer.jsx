// "use client";

// import { Divider } from "@tremor/react";
// import BarChartComponent from "./BarChartComponent";
// import BarListComponent from "./BarListComponent";
// import LineChartComponent from "./LineChartComponent";
// import { useState, useEffect } from "react";
// import AutoComponent from "./AutoComponent";
// import AccordionComponent from "./AccordionComponent";

// const FilterContainer = ({ filteredEntries, displayDate }) => {
//   const [triggers, setTriggers] = useState([]);
//   const [symptoms, setSymptoms] = useState([]);
//   const [selectedSymptom, setSelectedSymptom] = useState("");
//   const [selectedTrigger, setSelectedTrigger] = useState("");

//   useEffect(() => {
//     const fetchTriggers = async () => {
//       const response = await fetch("/api/stored/trigger");
//       const data = await response.json();
//       setTriggers(data);
//     };

//     fetchTriggers();
//   }, []);

//   useEffect(() => {
//     const fetchSymptoms = async () => {
//       const response = await fetch("/api/stored/symptom");
//       const data = await response.json();
//       setSymptoms(data);
//     };

//     fetchSymptoms();
//   }, []);

//   const filteredBySymptomEntries = selectedSymptom
//     ? filteredEntries.filter((entry) => entry.symptom === selectedSymptom)
//     : filteredEntries;

//   const filteredEntriesFinal = filteredBySymptomEntries.filter(
//     (entry) => !selectedTrigger || entry.trigger === selectedTrigger
//   );

"use client";

import { Divider } from "@tremor/react";
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
      <h1 className="pb-2 pl-4 pr-10 text-2xl font-bold border-b-2 w-fit">
        {displayDate}
      </h1>
      <div className="px-4 py-2 my-5 border-2 w-fit">
        <span className="font-bold font-inter">Total Entries: </span>
        <span>{filteredEntriesFinal.length}</span>
      </div>
      <Divider>Filter by Symptom or Trigger</Divider>
      <div className="flex items-center w-full justify-evenly">
        <div className="w-1/3">
          <AutoComponent
            options={symptoms}
            selectedValue={selectedSymptom}
            setSelectedValue={setSelectedSymptom}
            labelKey="symptom"
            placeholder="Select Symptom"
          />
        </div>
        <div className="w-1/3">
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

      <Divider>Number of Symptom and Trigger Entries</Divider>
      <div className="flex px-4">
        <BarChartComponent entries={filteredEntriesFinal} type="symptom" />
        <BarChartComponent entries={filteredEntriesFinal} type="trigger" />
      </div>
      <Divider>Most Common Triggers Per Symptom</Divider>
      <div className="px-4">
        <BarListComponent entries={filteredEntriesFinal} />
      </div>
      <Divider>Speard of Entries Over Time</Divider>
      <div className="px-4 pb-14">
        <LineChartComponent entries={filteredEntriesFinal} />
      </div>
      <Divider>See All Entries</Divider>
      <div className="px-4 pb-14">
        <AccordionComponent entries={filteredEntriesFinal} />
      </div>
    </div>
  );
};

export default FilterContainer;
