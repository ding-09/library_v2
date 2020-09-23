// book objects are going to be stored in myLibrary array
let myLibrary = [];

// remove bookcards when X is clicked
let mainContainer = document.getElementById("main-container");
mainContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("fa-times")) {
        let currentBookCard = e.target.parentElement.parentElement.parentElement;
        let arrIndex = (currentBookCard.dataset.indexNumber);

        myLibrary.splice(arrIndex, 1);
        mainContainer.removeChild(currentBookCard);

        // REASSIGN ARRAY INDEX VALUES AFTER DELETING
        let bookCards = mainContainer.children;
        for (i = 0; i < bookCards.length; i++) {
            bookCards[i].dataset.indexNumber = i;
        }
    }
});

// Book constructor
function Book(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
}

function addBookToLibrary(e) {
    e.preventDefault();

    // take user input 
    let userBookTitle = document.getElementById("book-title").value;

    let userBookAuthor = document.getElementById("book-author").value;
    let userBookPages = document.getElementById("book-pages").value;

    // get radio input 
    let bookRead = false;
    let radioInput = document.getElementById("yes");
    if (radioInput.checked == true) {
        bookRead = true;
    }

    // create a new Book object with those input values 
    let newUserBook = new Book(userBookTitle, userBookAuthor, userBookPages, bookRead);

    // store new Book object into myLibrary array
    myLibrary.push(newUserBook);

    // create data index for new book 
    let dataIndex = myLibrary.length - 1;

    displayBook(userBookTitle, userBookAuthor, userBookPages, bookRead, dataIndex);


    // close modal window when submit is clicked 
    setTimeout(function () {
        closeModal();
    }, 300);


}

// turn Book objects into cards and display them
function displayBook(userTitle, userAuthor, userPages, bookRead, dataIndex) {

    // turn objects in myLibrary array into cards
    // create a new div with class of book-card
    let bookCard = document.createElement("div");
    bookCard.className = "book-card";

    // add action buttons to bookCard 
    let actionBtnDiv = addActionButtons(bookRead);

    // add book info to bookCard
    let title = addTitle(userTitle);
    let byWord = addByWord();
    let author = addAuthor(userAuthor);
    let pages = addPages(userPages);

    // if book is unread, leave button untouched. if read, toggle on read class


    // append everything together
    bookCard.appendChild(actionBtnDiv);
    bookCard.appendChild(title);
    bookCard.appendChild(byWord);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    mainContainer.appendChild(bookCard);

    // set data attribute to bookcards
    bookCard.setAttribute("data-index-number", dataIndex);

}

// helper for addActionButtons
function addReadBtn(bookRead) {
    let readStatus = bookRead;

    let tooltip = document.createElement("span");

    let checkRead = document.createElement("button");
    checkRead.className = "check-read";


    // add read icon 
    let checkIcon = document.createElement("i");
    checkIcon.className = "fas fa-check-circle";

    checkRead.appendChild(checkIcon);

    // mark icon as read/orange if status is read/true
    if (readStatus) {
        checkRead.firstElementChild.classList.add("toggle-read-on");
    } else {
        tooltip.textContent = "Toggle read";
        tooltip.className = "tooltiptext";
    }

    checkIcon.appendChild(tooltip);


    return checkRead;
}

// helper for addActionButtons
function addRemoveBtn() {
    let removeBtn = document.createElement("button");
    removeBtn.className = "remove";

    // add remove icon 
    let removeIcon = document.createElement("i");
    removeIcon.classList.add("fas");
    removeIcon.classList.add("fa-times")

    removeBtn.appendChild(removeIcon);

    return removeBtn;
}

// add action buttons to bookCard
function addActionButtons(bookRead) {
    // add action-buttons class to the div
    let div = document.createElement("div");
    div.className = "action-buttons";

    // add check-read button
    let checkRead = addReadBtn(bookRead);
    checkRead.addEventListener("click", toggleRead);

    // add remove button
    let remove = addRemoveBtn();

    // append elements to div
    div.appendChild(checkRead);
    div.appendChild(remove);

    return div;
}

// create title div with appropriate class names
function addTitle(titleName) {
    let titleDiv = document.createElement("div");
    titleDiv.className = "title";

    let innertext = document.createElement("p");
    innertext.textContent = titleName;

    titleDiv.appendChild(innertext);
    return titleDiv;
}

// create div with by word
function addByWord() {
    let byDiv = document.createElement("div");
    byDiv.className = "by-style";

    let innertext = document.createElement("p");
    innertext.textContent = "by";

    byDiv.appendChild(innertext);
    return byDiv;
}

// create author div 
function addAuthor(authorName) {
    let authorDiv = document.createElement("div");
    authorDiv.className = "author";

    let innertext = document.createElement("p");
    innertext.textContent = authorName;

    authorDiv.appendChild(innertext);
    return authorDiv;
}

// create page div
function addPages(pageNum) {
    let pagesDiv = document.createElement("div");
    pagesDiv.className = "pages";

    let innertext = document.createElement("p");
    innertext.textContent = pageNum;

    pagesDiv.appendChild(innertext);
    return pagesDiv;
}


// action buttons interaction 

// toggle book read button 
function toggleRead(e) {
    // on click,

    // remove tooltip 
    let span = e.target.children[0];

    let newSpan = document.createElement("span");
    newSpan.className = "tooltiptext";
    newSpan.textContent = "Toggle read";

    if (!e.target.classList.contains("toggle-read-on")) {
        span.parentNode.removeChild(span);
        e.target.classList.remove("toggle-read-off");
        e.target.classList.add("toggle-read-on");
    } else {
        setTimeout(function () {
            e.target.classList.remove("toggle-read-on");
            e.target.classList.add("toggle-read-off");
            e.target.appendChild(newSpan);
        }, 300);
    }
}


// remove book function

/*
function removeBookCard(e) {
    // remove from display
    let currentItem = e.target.parentElement.parentElement.parentElement;
    currentItem.parentElement.removeChild(currentItem);
    
    // remove from myLibrary array 
    let index = currentItem.dataset.indexNumber;
    myLibrary.splice(index, 1);
    console.log(myLibrary);
}*/

// modal action
let modal = document.getElementById("modal");

// modal button 
let modalBtns = document.getElementsByClassName("add-book-button");

// cancel modal button 
let cancelBtn = document.getElementById("cancel-add-book");

function openModal() {
    modal.style.display = "block";
    styleInputField();
    let form = document.getElementById("add-book-form");
    form.addEventListener("submit", addBookToLibrary);
}

function closeModal() {
    modal.style.display = "none";
    resetModal();
}

function resetModal() {
    // reset text fields 
    let textInputs = document.getElementsByClassName("text-input");
    for (i = 0; i < textInputs.length; i++) {
        textInputs[i].value = "";
    }

    // reset radio buttons 
    let radioBtns = document.getElementsByClassName("radio-btns");
    for (i = 0; i < radioBtns.length; i++) {
        radioBtns[i].checked = false;
    }
}

// modalBtn.addEventListener("click", openModal);
for (i = 0; i < modalBtns.length; i++) {
    modalBtns[i].addEventListener("click", openModal);
}

cancelBtn.addEventListener("click", closeModal);

// style input field
function styleInputField() {
    let inputFields = document.getElementsByClassName("text-input");
    for (i = 0; i < inputFields.length; i++) {
        inputFields[i].addEventListener("click", clearField);
    }
}

function clearField(e) {
    e.target.style.color = "black";
}


