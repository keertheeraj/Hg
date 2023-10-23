import Select from 'react-select';
import { useState } from 'react';
import styles from "./Dropdown.module.css";

const Dropdown = () => {
  const results = [
    {
        "index_name": "01-project-managment",
        "sub_folder_name": "Case Studies",
        "user_email": "gopinathramesh@jmangroup.com",
        "user_name": "Gopinath Ramesh"
    },
    {
        "index_name": "01-project-managment",
        "sub_folder_name": "Document",
        "user_email": "gopinathramesh@jmangroup.com",
        "user_name": "Gopinath Ramesh"
    },
    {
        "index_name": "01-project-managment",
        "sub_folder_name": "Kick off",
        "user_email": "gopinathramesh@jmangroup.com",
        "user_name": "Gopinath Ramesh"
    },
    {
        "index_name": "01-project-managment",
        "sub_folder_name": "QA",
        "user_email": "gopinathramesh@jmangroup.com",
        "user_name": "Gopinath Ramesh"
    },
    {
        "index_name": "01-project-managment",
        "sub_folder_name": "SOW",
        "user_email": "gopinathramesh@jmangroup.com",
        "user_name": "Gopinath Ramesh"
    },
    {
        "index_name": "01-project-managment",
        "sub_folder_name": "Weekly Status",
        "user_email": "gopinathramesh@jmangroup.com",
        "user_name": "Gopinath Ramesh"
    },
    {
        "index_name": "02-shared",
        "sub_folder_name": "By JMAN",
        "user_email": "gopinathramesh@jmangroup.com",
        "user_name": "Gopinath Ramesh"
    },
    {
        "index_name": "02-shared",
        "sub_folder_name": "By Wipit",
        "user_email": "gopinathramesh@jmangroup.com",
        "user_name": "Gopinath Ramesh"
    },
    {
        "index_name": "test-chat-1",
        "sub_folder_name": "Test subfolder 1",
        "user_email": "gopinathramesh@jmangroup.com",
        "user_name": "Gopinath Ramesh"
    },
    {
        "index_name": "test-chat-1",
        "sub_folder_name": "Test subfolder2",
        "user_email": "gopinathramesh@jmangroup.com",
        "user_name": "Gopinath Ramesh"
    }
];

const options = results.map(item => ({
  value: item.index_name,
  label: `${item.index_name} / ${item.sub_folder_name}`  // Combine index_name and sub_folder_name emjdendd
}));

const [selectedSearchIndex, setSelectedSearchIndex] = useState(options[0].value);
const handleDropdownChange = (selectedOption:any) => {
    // Send a POST request to update the search index
    setSelectedSearchIndex(selectedOption.value);
    fetch("/update-search-index", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ index: selectedOption.value }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.message);
        })
        .catch((error) => {
            console.error("Error updating search index:", error);
        });
};

const customStyle = {
    dropdownIndicator: (base:any, state:any) => ({
      ...base,
      transition: "all .2s ease",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null
    })
  };
  
  return (
    <div>
         <Select
         options={options} isMulti openMenuOnFocus styles={customStyle}
         onChange={handleDropdownChange} 
         className={styles.dropdown}
         placeholder="select a knowledge base"
         menuPlacement="top"
      />
    </div>
  );
}

export default Dropdown;