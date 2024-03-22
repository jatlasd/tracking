import { BarList, Card } from '@tremor/react';

const BarListComponent = ({ entries }) => {
  const processData = (entries) => {
    const symptomsData = {};
    entries.forEach(entry => {
      const { symptom, trigger } = entry;
      if (!symptomsData[symptom]) {
        symptomsData[symptom] = {};
      }
      const triggerKey = trigger === "undefined" ? "Quick Add" : trigger;
      symptomsData[symptom][triggerKey] = (symptomsData[symptom][triggerKey] || 0) + 1;
    });
    return symptomsData;
  };

  const symptomsData = processData(entries);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
      {Object.entries(symptomsData).map(([symptom, triggers]) => (
        <Card key={symptom} className="max-w-lg mx-auto my-4">
          <h3 className="font-medium text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong">{symptom}</h3>
          <p className="flex items-center justify-between mt-4 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            <span>Trigger</span>
            <span>Occurrences</span>
          </p>
          <BarList
            data={Object.entries(triggers).map(([name, value]) => ({
              name: name === "undefined" ? "Quick Add" : name,
              value,
            }))}
            className="mt-2"
          />
        </Card>
      ))}
    </div>
  );
};

export default BarListComponent;
