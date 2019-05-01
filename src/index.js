const baseUrl = "http://localhost:3000/dogs"

const mainDiv = document.querySelector("#table-body")

// state 
const state = {
    dogs: [],
    selectedDog: null
}

const fetchDogs = () => {
    return fetch(baseUrl)
    .then(resp => resp.json())
}
const getDog = dog => {
    const mainDiv = document.querySelector("#table-body")
    const maintr = document.createElement("tr")
    maintr.innerHTML += `
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button class="edit" value="${dog.id}" id="${dog.id}">edit Dog</button></td>
    `
    const formEl = document.querySelector("#dog-form")
    const editBtn = maintr.querySelector(".edit")
    editBtn.addEventListener("click", () => {
        state.selectedDog = dog
        formEl.name.value = state.selectedDog.name
        formEl.breed.value = state.selectedDog.breed
        formEl.sex.value = state.selectedDog.sex
    })

    mainDiv.append(maintr)   
}
const editDog = dog => {
    const formEl = document.querySelector("#dog-form")
    const mainDiv = document.querySelector("#table-body")
    formEl.addEventListener("submit", event => {
        event.preventDefault();
        state.selectedDog.name = formEl.name.value
        state.selectedDog.breed = formEl.breed.value
        state.selectedDog.sex = formEl.sex.value
        updateDog(state.selectedDog)
        alert("Succesfully updated.")
        // change the dom only for the row
  
       
        // document.getElementById(state.selectedDog.id)
        // 
        mainDiv.innerHTML = ``
        getDogs(state.dogs)
        formEl.reset()
    })
}

const updateDog = dog => {
    fetch(baseUrl + `/${dog.id}`, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dog)
    }).then(resp => resp.json())
}

const getDogs = dogs => {
    dogs.forEach(getDog)
    state.dogs = dogs
}



const init = () => {
    fetchDogs()
        .then(getDogs)
        .then(editDog)       
}

init()