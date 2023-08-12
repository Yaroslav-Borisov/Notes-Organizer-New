const inputElement = document.querySelector(".main-form__input")
const createBtn = document.querySelector(".main-form__button")
const listElement = document.querySelector(".notes-list")


const notes = [
    {
        title: "Выложить все проекты на гитхаб",
        completed: false,
    },
    {
        title: "Погулять с собакой по парку",
        completed: true,
    },
]

function getNoteTemplate(note, index) {
    return `
        <li class="notes-list__item ${note.completed === true ? 'notes-list__item--completed' : ''}" draggable="true">
            ${note.title}
            <button class="button button--done ${note.completed === true ? 'completed' : ''}" data-index="${index}" data-type="completed" type='button'></button>
            <button class="button button--delete" data-index="${index}" data-type="delete" type='button'></button>
        </li>
    `
}

function render() {
    listElement.innerHTML = ''

    if (notes.length === 0) {
        listElement.innerHTML('<p>Нет элементов</p>')
    } 

    for (i = 0; i < notes.length; i++) {
        listElement.insertAdjacentHTML("beforeend", getNoteTemplate(notes[i], i))
    }
}

render()

createBtn.onclick = function () {
    if (inputElement.value.length === 0) {
        return 
    }
    
    const newNote = {
        title: inputElement.value,
        completed: false,
    }
    
    notes.unshift(newNote)
    render()
    inputElement.value = ''
}

listElement.onclick = function (event) {
    const targetElement = event.target

    if (targetElement.dataset.index) {
        const index = parseInt(targetElement.dataset.index)
        const type = targetElement.dataset.type

        if (type === 'completed') {
            const note = notes[index] 
            note.completed = !note.completed
        } else if (type === 'delete') {
            notes.splice(index, 1)
        }
        render()
    }

}



