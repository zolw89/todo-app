const taskList = document.querySelector('.tasks');

const todos = 
JSON.parse(localStorage.getItem('todos')) || 
[
    {
        category: 'Not categorized',
        tasks: [],
    }
];


// check if project exist already in array
const ifExist = (obj, list) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].category === obj) {
            return true;
        }
    } 
    return false;
}

//add new project to todos array

const findTask = (task) => {
    todos.forEach(arr => {
        arr.tasks.forEach (ele => {
            if(ele === task) {
                console.log(ele, arr.category)
            }
        })
    })
}
findTask('banan')

const newProject = (name) => {
    const project = {
        category: name,
        tasks: []};
        
    if(ifExist(name, todos) !== true) {
        todos.push(project);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderProjects()
    }
    return todos
}

//add new task to project
const addTask = (task, category = "Not categorized") => {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].category === category) {
            let arr = todos[i].tasks;
            let oldTask = arr.find(el => el === task)
            if (oldTask === task) return;
            todos[i].tasks.push(task);
            localStorage.setItem('todos', JSON.stringify(todos));
        } 
    }
    return todos
}

//remove project from todos
const removeProject = (category) => {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].category === category) {
            todos.splice(i, 1)
            localStorage.setItem('todos', JSON.stringify(todos));
        } 
    }
    return todos
}

//remove task form todo list
const removeTask = (task, category = "Not Categorized") => {
    todos.forEach(arr => {
        arr.tasks.forEach (ele => {
            if(ele === task) {
                arr.tasks.splice(ele, 1);
                localStorage.setItem('todos', JSON.stringify(todos))
            }
        })
    })

    return todos

    // for (let i = 0; i < todos.length; i++) {
    //     if (todos[i].category === category) {
    //         for(let j = 0; j < todos[i].tasks.length; j++) {
    //             if(todos[i].tasks[j] === task) {
    //                 todos[i].tasks.splice(j, 1)
    //                 localStorage.setItem('todos', JSON.stringify(todos));
    //             }
    //         }

    //     } 
    // }
    // return todos
}

let arr = []

const filteredArr = (cat) => {
    arr = []
    todos.filter((item) => {
        if(item.category === cat) {
            item.tasks.forEach(el => arr.push(el))
        }
    }) 
    return arr
}
filteredArr()

const renderTasks = () => {
    taskList.innerHTML = ''
    todos.forEach(element => {
    element.tasks.forEach(item => {
        const taskDiv = document.createElement('div');
        taskDiv.textContent = item;
        taskList.appendChild(taskDiv)
    })   
});
}

const projectListDiv = document.querySelector('.projects-list')

const renderProjects = () => {
    projectListDiv.innerHTML = ''
    todos.forEach(element => {
        const taskDiv = document.createElement('li');
        taskDiv.className = 'projectItem';
        taskDiv.id = element.category
        taskDiv.textContent = element.category;
        projectListDiv.appendChild(taskDiv)
    })   
}

const displayedTitle = document.querySelector('.projectTitle')

const renderProjectArr = () => {
    const projectArr = document.querySelectorAll('.projectItem')
    // const projectNameArr = []
    // projectArr.forEach(el => {
    //     projectNameArr.push(el.id)
    // })

    projectArr.forEach(el => el.addEventListener('click', (e) => {
        taskList.innerHTML = ''
        filteredArr(e.target.id)
        displayedTitle.innerHTML = e.target.id;
        displayedTitle.id = e.target.id;
        taskList.id = e.target.id;
        arr.forEach(item => {
            const taskDiv = document.createElement('div');
            taskDiv.textContent = item;
            taskList.appendChild(taskDiv)

        })}))
}



//show input to add task

const addTaskBtn = document.querySelector('.add-task')
const inputDiv = document.querySelector('#input-div')
const cancelBtn = document.querySelector('.cancel-btn')
const addBtn = document.querySelector('.addBtn')
const taskNameInput = document.querySelector('.task-title')
const formDiv = document.querySelector('.form-task')
const projectTitle = document.querySelector('.tasks')


addTaskBtn.addEventListener('click', (e) => {
    e.target.classList.add('hide');
    inputDiv.classList.remove('hide')
})

addBtn.addEventListener('click', (e) => {
    if(taskNameInput.value === '') return
    addTaskBtn.classList.remove('hide');
    inputDiv.classList.add('hide')
    addTask(taskNameInput.value, taskList.id) // projectTitle.id dodac pozniej
    renderTasks()
    clearInputs()
})

cancelBtn.addEventListener('click', () => {
    addTaskBtn.classList.remove('hide');
    inputDiv.classList.add('hide')
})

const clearInputs = () => {
    document.querySelector('form').reset()
};

//show input to add project

const addProjectBtn = document.querySelector('.add-new')
const inputProjectDiv = document.querySelector('#input-project')
const cancelProjectBtn = document.querySelector('.cancel-project-btn')
const submitProjectBtn = document.querySelector('.addProjectBtn')
const projectNameInput = document.querySelector('.project-title')
const formProjectDiv = document.querySelector('.form-project')

addProjectBtn.addEventListener('click', (e) => {
    e.target.classList.add('hide');
    inputProjectDiv.classList.remove('hide')
})

submitProjectBtn.addEventListener('click', (e) => {
    if(projectNameInput.value === '') return
    addProjectBtn.classList.remove('hide');
    inputProjectDiv.classList.add('hide')
    newProject(projectNameInput.value)
    renderProject()
    renderProjectArr()
    clearInputs()
})


cancelProjectBtn.addEventListener('click', () => {
    addProjectBtn.classList.remove('hide');
    inputProjectDiv.classList.add('hide')
})

renderTasks()
renderProjects()
renderProjectArr()
console.log(todos)