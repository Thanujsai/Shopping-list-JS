const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList= document.getElementById('item-list');
console.log(itemForm)

const addItem = (e) => {
    e.preventDefault();

    const newItem = itemInput.value;//new item is the value im gonna enter in  the text field
    //validate input
    if(newItem === '') {
        alert(' Please add an item');
        return;
    }

    //create list item
    const li = document.createElement('li');
    console.log(`new list item is ${li.innerHTML}`)
    li.appendChild(document.createTextNode(newItem))
    console.log(`new list item is after appending ${li.innerHTML}`)

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button)
    itemList.appendChild(li);
    itemInput.value = '';
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


//eventListeners
itemForm.addEventListener('submit',addItem)