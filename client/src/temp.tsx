import React, { useState } from "react";

function temp() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      selected: false,
      title: "Categories",
      option: [
        {
          name: "Fine Art",
          key: "Fine-Art",
        },
        {
          name: "Constructivism",
          key: "Constructivism",
        },
        {
          name: "Cubism",
          key: "Cubism",
        },
        {
          name: "Pop Art",
          key: "Pop-Art",
        },
      ],
    },
    {
      id: 2,
      selected: false,
      title: "Tags",
      option: [
        {
          name: "Extra Large",
          key: "EXTRA_LARGE",
          selected: true,
        },
        {
          name: "Large",
          key: "LARGE",
          selected: false,
        },
        {
          name: "Medium",
          key: "MEDIUM",
          selected: false,
        },
        {
          name: "Small",
          key: "SMALL",
          selected: false,
        },
      ],
    },
    {
      id: 3,
      selected: false,
      title: "Colours",
      option: [
        {
          name: "Extra Large",
          key: "EXTRA_LARGE",
          selected: true,
        },
        {
          name: "Large",
          key: "LARGE",
          selected: false,
        },
        {
          name: "Medium",
          key: "MEDIUM",
          selected: false,
        },
        {
          name: "Small",
          key: "SMALL",
          selected: false,
        },
      ],
    },
    {
      id: 4,
      selected: false,
      title: "Sizes",
      option: [
        {
          name: "Extra Large",
          key: "EXTRA_LARGE",
          selected: true,
        },
        {
          name: "Large",
          key: "LARGE",
          selected: false,
        },
        {
          name: "Medium",
          key: "MEDIUM",
          selected: false,
        },
        {
          name: "Small",
          key: "SMALL",
          selected: false,
        },
      ],
    },
    {
      id: 5,
      selected: false,
      title: "Artists",
      option: [
        {
          name: "Extra Large",
          key: "EXTRA_LARGE",
          selected: true,
        },
        {
          name: "Large",
          key: "LARGE",
          selected: false,
        },
        {
          name: "Medium",
          key: "MEDIUM",
          selected: false,
        },
        {
          name: "Small",
          key: "SMALL",
          selected: false,
        },
      ],
    },
    {
      id: 6,
      selected: false,

      title: "Tags",
      option: [
        {
          name: "Extra Large",
          key: "EXTRA_LARGE",
          selected: true,
        },
        {
          name: "Large",
          key: "LARGE",
          selected: false,
        },
        {
          name: "Medium",
          key: "MEDIUM",
          selected: false,
        },
        {
          name: "Small",
          key: "SMALL",
          selected: false,
        },
      ],
    },
    {
      id: 7,
      selected: false,
      title: "Colours",
      option: [
        {
          name: "Extra Large",
          key: "EXTRA_LARGE",
          selected: true,
        },
        {
          name: "Large",
          key: "LARGE",
          selected: false,
        },
        {
          name: "Medium",
          key: "MEDIUM",
          selected: false,
        },
        {
          name: "Small",
          key: "SMALL",
          selected: false,
        },
      ],
    },
    {
      id: 8,
      selected: false,
      title: "Sizes",
      option: [
        {
          name: "Extra Large",
          key: "EXTRA_LARGE",
          selected: true,
        },
        {
          name: "Large",
          key: "LARGE",
          selected: false,
        },
        {
          name: "Medium",
          key: "MEDIUM",
          selected: false,
        },
        {
          name: "Small",
          key: "SMALL",
          selected: false,
        },
      ],
    },
    {
      id: 9,
      selected: false,
      title: "Artists",
      option: [
        {
          name: "Extra Large",
          key: "EXTRA_LARGE",
          selected: true,
        },
        {
          name: "Large",
          key: "LARGE",
          selected: false,
        },
        {
          name: "Medium",
          key: "MEDIUM",
          selected: false,
        },
        {
          name: "Small",
          key: "SMALL",
          selected: false,
        },
      ],
    },
  ]);

  const handleCategoryExpand = (id: number) => {
    setCategories(
      categories.map((cat) => {
        if (cat.id === id) {
          cat.selected = true;
        }
        return cat;
      })
    );
  };

  return (
    <div>
      {categories.map((cat) => (
        <div onClick={() => handleCategoryExpand(cat.id)}></div>
      ))}
    </div>
  );
}

export default temp;
