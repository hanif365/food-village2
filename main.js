/* Customer order a meal and if empty input enter then show a error message */
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
    }, 5000);

}

const mealName = (mealName) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)   // fetch API to load data
        .then(response => response.json())  // get JSON form data
        .then(data => {
            if (data.meals == null) {       // If menu item is not available then show an error message using function call.
                errorControl();
                return;
            }

            const showMeal = document.getElementById('display-meal');
            const value = data.meals;

            value.forEach(menuItem => {
                console.log(menuItem);
                const mealItem = document.createElement('div');     // Create a div
                mealItem.className = 'col';     // generate a class into above create div. and below use template literal.
                const menuInfo = `
                    <div id="${menuItem.idMeal}" onclick = 'MealDetails("${menuItem.idMeal}")' class="card meal-item" style="width: 22rem;">
                        <img src="${menuItem.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <p class="card-text meal-name">${menuItem.strMeal}</p>
                        </div>
                    </div>
                `;          // Another function call in the above and pass a menuID.

                mealItem.innerHTML = menuInfo;
                showMeal.appendChild(mealItem);
            });
        })
}

const MealDetails = (id) => {
    document.getElementById('display-details').style.display = "block"; // display display-details section which was hide using css
    document.getElementById("display-meal").style.opacity = "0.5";  // make opacity 0.5 for just focus display details section.

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => {
            const displayDetails = document.getElementById('display-details-info');

            document.getElementById('show-img').src = data.meals[0].strMealThumb;   // Image show in specific menu item

            document.getElementById('food-name').innerText = data.meals[0].strMeal; // display food name

            document.getElementById('food-area').innerText = data.meals[0].strArea;     // display menu origin

            document.getElementById('making-process').innerText = data.meals[0].strInstructions;    // Display making process.


            ///////////////////////////////////////
            for (i = 1; i <= 20; i++) {
                // const content = data['meals']['0'][`strMeasure${i}`] + ' ' + data['meals']['0'][`strIngredient${i}`];
                // console.log(content);
                if (data['meals']['0'][`strIngredient${i}`] == "") {    // if ingredient field empty then break and we get total 
                    break;                                              // given ingredient number.
                }
            }

            /////////////////////////////////////////////////// new start
            const ulContainer = document.getElementById('ul-container');
            for (k = 1; k <= count; k++) {
                // ingredient(k);
                console.log(k);

                const li = document.createElement('li');
                li.innerText = data['meals']['0'][`strMeasure${k}`] + ' ' + data['meals']['0'][`strIngredient${k}`];
                ulContainer.appendChild(li);

                document.getElementById('close-btn').addEventListener('click',function(){       
                    li.innerText = "";      // use to remove ingredients after close.
                })

            }


            /////////////////////////////////////////////////New end
            /*
                        for (j = 1; j <= count; j++) {
                            ingredient(j);
                            console.log(j);
            
                            ///////////////////////////////////////
            
            
            
                            // ingredient(1);  // Function call to show ingredients details
                            // ingredient(2);
                            // ingredient(3);
                            // ingredient(4);
                            // ingredient(5);
                            // ingredient(6);
                            // ingredient(7);
                            // ingredient(8);
                            // ingredient(9);
                            // ingredient(10);
            
                            function ingredient(id) {
                                document.getElementById(`li-ingredient-${id}`).innerHTML = data['meals']['0'][`strMeasure${id}`] + ' ' + data['meals']['0'][`strIngredient${id}`];  // Merge two property and make a complete ingredients details.
                            }
                        }   // pore add korsi for loop er sathe.
                        */
        })
}



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

const clearHistory = () => {
    document.getElementById('display-meal').innerHTML = "";
    document.getElementById('footer-section').style.display = "none";  // To hide footer section after clicking input field.
}


