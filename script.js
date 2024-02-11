const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList= document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
const cancelbtn = document.querySelector('#cancel')
let isEditMode = false;

console.log(`form btn ${formBtn.innerHTML} and cancel btn ${cancelbtn.innerHTML}`)

console.log(clearBtn)

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUI();
}

const onAddItemSubmit = (e) => {
    e.preventDefault();

    const newItem = itemInput.value;//new item is the value im gonna enter in  the text field
    //validate input
    if(newItem === '') {
        alert(' Please add an item');
        return;
    }

    //check for edit mode
    if(isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode');

        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditMode = false; 
    }
    else{
        if(checkIfItemExists(newItem)){
            alert("That item already exists!!!");
            return;
        }
    }
    //create item dom element
    addItemToDOM(newItem);

    //add item to local storage
    addItemToStorage(newItem);

    checkUI();
    itemInput.value = '';
}

function addItemToDOM(item) {
    //create list item
    const li = document.createElement('li');
    console.log(`new list item is ${li.innerHTML}`)
    li.appendChild(document.createTextNode(item))
    console.log(`new list item is after appending ${li.innerHTML}`)

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button)

    //add the li to the dom
    itemList.appendChild(li);
}

function addItemToStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.push(item);

    //convert to json string and set to local storage
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;
    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    }
    else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function createButton(classes){
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function onClickItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }
    else{
        console.log("1");
        setItemToEdit(e.target);
    }
}

function checkIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage();

    return itemsFromStorage.includes(item);
}

function setItemToEdit(item){
    isEditMode = true;

    itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));//only the selected li should turn the color into red, when another element is selected prev selected all li's must go bck to prev state i.e. black
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i>  Update Item';
    
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent; //the selected attribute comes to the text field
}

function removeItem(item){
    if(confirm("are you sure?")){
        //remove item from dom
        item.remove();

        //remove item from storage
        removeItemFromStorage(item.textContent);

        checkUI();
    }
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    console.log(`items before deleting are ${JSON.stringify(itemsFromStorage)}`)

    //filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    //or
    
    // itemsFromStorage = itemsFromStorage.filter((i) => {
    //     if(i !== item){
    //         return i
    //     }
    //     console.log(`${i} and ${item}`)
    // });

    console.log(`items remained after deleting are ${JSON.stringify(itemsFromStorage)}`)
    //reset to local storage
    localStorage.setItem('items',JSON.stringify(itemsFromStorage))

}

function clearItems(){
    if(confirm("Are you sure that you want to clear all items?")){
        while(itemList.firstChild) { //while item list has any child
            itemList.removeChild(itemList.firstChild);
        }

        //clear from local storage
        localStorage.removeItem('items');
        checkUI();
    }
}

function filterItems(e) {
    const items =itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase(item => (item));
    console.log(`text is ${text}`)
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();//example in here returns apples
        if(itemName.indexOf(text) != -1){//if any of the li doesn't have the text it return -1
            item.style.display = 'flex';
        }
        else{
            item.style.display = 'none';
        }
    })
}

function checkUI() { //clear button and the filter must only be visible when there are any items in the list, if not assigned them to none

    itemInput.value = '';
    
    const items = itemList.querySelectorAll('li');
    if(items.length === 0){
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    }

    else{
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';//when update is completed, change update item to add item and make it back t odefault color/button
    formBtn.style.backgroundColor = '#333';

    isEditMode = false; //when update is completed, the button should be labelled back to add item
}

//initialize app
function init(){

    //eventListeners
    itemForm.addEventListener('submit',onAddItemSubmit);
    itemList.addEventListener('click',onClickItem);
    clearBtn.addEventListener('click',clearItems);
    itemFilter.addEventListener('input',filterItems);
    document.addEventListener('DOMContentLoaded',displayItems);

    checkUI();
}

init();



//now the problem is that the whatever we add will go away as soon as the page is reloaded, in order to overcome this we'll have to use local storage
// localStorage.setItem('name','Thanuj Sai');
// localStorage.setItem('role','AMTS');//even if we reload the page it will still be present

// console.log(localStorage.getItem('name'))
// // localStorage.removeItem('name')
// localStorage.clear();