const DOMSelectors = {
    itemSearchForm: document.querySelector(".form"),
    itemSearchValue: document.querySelector(".name"),
    itemcontainer: document.querySelector(".itemcontainer"),
    h1: document.querySelector(".heading"),
    h2: document.querySelector("#subhead"),
    resetbutton: document.querySelector(".resetbutton"),
  };
  
  import "../CSS/styles.css"
  function cardCreator(meal) {
    const cardElement = document.createElement("div");
    cardElement.classList.add(
      "card",
  "bg-white",
  "border",
  "border-gray-400",
  "rounded-lg",
  "p-4",
  "shadow-md",
  "transition-transform",
  "duration-300",
  "ease-in-out",
  "hover:scale-105",
  "hover:shadow-lg",
  "w-80",
  "border-gray-300",
  "shadow-[0_4px_6px_rgba(0,0,0,0.1)]",
  "bg-[white]",
  "transition-all",
  "duration-[0.3s]",
  "ease-[ease-in-out]",
  "p-4",
  "rounded-xl",
  "border-2",
  "border-solid",
  "hover:translate-y-[-5px]",
  "hover:shadow-[0_6px_12px_rgba(0,0,0,0.1)]"
  
    );
  
    cardElement.innerHTML = `
      <img
        src="${meal.strMealThumb}"
        alt="${meal.strMeal}"
        class="border-b-gray-300 border-b-2 border-solid; rounded-t-lg w-full h-40 object-cover mb-4"
      />
      <h3
        tabindex="0"
        class="itemname text-xl font-semibold text-black mb-2"
      >
        ${meal.strMeal}
      </h3>
      <p tabindex="0" class="category text-black">Category: ${
        meal.strCategory || "Unknown"
      }</p>
      <p tabindex="0" class="text-black area text-">Cuisine: ${
        meal.strArea || "Unknown"
      }</p>
      <div class="dropdownMenu mt-4">
        <details>
          <summary class="font-semibold cursor-pointer text-black">
            View Recipe
          </summary>
          <p tabindex="0" class="instructions text-sm text-gray-600 mt-2">
            ${meal.strInstructions?.slice(0, 100) || "No instructions available"}
            ...
          </p>
        </details>
      </div>
    `;
  
    DOMSelectors.itemcontainer.appendChild(cardElement);
  }
  
  async function getMeals(query = "") {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          query
        )}`
      );
      if (!response.ok) {
        throw new Error("Error fetching meals.");
      }
      const data = await response.json();
      const meals = data.meals || [];
      DOMSelectors.itemcontainer.innerHTML = "";
      meals.forEach((meal) => cardCreator(meal));
      DOMSelectors.h1.innerHTML = meals.length
        ? "Search Results"
        : "No meals found.";
    } catch (error) {
      console.error(error);
      DOMSelectors.h1.innerHTML = "Error fetching meal data.";
    }
  }
  
  DOMSelectors.itemSearchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const input = DOMSelectors.itemSearchValue.value.trim();
    if (input) {
      getMeals(input);
    } else {
      DOMSelectors.h1.innerHTML = "Please enter a search term.";
    }
  });
  
  DOMSelectors.resetbutton.addEventListener("click", function () {
    DOMSelectors.h1.innerHTML = "MEAL API";
    DOMSelectors.itemcontainer.innerHTML = "";
    DOMSelectors.itemSearchValue.value = "";
  });
  