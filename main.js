let currentPage = 1;
let pages = ['mainPage', 'charactersPage']
let gender 
let status



function getCharacters(currentPage){
    $('.characterContainer').empty();
    axios.get(`https://rickandmortyapi.com/api/character?page=${currentPage}`)
.then((res) => {
    console.log(res.data.results);

    for (let el of res.data.results) {

        if (!status || el.status === status) {
            if (!gender || el.gender === gender) {
                $('.characterContainer').append(`
                <div class="characterItem">
                    <img src="${el.image}" alt="${el.name}">
                    <p class="characterName">${el.name}</p>
                    <p class="characterGender">${el.gender}</p>
                    <button class="viewBtn" id="${el.id}">View</button>
                </div>
            `);
            }
            
        }

        console.log(res.data.status)
    }

})
}

getCharacters(currentPage);

$('#gender').change(function () {
    gender = $(this).val();


    getCharacters(currentPage);
});

$('#status').change(function () {
    status = $(this).val();


    getCharacters(currentPage);
});

$('#nextPage').on('click', function(){
    if (currentPage < 42) {
        currentPage++;
        getCharacters(currentPage);
        $('.page').text(currentPage);
    }   else {
        console.warn(`!!!`)
    }
    
})
$('#prevPage').on('click', function(){

    if (currentPage > 1) {
        currentPage--;
        getCharacters(currentPage);
        $('.page').text(currentPage);
    } else {
        console.warn(`!!!`)
    }
    
})

$(`.closeZone`).click(function() {
    closePopup() 
})

$('.wrap').on('click', '.viewBtn', function(){
    let id = $(this).attr('id');

    openPopup()
    
    axios.get('https://rickandmortyapi.com/api/character/' + id)
    .then((res) => {
        console.log(res.data);
        $('.popup').append(`
            <p class="name">${res.data.name}</p>
            <p class="popupText">Detailed info</p>
            <div class="characterItemP">
            
               

                <div class="itemInfo">
                     <img src="${res.data.image}" alt="${res.data.name}">
                     <div class="otherInfo">
                        <h3>gender:</h3>
                        <p>${res.data.gender}</p>
                        <h3>species:</h3>
                        <p>${res.data.species}</p>
                        <h3>status:</h3>
                        <p>${res.data.status}</p>
                        <h3>location:</h3>
                        <p>${res.data.origin.name}</p>
                    </div>
                </div>
            </div>
        `)
    })
})

$(`.homeBtn`).click(function() {
    closeAllPages(pages)
    $(`.mainPage`).css(`display`, `flex`)
})

$(`.charactersBtn`).click(function() {
    closeAllPages(pages)
    $(`.charactersPage`).css(`display`, `flex`)
})

function closePopup() {
    $(`.closeZone`).slideToggle()

    $('.popup').slideToggle()
    
   
}

function openPopup() {
    $(`.closeZone`).slideToggle()

    $('.popup').slideToggle()
    $(`.popup`).css(`display`, `flex`) 
    $('.popup').empty();
}

function closeAllPages(mass) {
    for (let i = 0; i<mass.length; i++) {
        $(`.${mass[i]}`).css(`display`, `none`)
    }
}

// closeAllPages(pages)