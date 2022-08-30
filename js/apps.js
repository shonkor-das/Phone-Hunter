
const loadPhones = async(searchText) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}
const displayPhones = phones =>{
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';
    // display 10 phones only 
    const showAll = document.getElementById('show-all');
    if(phones.length > 10){
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

    // display no phones found 
    const noPhones = document.getElementById('no-found-maessage');
    if(phones.length === 0){
        noPhones.classList.remove('d-none');
    }
    else{
        noPhones.classList.add('d-none')
    }

    // display all phones 
    phones.forEach(phone  => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-2">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary py-1"   data-bs-toggle="modal" data-bs-target="#phoneDetaildModal">Show Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // stop loader 
    toggleSpinner(false);
}

// search button handler click 
document.getElementById('btn-search').addEventListener('click', function(){
    // start loader 
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);
})

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        // code for enter 
        processSearch(10);
    }
})

// loader 
const toggleSpinner = isLoading => {
    const loaderSpinner = document.getElementById('loader');
    if(isLoading){
        loaderSpinner.classList.remove('d-none')
    }
    else{
        loaderSpinner.classList.add('d-none');
    }
}

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
    displayPhonesDetails(data.data);
}
// modal 
const displayPhonesDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetaildModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information Found'}</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
    `
}
// loadPhones();