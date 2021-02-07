function menuOrder() {
    const menu = document.getElementById('search-meal-field').value;
    mealName(menu);
    document.getElementById('search-meal-field').value = "";
}

function mealName(mealName) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(response => response.json())
        .then(data => {
            const showMeal = document.getElementById('display-meal');

            for (let i = 0; i < data.meals.length; i++) {
                const menuItem = data.meals[i];
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

            }

        })

}

function MealDetails(id) {
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

            function ingredient(id){
                document.getElementById(`li-ingredient-${id}`).innerHTML = data['meals']['0'][`strMeasure${id}`] +' '+ data['meals']['0'][`strIngredient${id}`];
            }

        })

}


function closeDisplayDetails(){
    document.getElementById('display-details').style.display = "none";
    document.getElementById("display-meal").style.opacity = "1";
    
}

