menuOrder = () => {
    const menu = document.getElementById('search-meal-field').value;
    console.log(menu);
    mealName(menu);
    document.getElementById('search-meal-field').value = "";

}

mealName = (mealName) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(response => response.json())
        .then(data => {
            if (data.meals == null) {
                console.log("HIIII");
                errorControl();
                return;
            }


            const showMeal = document.getElementById('display-meal');

            // array.forEach(element => {
                
            // });
            // const value = data.meals.length;
            const value = data.meals;

            value.forEach(menuItem => {
                const mealItem = document.createElement('div');
                mealItem.className = 'col';
                const menuInfo = `
                    <div id="${menuItem.idMeal}" onclick = 'MealDetails("${menuItem.idMeal}")' class="card" style="width: 18rem;">
                        <img src="${menuItem.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <p class="card-text">${menuItem.strMeal}</p>
                        </div>
                    </div>
                `;

                mealItem.innerHTML = menuInfo;
                showMeal.appendChild(mealItem);

            });

            // for (let i = 0; i < data.meals.length; i++) {
            //     console.log('Meal', mealName);
            //     const menuItem = data.meals[i];
            //     const mealItem = document.createElement('div');
            //     mealItem.className = 'col';
            //     const menuInfo = `
            //         <div id="${menuItem.idMeal}" onclick = 'MealDetails("${menuItem.idMeal}")' class="card" style="width: 18rem;">
            //             <img src="${menuItem.strMealThumb}" class="card-img-top" alt="...">
            //             <div class="card-body">
            //                 <p class="card-text">${menuItem.strMeal}</p>
            //             </div>
            //         </div>
            //     `;

            //     mealItem.innerHTML = menuInfo;
            //     showMeal.appendChild(mealItem);

            // }

        })

}

MealDetails = (id) => {
    document.getElementById('display-details').style.display = "block";
    document.getElementById("display-meal").style.opacity = "0.5";

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const displayDetails = document.getElementById('display-details-info');

            document.getElementById('show-img').src = data.meals[0].strMealThumb;

            document.getElementById('food-area').innerText = data.meals[0].strArea;

            document.getElementById('making-process').innerText = data.meals[0].strInstructions;

            ingredient(1);
            ingredient(2);
            ingredient(3);
            ingredient(4);
            ingredient(5);
            ingredient(6);

            function ingredient(id) {
                document.getElementById(`li-ingredient-${id}`).innerHTML = data['meals']['0'][`strMeasure${id}`] + ' ' + data['meals']['0'][`strIngredient${id}`];
            }

            // ingredient = (id) => {
            //     document.getElementById(`li-ingredient-${id}`).innerHTML = data['meals']['0'][`strMeasure${id}`] + ' ' + data['meals']['0'][`strIngredient${id}`];
            // }

        })

}



closeDisplayDetails = () => {
    document.getElementById('display-details').style.display = "none";
    document.getElementById("display-meal").style.opacity = "1";
}

errorControl = () => {
    document.getElementById('error-message').style.display = "block";
}

errorClose = () => {
    document.getElementById('error-message').style.display = "none";
}

// function closeDisplayDetails() {
//     document.getElementById('display-details').style.display = "none";
//     document.getElementById("display-meal").style.opacity = "1";

// }

// function errorControl() {
//     document.getElementById('error-message').style.display = "block";
// }



// function errorClose() {
//     document.getElementById('error-message').style.display = "none";
// }



