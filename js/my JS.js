document.addEventListener("DOMContentLoaded", function () {
    loadBookmarks();
});

function addBookMark() {
    var siteName = document.getElementById("bookmark-name").value;
    var siteUrl = document.getElementById("bookmark-url").value;

    if (siteName.length < 3) {
        showAlert("Site name is not valid, Please follow the rules below : must contain at least 3 characters.", "error");
        return;
    }

    var urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(siteUrl)) {
        showAlert("Url is not valid, Please follow the rules below : enter a valid URL.", "error");
        return;
    }

    var bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    if (window.editIndex !== undefined) {
        bookmarks[window.editIndex] = { name: siteName, url: siteUrl };
        window.editIndex = undefined;
    } else {
        bookmarks.push({ name: siteName, url: siteUrl });
    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    document.getElementById("bookmark-name").value = "";
    document.getElementById("bookmark-url").value = "";
    loadBookmarks();
    document.getElementById("submitBtn").textContent = "Submit";
}


function showAlert(message, type) {
    const alertContainer = document.getElementById("alert-container");
    alertContainer.innerHTML = `
        <div class="alert-${type}">
            ${message}
            <button class="alert-close-btn" onclick="closeAlert()">×</button>
        </div>
    `;
    alertContainer.style.display = "block";
}

function closeAlert() {
    document.getElementById("alert-container").style.display = "none";
}

function loadBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    var tableData = document.getElementById("table-data");
    tableData.innerHTML = "";
    bookmarks.forEach((bookmark, index) => {
        var row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${bookmark.name}</td>
            <td><a href="${bookmark.url}" target="_blank" class="visit-btn btn"><i class="fa-regular fa-eye me-1"></i>Visit</a></td>
            <td>
                <button class="btn update-btn" onclick="editBookmark(${index})">
                    <i class="fa-solid fa-pen-to-square"></i> Update
                </button>
            </td>
            <td>
                <button class="btn delete-btn" onclick="deleteBookmark(${index})">
                    <i class="fa-solid fa-trash-can me-1"></i> Delete
                </button>
            </td>
        `;
        tableData.appendChild(row);
    });
}

function editBookmark(index) {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    document.getElementById("bookmark-name").value = bookmarks[index].name;
    document.getElementById("bookmark-url").value = bookmarks[index].url;

    document.getElementById("submitBtn").textContent = "Update";

    window.editIndex = index;
}

function deleteBookmark(index) {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    loadBookmarks();
}
