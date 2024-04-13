

/* OPEN MODAL to add new task */
let modal = document.getElementById("modal");
console.log(modal)

let newtask_plus = document.querySelector('.newtask-plus'); // thêm việc bằng dấu cộng
console.log(newtask_plus)
let newtask = document.querySelector('.newtask'); // thêm việc bằng newtask
console.log(newtask)

//show modal
function ShowModal(){
    modal.classList.add('open');
}
newtask_plus.addEventListener('click', ShowModal);
newtask.addEventListener('click', ShowModal);

//close modal
let modal_close = document.querySelector('.modal-close');
function CloseModal(){
    modal.classList.remove('open');
}
modal_close.addEventListener('click', CloseModal);

// push data
let todo = []
let doing = []
let completed = []
let block = []

if (localStorage.getItem("todo")) 
{
    todo = JSON.parse(localStorage.getItem("todo"))
    localStorage.setItem("todo", JSON.stringify(todo))
}

if (localStorage.getItem("doing"))
{
    doing = JSON.parse(localStorage.getItem("doing"))
    localStorage.setItem("doing", JSON.stringify(doing))
}

if (localStorage.getItem("completed")) 
{
    completed = JSON.parse(localStorage.getItem("completed"))
    localStorage.setItem("completed", JSON.stringify(completed))
}

if (localStorage.getItem("block")) 
{
    block = JSON.parse(localStorage.getItem("block"))
    localStorage.setItem("block", JSON.stringify(block))
}

let taskTodo = document.getElementById('todo')
let taskDoing = document.getElementById('doing')
let taskCompleted = document.getElementById('completed')
let taskBlock = document.getElementById('block')

render()
renderNumber()


// clock
function getCurrentTime() {
    const now = new Date();
    const month = now.toLocaleString('en', { month: 'long' })
    const day = now.getDate()
    const year = now.getFullYear()
    return `${month} ${day}, ${year}`
}
let popupMain = document.querySelector("#modal-body") // modal container
console.log(popupMain); 

// add task
popupMain.addEventListener('submit', function(event) {
    event.preventDefault()

    let captionStyle = document.querySelector('.modal-a-title')
    let titleStyle = document.querySelector('.modal-body-title')
    let contentStyle = document.querySelector('.modal-body-content')
    
    let caption = document.querySelector('.modal-a-title').value // biến caption bằng nội dung của caption trong modal
    let title = document.querySelector('.modal-body-title').value
    let content = document.querySelector('.modal-body-content').value

    if (!caption || !title || !content) {
        if (!caption) 
        {
            captionStyle.style.border = "2px solid red"
        } 
        else 
        {
            captionStyle.style.border = "1px solid green"
        }

        if (!title) 
        {
            titleStyle.style.border = "2px solid red"
        }
         else 
        {
            titleStyle.style.border = "1px solid green"
        }

        if (!content) {
            contentStyle.style.border = "2px solid red"
        } else {
            contentStyle.style.border = "1px solid green"
        }
        return
    } 
    else
    {
        captionStyle.style.border = "1px solid rgba(0, 0, 0, 0.5)"
        titleStyle.style.border = "1px solid rgba(0, 0, 0, 0.5)"
        contentStyle.style.border = "1px solid rgba(0, 0, 0, 0.5)"
    }

    let currentTime = getCurrentTime();

    let task = {
        caption: caption,
        title: title,
        content: content,
        time: currentTime
    }
    todo.push(task)
    localStorage.setItem("todo", JSON.stringify(todo))
    render()
    document.querySelector('.modal-a-title').value = "" // biến caption bằng nội dung của caption trong modal
    document.querySelector('.modal-body-title').value =""
    document.querySelector('.modal-body-content').value=""
    popupContainer.classList.toggle('active')
    renderNumber()
})

// update number for each status
function renderNumber() {
    let todoNumber = document.querySelector('.todo-num')
    let doingNumber = document.querySelector('.doing-num')
    let completedNumber = document.querySelector('.completed-num')
    let blockNumber = document.querySelector('.block-num')

    todoNumber.innerHTML = todo.length
    doingNumber.innerHTML = doing.length
    completedNumber.innerHTML = completed.length
    blockNumber.innerHTML = block.length
}

// //delete task
// function onDelete(index, type) {
//     if (type === 'todo') {
//         todo.splice(index, 1)
//         localStorage.setItem("todo", JSON.stringify(todo))
//         render()
//     } else if (type === 'doing') {
//         doing.splice(index, 1)
//         localStorage.setItem("doing", JSON.stringify(doing))
//         render()
//     } else if (type === 'completed') {
//         completed.splice(index, 1)
//         localStorage.setItem("completed", JSON.stringify(completed))
//         render()
//     } else {
//         block.splice(index, 1)
//         localStorage.setItem("block", JSON.stringify(block))
//         render()
//     }
//     renderNumber()
// }


// edit task

/* OPEN MODAL to edit new task */
let modal_edit = document.getElementById("modal-edit");
console.log(modal_edit)

let edit = document.querySelector('.edit'); // chỉnh việc bằng nút edit
console.log(edit)


//show modal
function ShowModalEdit(){
    modal_edit.classList.add('open');
}
edit.addEventListener('click', ShowModalEdit);

//close modal
let edit_close = document.querySelector('.edit-close');
function CloseModalEdit(){
    modal_edit.classList.remove('open');
}
edit_close.addEventListener('click', CloseModalEdit);

function render() { 
    // render task todo
    let elements = todo.map((item, index) => {
        return `
        <div class="todo-item">  
                           <div class="item-row1">
                                   <div class="item-row1-col1">
                                       <a href="#" class="caption">${item.caption}</a>  <!-- // nội dung cần get -->
                                       <h2 class="title">${item.title}</h2>  <!--  nội dung cần get -->
                                       <div class="line"></div>
                                   </div>
                                   <div class="item-row1-col2">
                                       <i class="edit fa-regular fa-pen-to-square"></i>
                                       <i class="delete fa-solid fa-trash"></i>
                                   </div>
                           </div>
                           <div class="item-row2">
                                   <p class="todo-content">${item.content}</p> <!--  nội dung cần get -->
                                   <div class="todo-time">
                                       <i class="todo-clock fa-regular fa-clock"></i>
                                       <span class="class-time">${item.time}</span> <!-- cần cho đúng time thêm việc -->
                                   </div>
                           </div>
        </div>
        `
    })

    taskTodo.innerHTML = elements.join('')
    // render task doing
    elements = doing.map((item, index) => {
        return `
        <div class="todo-item">  
                           <div class="item-row1">
                                   <div class="item-row1-col1">
                                       <a href="#" class="caption">${item.caption}</a>  <!-- // nội dung cần get -->
                                       <h2 class="title">${item.title}</h2>  <!--  nội dung cần get -->
                                       <div class="line"></div>
                                   </div>
                                   <div class="item-row1-col2">
                                       <i class="edit fa-regular fa-pen-to-square"></i>
                                       <i class="delete fa-solid fa-trash"></i>
                                   </div>
                           </div>
                           <div class="item-row2">
                                   <p class="todo-content">${item.content}</p> <!--  nội dung cần get -->
                                   <div class="todo-time">
                                       <i class="todo-clock fa-regular fa-clock"></i>
                                       <span class="class-time">${item.time}</span> <!-- cần cho đúng time thêm việc -->
                                   </div>
                           </div>
        </div>
        `
    })
    // render task completed
    taskDoing.innerHTML = elements.join('')
    elements = completed.map((item, index) => {
        return `
        <div class="todo-item">  
                           <div class="item-row1">
                                   <div class="item-row1-col1">
                                       <a href="#" class="caption">${item.caption}</a>  <!-- // nội dung cần get -->
                                       <h2 class="title">${item.title}</h2>  <!--  nội dung cần get -->
                                       <div class="line"></div>
                                   </div>
                                   <div class="item-row1-col2">
                                       <i class="edit fa-regular fa-pen-to-square"></i>
                                       <i class="delete fa-solid fa-trash"></i>
                                   </div>
                           </div>
                           <div class="item-row2">
                                   <p class="todo-content">${item.content}</p> <!--  nội dung cần get -->
                                   <div class="todo-time">
                                       <i class="todo-clock fa-regular fa-clock"></i>
                                       <span class="class-time">${item.time}</span> <!-- cần cho đúng time thêm việc -->
                                   </div>
                           </div>
        </div>
        `
    })
    // render task block
    taskCompleted.innerHTML = elements.join('')
    elements = block.map((item, index) => {
        return `
        <div class="todo-item">  
                           <div class="item-row1">
                                   <div class="item-row1-col1">
                                       <a href="#" class="caption">${item.caption}</a>  <!-- // nội dung cần get -->
                                       <h2 class="title">${item.title}</h2>  <!--  nội dung cần get -->
                                       <div class="line"></div>
                                   </div>
                                   <div class="item-row1-col2">
                                       <i class="edit fa-regular fa-pen-to-square"></i>
                                       <i class="delete fa-solid fa-trash"></i>
                                   </div>
                           </div>
                           <div class="item-row2">
                                   <p class="todo-content">${item.content}</p> <!--  nội dung cần get -->
                                   <div class="todo-time">
                                       <i class="todo-clock fa-regular fa-clock"></i>
                                       <span class="class-time">${item.time}</span> <!-- cần cho đúng time thêm việc -->
                                   </div>
                           </div>
        </div>
        `
    })
    taskBlock.innerHTML = elements.join('')
}

render();
renderNumber();



