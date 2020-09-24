const library = (() => {
    let collection = [];
    const mainContainer = document.getElementById("main-container");
    const addBook = (bookObject) => {
        collection.push(bookObject);
    };
    const removeBook = (e) => {
        if (e.target.classList.contains("fa-times")) {
            const currentBookCard = e.target.parentElement.parentElement.parentElement;
            const arrIndex = (currentBookCard.dataset.index);

            collection.splice(arrIndex, 1);
            mainContainer.removeChild(currentBookCard);

            // REASSIGN ARRAY INDEX VALUES AFTER DELETING
            let bookCards = mainContainer.children;
            Array.from(bookCards, card => {
                i = 0; 
                card.dataset.index = i; 
                i++
            });
        }
    }
    mainContainer.addEventListener("click", removeBook);
    return {collection, addBook, removeBook, mainContainer};
})();

class Book {
    constructor(title, author, pages, readStatus, dataIndex) {
        this.title = title;
        this.author = author; 
        this.pages = pages; 
        this.readStatus = readStatus;
        this.dataIndex = dataIndex
    }
    toggleRead(e) {
        const span = e.target.children[0];
        const newSpan = document.createElement("span");
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
    addActionButtons(readStatus) {
        const div = document.createElement("div");
        div.className = "action-buttons";
        const checkRead = this.addReadBtn(readStatus);
        checkRead.addEventListener("click", this.toggleRead);
        const remove = this.addRemoveBtn();
        div.appendChild(checkRead);
        div.appendChild(remove);
        return div;
    }
    addReadBtn(readStatus) {
        const bookRead = readStatus;
        const tooltip = document.createElement("span");
        const checkRead = document.createElement("button");
        checkRead.className = "check-read";
        const checkIcon = document.createElement("i");
        checkIcon.className = "fas fa-check-circle";
        checkRead.appendChild(checkIcon);
        if (bookRead) {
            checkRead.firstElementChild.classList.add("toggle-read-on");
        } else {
            tooltip.textContent = "Toggle read";
            tooltip.className = "tooltiptext";
        }
        checkIcon.appendChild(tooltip);
        return checkRead;
    }
    addRemoveBtn() {
        const removeBtn = document.createElement("button");
        removeBtn.className = "remove";
        const removeIcon = document.createElement("i");
        removeIcon.classList.add("fas");
        removeIcon.classList.add("fa-times")
        removeBtn.appendChild(removeIcon);
        return removeBtn;
    }
    addTitle(title) {
        const titleDiv = document.createElement("div");
        titleDiv.className = "title";
        const innertext = document.createElement("p");
        innertext.textContent = title;
        titleDiv.appendChild(innertext);
        return titleDiv;
    }
    addByWord() {
        const byDiv = document.createElement("div");
        byDiv.className = "by-style";
        const innertext = document.createElement("p");
        innertext.textContent = "by";
        byDiv.appendChild(innertext);
        return byDiv;
    }
    addAuthor(author) {
        const authorDiv = document.createElement("div");
        authorDiv.className = "author";
        const innertext = document.createElement("p");
        innertext.textContent = author;
        authorDiv.appendChild(innertext);
        return authorDiv;
    }
    addPages(pages) {
        const pagesDiv = document.createElement("div");
        pagesDiv.className = "pages";
        const innertext = document.createElement("p");
        innertext.textContent = pages;
        pagesDiv.appendChild(innertext);
        return pagesDiv;
    }
    displayBook() {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
        const actionBtnDiv = this.addActionButtons(this.readStatus);
        const title = this.addTitle(this.title);
        const byWord = this.addByWord();
        const author = this.addAuthor(this.author);
        const pages = this.addPages(this.pages);
        bookCard.appendChild(actionBtnDiv);
        bookCard.appendChild(title);
        bookCard.appendChild(byWord);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        library.mainContainer.appendChild(bookCard);
        bookCard.setAttribute("data-index", this.dataIndex);
    }
};

const modalAction = (() => {
    const modal = document.getElementById("modal");
    const addBookBtns = document.getElementsByClassName("add-book-button");
    const openModal = () => {
        modal.style.display = "block";
        const form = document.getElementById("add-book-form");
        form.addEventListener("submit", addNewBook);
    }
    const closeModal = () => {
        modal.style.display = "none";
        resetModal();
    }
    const resetModal = () => {
        let textInputs = document.getElementsByClassName("text-input");
        Array.from(textInputs, input => input.value = "");

        let radioBtns = document.getElementsByClassName("radio-btns");
        Array.from(radioBtns, radioBtn => radioBtn.checked = false);
    }
    const addNewBook = (e) => {
        e.preventDefault();
        const userBookTitle = document.getElementById("book-title").value;
        const userBookAuthor = document.getElementById("book-author").value;
        const userBookPages = document.getElementById("book-pages").value;
        let bookRead = false;
        const radioInput = document.getElementById("yes");
        if (radioInput.checked == true) {
            bookRead = true;
        }
        const dataIndex = library.collection.length;
        const newBook = new Book(userBookTitle, userBookAuthor, userBookPages, bookRead, dataIndex);
        library.addBook(newBook);
        newBook.displayBook();
        setTimeout(function () {
            closeModal();
        }, 300);
    }
    Array.from(addBookBtns, button => button.addEventListener("click", openModal));
    cancelBtn = document.getElementById("cancel-add-book").addEventListener("click", closeModal);
})();

