const cl = console.log;


const backdrop = document.getElementById('backdrop')
const form = document.getElementById('form')
const formClose = document.querySelectorAll('.formClose')
const formBtn = document.getElementById('formBtn')

const movieName = document.getElementById('movieName')
const movieImage = document.getElementById('movieImage')
const movieDescription = document.getElementById('movieDescription')
const movieRating = document.getElementById('movieRating')
const movieContainer = document.getElementById('movieContainer')

const addMovie = document.getElementById('addMovie')
const updateMovie = document.getElementById('updateMovie')



// let movieArray = [
//   {
//     movieId: "101",
//     movieName: "Avengers: Endgame",
//     movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw_yGFzd7040jgswoaBlSw_vU-YnyciU7UvB9oBiIvfw&s=10",
//     movieRating: 8.4,
//     movieDescription: "The Avengers unite to reverse the damage caused by Thanos."
//   },
//   {
//       movieId: "102",
//       movieName: "Interstellar",
//       movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAuHNTstP-warx97neFlnvtio7Bfna9TqoFdaihNIK8g&s=10",
//       movieRating: 8.7,
//       movieDescription: "A team of astronauts travels through space to find a new home for humanity."
//     },
//     {
//         movieId: "103",
//     movieName: "RRR",
//     movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5STRBLYwguOX0G2MHRebEbFnaCyBUUXC5jVq87KBiQQ&s=10",
//     movieRating: 7.8,
//     movieDescription: "Two legendary revolutionaries join forces and fight against British rule in India."
//   },
//   {
//     movieId: "104",
//     movieName: "Inception",
//     movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjrWIVo22Mxzct7bDI6I4FIMbaoEAx0bTEPohrHte-kQ&s=10",
//     movieRating: 8.8,
//     movieDescription: "A skilled thief enters people's dreams to steal valuable information."
//   },
//   {
//     movieId: "105",
//     movieName: "The Lion King",
//     movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgZY65Toeqo-oxtogzImvKB_mf5e218lyMP_PZq4QgkQ&s=10",
//     movieRating: 8.5,
//     movieDescription: "A young lion learns to accept his responsibility as the future king."
// },
// {
//     movieId: "106",
//     movieName: "3 Idiots",
//     movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPZlEH7zZHgQZNEKSh_fuiina_TX3IbmahkmeZYw5TsA&s=10",
//     movieRating: 8.4,
//     movieDescription: "Three friends experience friendship, education, and the challenges of college life."
// },
// {
//   movieId: "107",
//   movieName: "KGF: Chapter 1",
//   movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcKdUw-KSfTPJnSF1qLKawkgXavPdVXdHbeuO5PkPVPQ&s=10",
//   movieRating: 8.2,
//   movieDescription: "A determined young man rises from poverty and enters the dangerous world of the Kolar Gold Fields."
// },
// ];

// localStorage.setItem('movieArray', JSON.stringify(movieArray))

let movieArray = JSON.parse(localStorage.getItem('movieArray')) || []
// cl(movieArray)

//form show and hide function

function onToggleForm(){
    backdrop.classList.toggle('active')
    form.classList.toggle('active')

    form.reset();

    addMovie.classList.remove('d-none')
    updateMovie.classList.add('d-none')
}

formBtn.addEventListener('click', onToggleForm)
formClose.forEach(e => e.addEventListener('click', onToggleForm))

//changing badge color function

function setRating(rating){
    if(rating >= 8){
        return 'badge-success'
    }else if(rating >= 5 && rating < 8){
        return 'badge-warning'
    }else{
        return 'badge-danger'
    }
}

//Default Image url

let defaultImage = 'https://i.pinimg.com/564x/00/81/b6/0081b6169b11a806603d770b179f974a.jpg'


//function snackbar

function snackbar(){
    Swal.fire({
        title : msg,
        icon : icon,
        timer : 3000
    })
}

//read templating functionality

function onCreateCard(arr){
    let res = '';

    arr.forEach(ele =>{
        res += `<div class="col-3 col-xl-3 col-lg-3 col-sm-4 col-xsm-6 mt-5" id="${ele.movieId}">
                <div class="card movieCard sec-btn" id="movieCard">
                    <div class="card-header d-flex justify-content-between">
                        <div class="col-8 p-0">
                            <h4 class="m-0 ">${ele.movieName}</h4>
                        </div>
                        <div class="col-2 offset-1">
                            <h5 class="m-0"><span class="badge ${setRating(ele.movieRating)}">${ele.movieRating}</span></h5>
                        </div>

                    </div>
                    <div class="card-body py-0 px-2">
                        <figure>
                            <img src="${ele.movieImg || defaultImage}" alt="${ele.movieName}">


                            <figcaption>
                                <h4 class="m-0">${ele.movieName}</h4>

                                <p>${ele.movieDescription}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick="onEdit(this)" class="btn btn-sm sec-btn" type="button">Edit</button>
                        <button onclick="onDelete(this)" class="btn btn-sm pri-btn" type="button">Remove</button>
                    </div>
                </div>
            </div>`
    })
    movieContainer.innerHTML = res;
}

onCreateCard(movieArray)


function onSubmitMovie(eve){
    eve.preventDefault();

    let newMovie = {
        movieId : Date.now().toString(),
        movieName : movieName.value,
        movieImg : movieImage.value,
        movieDescription : movieDescription.value,
        movieRating : movieRating.value
    }
    form.reset();
    movieArray.push(newMovie)

    onToggleForm()

    localStorage.setItem('movieArray', JSON.stringify(movieArray))
    // cl(movieArray)

    let newMovieCard = document.createElement('div')
    newMovieCard.className = 'col-3 mt-5 col-xl-3 col-lg-3 col-sm-4 col-xsm-6'
    newMovieCard.id = newMovie.movieId
    newMovieCard.innerHTML = `<div class="card movieCard sec-btn" id="movieCard">
                    <div class="card-header d-flex justify-content-between">
                        <div class="col-8 p-0">
                            <h4 class="m-0 ">${newMovie.movieName}</h4>
                        </div>
                        <div class="col-2 offset-1">
                            <h5 class="m-0"><span class="badge ${setRating(newMovie.movieRating)}">${newMovie.movieRating}</span></h5>
                        </div>

                    </div>
                    <div class="card-body py-0 px-2">
                        <figure>
                            <img src="${newMovie.movieImg || defaultImage}" alt="${newMovie.movieName}">


                            <figcaption>
                                <h4 class="m-0">${newMovie.movieName}</h4>

                                <p>${newMovie.movieDescription}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button  onclick="onEdit(this)" class="btn btn-sm sec-btn" type="button">Edit</button>
                        <button onclick="onDelete(this)" class="btn btn-sm pri-btn" type="button">Remove</button>
                    </div>
                </div>`

    movieContainer.append(newMovieCard)
    snackbar('new movie card created successfully', 'success')

}

function onEdit(ele){
    let editId = ele.closest('.col-3').id;
    // cl(editId)

    localStorage.setItem('editId', editId)

    let editObj = movieArray.find(e => e.movieId === editId)
    // cl(editObj)

    onToggleForm()

    movieName.value = editObj.movieName
    movieImage.value = editObj.movieImg
    movieDescription.value = editObj.movieDescription
    movieRating.value = editObj.movieRating

    addMovie.classList.add('d-none')
    updateMovie.classList.remove('d-none')

}

function onUpdate(){
    // let text =document.querySelector('.card-header:first-child')
    // .innerText = 'Update Movie'

    let updateId = localStorage.getItem('editId')
    // cl(updateId)
    localStorage.removeItem('editId')

    let updateObj = {
        movieId : updateId,
        movieName : movieName.value,
        movieImg : movieImage.value,
        movieDescription : movieDescription.value,
        movieRating : movieRating.value
    }

    form.reset();
    onToggleForm()

    let getIndex = movieArray.findIndex(e => e.movieId === updateId)
    movieArray[getIndex] = updateObj

    localStorage.setItem('movieArray', JSON.stringify(movieArray))
    // cl(movieArray)

    let movie = document.getElementById(updateId)
    movie.innerHTML = `<div class="card movieCard sec-btn" id="movieCard">
                    <div class="card-header d-flex justify-content-between">
                        <div class="col-8 p-0">
                            <h4 class="m-0 ">${updateObj.movieName}</h4>
                        </div>
                        <div class="col-2 offset-1">
                            <h5 class="m-0"><span class="badge ${setRating(updateObj.movieRating)}">${updateObj.movieRating}</span></h5>
                        </div>

                    </div>
                    <div class="card-body py-0 px-2">
                        <figure>
                            <img src="${updateObj.movieImg || defaultImage}" alt="${updateObj.movieName}">


                            <figcaption>
                                <h4 class="m-0">${updateObj.movieName}</h4>

                                <p>${updateObj.movieDescription}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button  onclick="onEdit(this)" class="btn btn-sm sec-btn" type="button">Edit</button>
                        <button onclick="onDelete(this)" class="btn btn-sm pri-btn" type="button">Remove</button>
                    </div>
                </div>`

    snackbar('movie card updated successfully', 'success')
}   

function onDelete(ele){
    let deletId = ele.closest('.col-3').id;
    // cl(deletId)

    let getIndex = movieArray.findIndex(e => e.movieId === deletId)
    movieArray.splice(getIndex, 1)

    localStorage.setItem('movieArray', JSON.stringify(movieArray))

    ele.closest('.col-3').remove()

    snackbar('movie card from movie list deleted successfully', 'success')
}

form.addEventListener('submit', onSubmitMovie)
updateMovie.addEventListener('click', onUpdate)