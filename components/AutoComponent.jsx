import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const AutoComponent = ({ options, selectedValue, setSelectedValue, labelKey, placeholder }) => {
    return (
        <Autocomplete
            disablePortal
            options={options}
            getOptionLabel={(option) => option[labelKey] || option}
            onChange={(event, newValue) => {
                const value =
                    newValue && typeof newValue === "object"
                        ? newValue.symptom
                        : newValue;
                setSelectedValue(value);
            }}
            inputValue={selectedValue || ""}
            onInputChange={(event, newInputValue) => {
                setSelectedValue(newInputValue);
            }}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} placeholder={placeholder} />
            )}
        />
    )
}

export default AutoComponent