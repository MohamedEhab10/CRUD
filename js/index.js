let screen = document.getElementById("screen");
let fullName = document.getElementById("fname");
let phone = document.getElementById("phone");
let mail = document.getElementById("mail");
let address = document.getElementById("address");
let group = document.getElementById("group");
let notes = document.getElementById("notes");
let valideName,
  nameValGlobal,
  validPhone,
  phoneValGlobal,
  mailValGlobal,
  validMail;
let editIndex = null;
let formList = JSON.parse(localStorage.getItem("dataContainer")) || [];
let emergencyList =
  JSON.parse(localStorage.getItem("emergencyContainer")) || [];
let favoriteList = JSON.parse(localStorage.getItem("favoriteContainer")) || [];
displayData();
displayEmergency();
displayFavorite();
totalCount();
favoriteCount();
emergencyCount();
function displayScreen() {
  screen.classList.replace("d-none", "d-flex");
}
function closeModal() {
  screen.classList.replace("d-flex", "d-none");
}
function closeBtn() {
  closeModal();
}
function headerCards() {
  let clickSection = document.getElementById("clickSection");
  if (formList.length === 0) {
    clickSection.classList.replace("d-none", "d-flex");
  } else {
    clickSection.classList.replace("d-flex", "d-none");
  }
}
function addData() {
  if (fullName.value.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Missing Name",
      text: "Please enter a name for the contact!",
    });
    return;
  } else if (!valideName.test(nameValGlobal)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Name",
      text: "Name should contain only letters and spaces (2-50 characters)",
    });
    return;
  } else if (!validPhone.test(phoneValGlobal)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Phone",
      text: "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)",
    });
    return;
  } else if (!validMail.test(mailValGlobal)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please enter a valid email address",
    });
    return;
  } else if (phone.value.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Missing Phone",
      text: "Please enter a phone number!",
    });
    return;
  } else {
    Swal.fire({
      title: "Added!",
      icon: "success",
      text: "Contact has been added successfully.",
      draggable: true,
    });
  }
  for (let i = 0; i < formList.length; i++) {
    if (formList[i].phone === phone.value.trim()) {
      Swal.fire({
        icon: "error",
        title: "Duplicate Phone Number",
        text: `A contact with this phone number already exists: ${phone.value.trim()}`,
      });
      return;
    }
  }
  let data = {
    name: fullName.value.trim(),
    phone: phone.value.trim(),
    mail: mail.value.trim(),
    address: address.value.trim(),
    group: group.value.trim(),
    notes: notes.value.trim(),
  };
  formList.push(data);
  localStorage.setItem("dataContainer", JSON.stringify(formList));
  displayData();
  clearData();
  totalCount();
  closeModal();
}
function displayData() {
  let cartona = "";
  for (let i = 0; i < formList.length; i++) {
    cartona += `<div
              class="addition row justify-content-center mt-3 bg-white rounded-4 col-sm-12 col-lg-5"
            >
              <div class="add-body rounded-top-4 mt-3 mb-2 row">
                <div class="add-image ms-1 mb-2 row col-2 me-1 mt-auto py-2">
                  <h3 class="fs-4 text-white">${formList[i].name.charAt(0)}</h3>
                </div>
                <div class="add-text row align-content-center col-8">
                  <h4 class="mb-2 fs-6 fw-bold ms-1">${formList[i].name}</h4>
                  <div class="add-total row align-items-center">
                    <div class="add-icon col-1 ms-3">
                      <i class="fa-solid fa-phone pe-5"></i>
                    </div>
                    <div class="add-phone col-8 mt-2">
                      <h6 class="text-gray">${formList[i].phone}</h6>
                    </div>
                  </div>
                </div>
                <div class="mail row ms-1  mt-2 mb-2">
                  <i class="fa-solid fa-envelope col-1"></i>
                  <h6 class="col-8 mt-1 text-gray">
                  ${formList[i].mail}
                  </h6>
                </div>
                <div class="loc row mb-2 ms-1">
                  <i class="fa-solid fa-location-dot col-1"></i>
                  <h6 class="col-8 mt-1 text-gray">${formList[i].address}</h6>
                </div>
                <div class="which-group row ms-1 mb-2">
                  <h6 class="col-2 py-1 rounded-2">${formList[i].group}</h6>
                </div>
              </div>
              <div class="add-foot row justify-content-between p-3">
                <div class="foot-right row col-4">
                  <div class="cat-phone me-1 col-5">
                    <a href="tel:${formList[i].phone}"
                      ><i class="fa-solid fa-phone"></i
                    ></a>
                  </div>
                  <div class="cat-mail col-5">
                    <a href="mailto:${formList[i].mail}"
                      ><i class="fa-solid fa-envelope"></i
                    ></a>
                  </div>
                </div>
                <div
                  class="foot-icons text-gray row col-7 justify-content-evenly position-relative"
                >
                  <i onclick = "favoriteCheck(${i})" class="fa-regular fa-star col-2 icon-yellow"></i>
                  <i onclick = "removeFavorite(${i})" id= solid${i} class="fa-solid fa-star position-absolute solid-star text-warning w-auto d-none"></i>
                  <i onclick = "emergencyCheck(${i})"  class="fa-regular fa-heart col-2 icon-red"></i>
                  <i onclick = "removeEmergency(${i})" id="pulse${i}" class="fa-solid fa-heart-pulse position-absolute w-auto text-danger pulse d-none"></i>
                  <i onclick="updateForm(${i})" class="fa-solid fa-pen col-2 icon-blue"></i>
                  <i onclick = "deleteData(${i})" class="fa-solid fa-trash col-2 icon-red"></i>
                </div>
              </div>
            </div>`;
  }
  document.getElementById("add-card").innerHTML = cartona;
  headerCards();
}
function clearData() {
  fullName.value = null;
  phone.value = null;
  mail.value = null;
  address.value = null;
  group.value = null;
  notes.value = null;
}
function totalCount() {
  document.getElementById("totalCount").innerHTML = formList.length;
}
function deleteData(index) {
  Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${formList[index].name}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#C62222",
    cancelButtonColor: "#606773",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      formList.splice(index, 1);
      localStorage.setItem("dataContainer", JSON.stringify(formList));
      displayData();
      totalCount();
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}
function updateForm(index) {
  editIndex = index;
  screen.classList.replace("d-none", "d-flex");
  fullName.value = formList[index].name;
  phone.value = formList[index].phone;
  mail.value = formList[index].mail;
  address.value = formList[index].address;
  group.value = formList[index].group;
  notes.value = formList[index].notes;
}
function replaceData() {
  let data = {
    name: fullName.value,
    phone: phone.value,
    mail: mail.value,
    address: address.value,
    group: group.value,
    notes: notes.value,
  };
  formList.splice(editIndex, 1, data);
  localStorage.setItem("dataContainer", JSON.stringify(formList));
  Swal.fire({
    title: "Updated!",
    icon: "success",
    text: "Contact has been updated successfully.",
    draggable: true,
  });
  displayData();
  clearData();
  totalCount();
  closeModal();
}
function submitForm() {
  if (editIndex === null) {
    addData();
  } else {
    replaceData();
  }
}
function searchForm() {
  let searchInput = document.getElementById("search-input");
  let nameCheck = searchInput.value;
  let phoneCheck = searchInput.value;
  let mailCheck = searchInput.value;
  let cartona = "";
  for (let i = 0; i < formList.length; i++) {
    if (
      formList[i].name.toLowerCase().includes(nameCheck.toLowerCase()) ||
      formList[i].phone.includes(phoneCheck) ||
      formList[i].mail.includes(mailCheck)
    ) {
      cartona += `<div
              class="addition row justify-content-center mt-3 bg-white rounded-4 col-sm-12 col-lg-5"
            >
              <div class="add-body rounded-top-4 mt-3 mb-2 row">
                <div class="add-image col-2 me-2 mt-auto">
                  <h3 class="w-auto ps-4 fs-5 text-white">${formList[
                    i
                  ].name.charAt(0)}</h3>
                </div>
                <div class="add-text row align-content-center col-8">
                  <h4 class="mb-2 fs-6 fw-bold ms-1">${formList[i].name}</h4>
                  <div class="add-total row align-items-center">
                    <div class="add-icon col-1 ms-3">
                      <i class="fa-solid fa-phone pe-5"></i>
                    </div>
                    <div class="add-phone col-8 mt-2">
                      <h6 class="text-gray">${formList[i].phone}</h6>
                    </div>
                  </div>
                </div>
                <div class="mail row ms-1 mt-2 mb-2">
                  <i class="fa-solid fa-envelope col-1"></i>
                  <h6 class="col-8 mt-1 text-gray">
                  ${formList[i].mail}
                  </h6>
                </div>
                <div class="loc ms-1 row mb-2">
                  <i class="fa-solid fa-location-dot col-1"></i>
                  <h6 class="col-8 mt-1 text-gray">${formList[i].address}</h6>
                </div>
                <div class="which-group row ms-1">
                  <h6 class="col-2 py-1 rounded-2">${formList[i].group}</h6>
                </div>
              </div>
              <div class="add-foot row justify-content-between p-3">
                <div class="foot-right row col-4">
                  <div class="cat-phone me-1 col-5">
                    <a href="tel:${formList[i].phone}"
                      ><i class="fa-solid fa-phone"></i
                    ></a>
                  </div>
                  <div class="cat-mail col-5">
                    <a href="mailto:${formList[i].mail}"
                      ><i class="fa-solid fa-envelope"></i
                    ></a>
                  </div>
                </div>
                <div
                  class="foot-icons text-gray row col-7 justify-content-evenly"
                >
                  <i onclick = "addFav()" class="fa-regular fa-star col-2 icon-yellow"></i>
                  <i  class="fa-regular fa-heart col-2 icon-red"></i>
                  <i onclick="updateForm()" class="fa-solid fa-pen col-2 icon-blue"></i>
                  <i onclick = "deleteData(${i})" class="fa-solid fa-trash col-2 icon-red"></i>
                </div>
              </div>
            </div>`;
    }
  }
  document.getElementById("add-card").innerHTML = cartona;
}
function emergencyCheck(index) {
  let emergencyData = {
    name: formList[index].name,
    phone: formList[index].phone,
  };
  emergencyList.push(emergencyData);
  localStorage.setItem("emergencyContainer", JSON.stringify(emergencyList));
  let pulse = document.getElementById(`pulse${index}`);
  pulse.classList.replace("d-none", "d-block");
  displayEmergency();
  emergencyCount();
}
function displayEmergency() {
  let emergencyChecking = document.getElementById("emergency-check");
  let noEmergency = document.getElementById("no-emergency");
  let cartona = "";
  for (let i = 0; i < emergencyList.length; i++) {
    cartona += `<div class="add-image col-2 py-2 mt-auto">
                  <h3 class="w-auto fs-5 text-white ps-1">${emergencyList[
                    i
                  ].name.charAt(0)}</h3>
                </div>
                <div class="add-text row align-content-center col-8">
                  <h4 class="mb-2 fs-6 fw-bold ms-1">${
                    emergencyList[i].name
                  }</h4>
                  <h6 class="text-gray ms-1">01205200232</h6>
                </div>
                <div class="cat-phone me-1 col-2">
                  <a href="tel:${emergencyList[i].phone}"
                    ><i class="fa-solid fa-phone"></i
                  ></a>
                </div>`;
  }
  document.getElementById("emergency-check").innerHTML = cartona;
  if (emergencyList.length === 0) {
    noEmergency.classList.replace("d-none", "d-block");
    emergencyChecking.classList.replace("d-flex", "d-none");
  } else {
    noEmergency.classList.replace("d-block", "d-none");
    emergencyChecking.classList.replace("d-none", "d-flex");
  }
}
function removeEmergency(index) {
  emergencyList.splice(index, 1);
  localStorage.setItem("emergencyContainer", JSON.stringify(emergencyList));
  displayData();
  emergencyCount();
  displayEmergency();
}
function emergencyCount() {
  document.getElementById("total-emergency").innerHTML = emergencyList.length;
}
function favoriteCheck(index) {
  let favoriteData = {
    name: formList[index].name,
    phone: formList[index].phone,
  };
  favoriteList.push(favoriteData);
  localStorage.setItem("favoriteContainer", JSON.stringify(favoriteList));
  let solid = document.getElementById(`solid${index}`);
  solid.classList.replace("d-none", "d-block");
  displayFavorite();
  favoriteCount();
}
function displayFavorite() {
  let favoriteChecking = document.getElementById("favorite-check");
  let noFavorite = document.getElementById("no-favorite");
  let cartona = "";
  for (let i = 0; i < favoriteList.length; i++) {
    cartona += `<div class="add-image col-2 py-2 mt-auto">
                  <h3 class="w-auto fs-5 text-white ps-1">${favoriteList[
                    i
                  ].name.charAt(0)}</h3>
                </div>
                <div class="add-text row align-content-center col-8">
                  <h4 class="mb-2 fs-6 fw-bold ms-1">${
                    favoriteList[i].name
                  }</h4>
                  <h6 class="text-gray ms-1">01205200232</h6>
                </div>
                <div class="cat-phone me-1 col-2">
                  <a href="tel:${favoriteList[i].phone}"
                    ><i class="fa-solid fa-phone"></i
                  ></a>
                </div>`;
  }
  document.getElementById("favorite-check").innerHTML = cartona;
  if (favoriteList.length === 0) {
    noFavorite.classList.replace("d-none", "d-block");
    favoriteChecking.classList.replace("d-flex", "d-none");
  } else {
    noFavorite.classList.replace("d-block", "d-none");
    favoriteChecking.classList.replace("d-none", "d-flex");
  }
}
function removeFavorite(index) {
  favoriteList.splice(index, 1);
  localStorage.setItem("favoriteContainer", JSON.stringify(favoriteList));
  displayData();
  favoriteCount();
  displayFavorite();
}
function favoriteCount() {
  document.getElementById("total-fav").innerHTML = favoriteList.length;
}
function validationName() {
  let regexName = /^[a-zA-Z][a-zA-Z_-\s]{1,50}$/;
  valideName = regexName;
  let nameVal = fullName.value;
  nameValGlobal = nameVal;
  if (regexName.test(nameVal)) {
    fullName.classList.remove("is-invalid");
    warningName.classList.replace("d-block", "d-none");
  } else {
    fullName.classList.add("is-invalid");
    warningName.classList.replace("d-none", "d-block");
  }
}
function validationPhone() {
  let phoneRegex = /^01[0125][0-9]{8}$/;
  validPhone = phoneRegex;
  let phoneVal = phone.value;
  phoneValGlobal = phoneVal;
  if (phoneRegex.test(phoneVal)) {
    phone.classList.remove("is-invalid");
    warningPhone.classList.replace("d-block", "d-none");
  } else {
    phone.classList.add("is-invalid");
    warningPhone.classList.replace("d-none", "d-block");
  }
}
function validationEmail() {
  let mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  validMail = mailRegex;
  let mailVal = mail.value;
  mailValGlobal = mailVal;
  if (mailRegex.test(mailVal)) {
    mail.classList.remove("is-invalid");
    warningMail.classList.replace("d-block", "d-none");
  } else {
    mail.classList.add("is-invalid");
    warningMail.classList.replace("d-none", "d-block");
  }
}
