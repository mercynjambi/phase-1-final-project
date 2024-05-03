const searchMeal = async (e) => {
    e.preventDefault();
  
    // Select Elements
    const input = document.querySelector(".input");
    const title = document.querySelector(".title");
    const info = document.querySelector(".info");
    const img = document.querySelector(".img");
    const ingredientsOutput = document.querySelector(".ingredients");
  
    const showMealInfo = (meal) => {
      const { strMeal, strMealThumb, strInstructions } = meal;
      title.textContent = strMeal;
      img.style.backgroundImage = `url(${strMealThumb})`;
      info.textContent = strInstructions;
  
      const ingredients = [];
  
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients.push(
            `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
          );
        } else {
          break;
        }
      }
  
      const html = `
      <span>${ingredients
        .map((ing) => `<li class="ing">${ing}</li>`)
        .join("")}</span>
      `;
  
      ingredientsOutput.innerHTML = html;
    };
  
    const showAlert = () => {
      alert("Meal not found :(");
    };
  
    // Fetching  Data form the MEALDB API
    const fetchMealData = async (val) => {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`
      );
  
      const { meals } = await res.json();
      return meals;
    };
  
    // Getting the user value
    const val = input.value.trim();
  
    if (val) {
      const meals = await fetchMealData(val);
  
      if (!meals) {
        showAlert();
        return;
      }
  
      meals.forEach(showMealInfo);
    } else {
      alert("Please try searching for meal :)");
    }
  };
  
  const form = document.querySelector("form");
  form.addEventListener("submit", searchMeal);
  
  const magnifier = document.querySelector(".fa-solid");
  magnifier.addEventListener("click", searchMeal);

// Toggle between light and dark themes
const toggleTheme = () => {
  document.body.classList.toggle("dark-theme");
};

const themeToggleButton = document.querySelector(".theme-toggle-button");
themeToggleButton.addEventListener("click", toggleTheme);
 
// Select the input field
const inputField = document.querySelector(".input");

// Add an input event listener to the input field
inputField.addEventListener("input", async function(event) {

    await searchMeal(event);
});

