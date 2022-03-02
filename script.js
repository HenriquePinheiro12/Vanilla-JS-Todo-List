const $addBtn = document.querySelector('.add-btn')
const $listContainer = document.querySelector('ul.todo-list')
const todoList = [];

//renders input to type to-do task
const renderInput = e => {
    /*
        <li class="todo-input">
            <input type="text" placeholder="Type your task"></input>
        </li>
    */

    // checks if the last element whas submited
    if($listContainer.childElementCount > 0 && $listContainer.lastElementChild.matches('li.todo-input')) return

    const li = document.createElement('li')
    li.classList.add('todo-input')

    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = 'Type your task'

    li.append(input)
    $listContainer.append(li)
    input.focus()
    input.addEventListener('keydown', e => {
        if(e.key === 'Escape') li.remove()
        if(e.key !== 'Enter') return
        if(e.target.value.length === 0) return
        const content = e.target.value
        setTodo(content)
        e.target.remove()
    })
}
const setTodo = content => {
    todoList.push({
        content: content,
        checked : false
    })
    renderList(todoList)
}

const renderList = currentList => {
    Array.from($listContainer.children).forEach(el => el.remove()) // resets the list rendering

    currentList.forEach((todo, index) => {
        /*
            <li class="todo-element" data-index>
                <div>
                    <input type="checkbox"></input>
                    <span>Content</span>
                </div>
                <i data-feather="trash-2">
            </li>
        */
        const todoElement = document.createElement('li')
        todoElement.classList.add('todo-element')
        todoElement.setAttribute('data-index', index)
        
        const div = document.createElement('div')
        
        const svgContainer = document.createElement('span')
        svgContainer.classList.add('svg-container')

        const svg = document.createElement('i')
        svg.setAttribute('data-feather', 'trash-2')

        svgContainer.append(svg)

        todoElement.append(div, svgContainer)
        
        const input = document.createElement('input')
        input.setAttribute('type','checkbox')
        if(todo.checked) input.setAttribute('checked', todo.checked)
        input.addEventListener('change', e => todoList[index].checked = e.target.checked)
        // adds the listener to each input in iteration
        
        const span = document.createElement('span')
        span.innerText = todo.content
        span.addEventListener('dblclick', renameTodo)

        div.append(input, span)
        
        $listContainer.append(todoElement)
    })
    feather.replace()
}

const removeTodo = e => {
    if(!e.target.matches('.svg-container')) return
    const {target} = e
    const {index} = target.closest('.todo-element').dataset
    todoList.splice(index, 1)
    renderList(todoList)
}

// changes content property in the specific todo and renders the list
const renameTodo = e => {
    const {target: targetTaskName} = e
    const parent = targetTaskName.parentNode
    const {index} = parent.closest('.todo-element').dataset 
    const currentContent = todoList[index].content


    const input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('placeholder', 'Type your task')
    input.classList.add('rename-input')
    input.setAttribute('value', currentContent)

    targetTaskName.remove()
    parent.append(input)
    input.focus()

    input.addEventListener('keydown', e => {
        if(e.key === 'Escape'){
            renderList(todoList)
            return
        }
        if(e.key !== 'Enter') return
        if(e.target.value.length === 0) return
        const content = e.target.value

        todoList[index].content = content
        e.target.remove()
        renderList(todoList)
    })
}

window.addEventListener('click', removeTodo)
$addBtn.addEventListener('click', renderInput)
