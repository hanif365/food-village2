/* Customer order a meal and if empty input enter then show a error message */
menuOrder = () => {
    let menu = document.getElementById('search-meal-field').value;
    if(menu == ""){
        errorControl2();    // error function call
        return;             // use return for blocking next step.
    }
    mealName(menu);
    document.getElementById('search-meal-field').value = "";  // When search button click input filled will empty.
}

mealName = (mealName) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)   // fetch API
        .then(response => response.json())  // get JSON form data
        .then(data => {
            if (data.meals == null) {       // If menu item is not available then show an error message using function call.
                errorControl();
                return;
            }

            const showMeal = document.getElementById('display-meal');
            const value = data.meals;

            value.forEach(menuItem => {
                const mealItem = document.createElement('div');     // Create a div
                mealItem.className = 'col';     // generate a class into above create div. and below use template literal.
                const menuInfo = `
                    <div id="${menuItem.idMeal}" onclick = 'MealDetails("${menuItem.idMeal}")' class="card" style="width: 22rem;">
                        <img src="${menuItem.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <p class="card-text">${menuItem.strMeal}</p>
                        </div>
                    </div>
                `;          // Another function call in the above and pass a menuID.

                mealItem.innerHTML = menuInfo;
                showMeal.appendChild(mealItem);
            });
        })
}

MealDetails = (id) => {
    document.getElementById('display-details').style.display = "block"; // display display-details section which was hide using css
    document.getElementById("display-meal").style.opacity = "0.5";  // make opacity 0.5 for just focus display details section.

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => {
            const displayDetails = document.getElementById('display-details-info');

            document.getElementById('show-img').src = data.meals[0].strMealThumb;   // Image show in specific menu item

            document.getElementById('food-area').innerText = data.meals[0].strArea;     // display menu origin

            document.getElementById('making-process').innerText = data.meals[0].strInstructions;    // Display making process.

            ingredient(1);  // Function call to show ingredients details
            ingredient(2);
            ingredient(3);
            ingredient(4);
            ingredient(5);
            ingredient(6);

            function ingredient(id) {
                document.getElementById(`li-ingredient-${id}`).innerHTML = data['meals']['0'][`strMeasure${id}`] + ' ' + data['meals']['0'][`strIngredient${id}`];  // Merge two property and make a complete ingredients details.
            }
        })

}



closeDisplayDetails = () => {   // Arrow function to hide display details section and make display meal section's opacity 1.
    document.getElementById('display-details').style.display = "none";
    document.getElementById("display-meal").style.opacity = "1";
}

errorControl = () => {      // Show error message(when menu item is not available) which was hide using css.
    document.getElementById('error-message').style.display = "block";
}

errorControl2 = () =>{      // Show error message(when input field is empty and search button clicked) which was hide using css.
    document.getElementById('error-message2').style.display = "block";
}
errorClose = () => {        // Hide error message section when clicked close button.
    document.getElementById('error-message').style.display = "none";
    document.getElementById('error-message2').style.display = "none";
}

