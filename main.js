//Customer order a meal and if empty input enter then show a error message
const menuOrder = () => {
    let menu = document.getElementById('search-meal-field').value;
    if (menu == "") {
        errorControl2();    // error function call
        return;             // use return for blocking next step.
    }
    mealName(menu);
    document.getElementById('search-meal-field').value = "";  // When search button click input filled will empty.

    // To display footer section 
    setTimeout(() => {
        document.getElementById('footer-section').style.display = "block";
    }, 40000);      // delay to load footer section

}

const mealName = (mealName) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)   // fetch API to load data
        .then(response => response.json())  // get JSON form data
        .then(data => {
            if (data.meals == null) {       // If menu item is not available then show an error message using function call.
                errorControl();
                return;
            }

            document.getElementById('display-meal').innerHTML = "";     // To clear previous meal item.

            const showMeal = document.getElementById('display-meal');
            const value = data.meals;

            value.forEach(menuItem => {
                const mealItem = document.createElement('div');     // Create a div
                mealItem.className = 'col';     // generate a class into above create div. and below use template literal.
                const menuInfo = `
                    <div id="${menuItem.idMeal}" onclick = 'MealDetails("${menuItem.idMeal}")' class="card meal-item">
                        <img src="${menuItem.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <p class="card-text meal-name text-center text-uppercase">${menuItem.strMeal}</p>
                        </div>
                    </div>
                `;          // Another function call in the above and pass a menuID.

                mealItem.innerHTML = menuInfo;
                showMeal.appendChild(mealItem);
            });
        })
        .catch(error => displayError('Something Went wrong. Please try again later!')); // If error occur when loading data, 
}                                                                                       // then show an error message.

const MealDetails = (id) => {
    document.getElementById('display-details').style.display = "block"; // display display-details section which was hide using css
    document.getElementById("display-meal").style.opacity = "0.5";  // make opacity 0.5 for just focus display details section.

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const displayDetails = document.getElementById('display-details-info');

            document.getElementById('show-img').src = data.meals[0].strMealThumb;   // Image show in specific menu item

            document.getElementById('food-name').innerText = data.meals[0].strMeal; // display food name

            document.getElementById('food-area').innerText = data.meals[0].strArea;     // display menu origin

            document.getElementById('making-process').innerText = data.meals[0].strInstructions;    // Display making process.

            countIngredient = 0;
            for (i = 1; i <= 20; i++) {         // Given maximum 20 ingredients individual meal item.
                if ((data['meals']['0'][`strIngredient${i}`] == "") || (data['meals']['0'][`strMeasure${i}`] == "")) {     
                    break;      // if ingredient field empty then break and we get total given ingredient number.
                }
                countIngredient++;              // Every time 'countIngredient' increment by 1 until terminating the loop.
            }

            const ingredientContainer = document.getElementById('ingredient-container');
            for (j = 1; j <= countIngredient; j++) {
                const li = document.createElement('li');     // Create new 'li'.
                li.innerHTML = '<i class="fas fa-check-square"></i> ' + data['meals']['0'][`strMeasure${j}`] + ' ' + data['meals']['0'][`strIngredient${j}`];                  // Assign ingredient value into li element.
                ingredientContainer.appendChild(li);         // Append new child 'li'.

                document.getElementById('close-btn').addEventListener('click', function () {
                    li.innerHTML = "";      // use to remove ingredients after close.
                })
            }
        })
        .catch(error => displayError('Something Went wrong. Please try again later!!'));    // If error occur when loading data,
}                                                                                           // then show an error message.



const closeDisplayDetails = () => {   // Arrow function to hide display details section and make display meal section's opacity 1.
    document.getElementById('display-details').style.display = "none";
    document.getElementById("display-meal").style.opacity = "1";
}

const errorControl = () => {      // Show error message(when menu item is not available) which was hide using css.
    document.getElementById('error-message').style.display = "block";
    document.getElementById('footer-section').style.opacity = "0";
}

const errorControl2 = () => {  // Show error message(when input field is empty and search button clicked) which was hide using css.
    document.getElementById('error-message2').style.display = "block";
}
const errorClose = () => {        // Hide error message section when clicked close button.
    document.getElementById('error-message').style.display = "none";
    document.getElementById('error-message2').style.display = "none";
}

const clearError = () => {
    document.getElementById('error-handling').style.display = "none";   // To hide footer section  and error message
    document.getElementById('footer-section').style.display = "none";   // after clicking input field.
}

const displayError = (error) => {                                       // Display an error message if error arise when
    const errorMessage = document.getElementById('error-handling');     // loading data.
    errorMessage.innerHTML = error;
    errorMessage.style.display = "block";
    document.getElementById('footer-section').style.opacity = "0";
}
