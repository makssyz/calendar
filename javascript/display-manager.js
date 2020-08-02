let listViewPage = document.getElementById("listViewPage")
let monthViewPage = document.getElementById("monthViewPage")
let formPage = document.getElementById("formPage")

function displayListViewPage() {
    clearAll()
    listViewPage.style.display = "inline"
}

function displayMonthViewPage() {
    clearAll()
    monthViewPage.style.display = "inline"
}

function displayFormPage() {
    clearAll()
    formPage.style.display = "inline"
}

function clearAll() {
    listViewPage.style.display = "none"
    monthViewPage.style.display = "none"
    formPage.style.display = "none"
}