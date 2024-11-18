import Select from "react-select";

const options = [
    { value: "Graphics Card", label: "Graphic Cards" },
    { value: "hardDrive", label: "Hard Drives" },
    { value: "ssd", label: "SSD" },
    { value: "ram", label: "RAM" },
    { value: "Other", label: "Other" },
];

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: "#f9f9f9",
        color: "#0f3460",
        borderRadius: "8px",
        border: state.isFocused ? "2px solid #0f3460" : "2px solid #ddd",
        boxShadow: state.isFocused ? "0px 4px 10px rgba(0, 0, 0, 0.1)" : "none",
        padding: "5px",
        width: "100%",
        maxWidth: "300px",
        transition: "all 0.3s ease",
        cursor: "pointer",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? "#16213e" : "white",
        color: state.isFocused ? "white" : "#0f3460",
        fontWeight: state.isSelected ? "bold" : "normal",
        padding: "10px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#16213e",
            color: "white",
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "#0f3460",
        fontWeight: "bold",
        fontSize: "16px",
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        marginTop: "5px",
    }),
    placeholder: (provided) => ({
        ...provided,
        color: "#aaa",
        fontStyle: "italic",
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: "#0f3460",
        "&:hover": {
            color: "#16213e",
        },
    }),
    indicatorSeparator: () => ({
        display: "none",
    }),
};

const FilterSelect = ({ setCategory, name }) => {
    const handleChange = (selectedOption) => {
        setCategory(selectedOption);
    };

    return (
        <div className="filter-select-wrapper">
            <Select
                options={options}
                styles={customStyles}
                value={{ label: name }}
                onChange={handleChange}
                placeholder="Select a category"
            />
        </div>
    );
};

export default FilterSelect;
