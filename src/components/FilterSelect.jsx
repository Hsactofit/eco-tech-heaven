import Select from 'react-select';
import {useEffect} from "react";

const options = [
    { value: "Graphics Card", label: "Graphic Cards" },
    { value: "hardDrive", label: "Hard Drives" },
    { value: "ssd", label: "SSD" },
    { value: "ram", label: "RAM" },
    { value: "Other", label: "Other" }
];

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#0f3460",
        color: "white",
        borderRadius: "5px",
        border: "none",
        boxShadow: "none",
        width: "200px",
        height: "40px",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#0f3460" : "white",
        color: state.isSelected ? "white" : "#0f3460",
        "&:hover": {
        backgroundColor: "#0f3460",
        color: "white",
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "white",
    }),
};

const FilterSelect = ({setCategory, name}) => {
    const handleChange = (selectedOption)=> {
        setCategory(selectedOption);
    }
    return (
    <Select
    options={options}
    styles={customStyles}
    value={{label: name}}
    onChange={handleChange}
    />
    );
};

export default FilterSelect;
