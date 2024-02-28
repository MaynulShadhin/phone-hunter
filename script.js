const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};
const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  // clear container before adding other card
  phoneContainer.textContent = "";

  // display show all if there are more than 12 phones
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // display how many u want to show if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // div creating
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
    <div class="card">
            <figure>
              <img
                src="${phone.image}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>There are many variations of passages of available, but the majority have suffered</p>
              <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
              </div>
            </div>
          </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpinner(false);
};

// show detail

const handleShowDetail = async (id) => {
  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data
  showPhoneDetails(phone)
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML=`
    <img src="${phone.image}">
    <h3 class="text-3xl font-bold">${phone.name}</h3>
    <p class="font-normal"><span class="font-bold">Storages: </span>${phone?.mainFeatures?.storage}</p>
    <p class="font-normal"><span class="font-bold">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
    <p class="font-normal"><span class="font-bold">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
    <p class="font-normal"><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
    <p class="font-normal"><span class="font-bold">Slug: </span>${phone.slug}</p>
    <p class="font-normal"><span class="font-bold">Release Date: </span>${phone.releaseDate}</p>
    <p class="font-normal"><span class="font-bold">Brand: </span>${phone.brand}</p>
    <p class="font-normal"><span class="font-bold">GPS: </span>${phone?.others?.GPS}</p>
  `

  show_details_modal.showModal();
  
};

// handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle Show All
const handleShowAll = () => {
  handleSearch(true);
};
