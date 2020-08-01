let listViewPage = document.getElementById("listViewPage")
let formPage = document.getElementById("formPage")

function displayListViewPage() {
    clearAll()
    listViewPage.style.display = "inline"
}

function displayFormPage() {
    clearAll()
    formPage.style.display = "inline"
}

function clearAll() {
    listViewPage.style.display = "none"
    formPage.style.display = "none"
}