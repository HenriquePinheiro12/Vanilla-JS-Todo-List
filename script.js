const $addBtn = document.querySelector('.add-btn')
const $listContainer = document.querySelector('ul.todo-list')
const todoList = [];

// TODO
// cannot add blank todos
// when [Esq] is clicked removes the input
// When dbclick in task name, enables to rename it (will must splice it with a new object using data-index)

const renderInput = e => {
    /*
        <li class="todo-input">
            <input type="text"></input>
        </li>
    
    */
    if(Boolean($listContainer.childElementCount > 0 && $listContainer.lastElementChild.matches('li.todo-input'))) return

    const li = document.createElement('li')
    li.classList.add('todo-input')
    const input = document.createElement('input')
    input.type = 'text'
    input.placeholder = 'Type your task'

    li.append(input)
    $listContainer.append(li)
    input.focus()
    input.addEventListener('keydown', e => {
        if(e.key !== 'Enter') return
        
        const content = e.target.value
        setTodo(content)
        e.target.remove()
    })
}
const setTodo = (content) => {
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
        input.type = 'checkbox'
        input.checked = todo.checked
        input.addEventListener('change', e => todoList[index].checked = e.target.checked)
        // adds the listener to each input in iteration
        
        const span = document.createElement('span')
        span.innerText = todo.content
        
        div.append(input, span)
        
        $listContainer.append(todoElement)
    })
    feather.replace()
}

window.addEventListener('click', e => {
    if(!e.target.matches('.svg-container')) return
    const {target} = e
    const {index} = target.closest('.todo-element').dataset
    todoList.splice(index, 1)
    renderList(todoList)
})
$addBtn.addEventListener('click', renderInput)