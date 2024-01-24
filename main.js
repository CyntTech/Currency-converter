let timer
let deleteFirstPhotoDelay

async function breedFunction() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all")
    const data = await response.json()
    createBreedList(data.message)
  } catch (e) {
    console.log("error fetching the requested breed list.")
  }
}

breedFunction()

function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
  <select onchange="displayBreed(this.value)">
        <option>Select your preferred dog breed</option>
        ${Object.keys(breedList).map(function (breed) {
          return `<option>${breed}</option>`
        }).join('')}
      </select>
  `
}

async function displayBreed(breed) {
  if (breed != "Select your preferred dog breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
    const data = await response.json()
    createSlideshow(data.message)
  }
}

function createSlideshow(images) {
  let initialDisplay = 0
  clearInterval(timer)
  clearTimeout(deleteFirstPhotoDelay)
  
  if (images.length > 1) {
    document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide" style="background-image: url('${images[1]}')"></div>
  `
  initialDisplay += 2
  if (images.length == 2) initialDisplay = 0
  timer = setInterval(nextSlide, 3000)
  } else {
    document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide"></div>
  `
  }

  function nextSlide() {
    document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[initialDisplay]}')"></div>`)
    deleteFirstPhotoDelay = setTimeout(function () {
      document.querySelector(".slide").remove()
    }, 1000)
    if (initialDisplay + 1 >= images.length) {
      initialDIsplay = 0
    } else {
      initialDisplay++
    }
  }
}