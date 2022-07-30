import { compareAsc, format } from 'date-fns'

const addProjectBtn = document.querySelector('.add-project-btn')
const inputProjectDiv = document.querySelector('#input-project-div')
const submitProjectBtn = document.querySelector('.submit-project-btn')
const cancelProjectBtn = document.querySelector('.cancel-project-btn')
const projectNameInput = document.querySelector('.project-title')
const removeProjectBtn = document.querySelector('.remove-project')

const addTaskBtn = document.querySelector('.add-task-btn')
const inputTaskDiv = document.querySelector('#input-task-div')
const submitTaskBtn = document.querySelector('.submit-task-btn')
const cancelTaskBtn = document.querySelector('.cancel-task-btn')
const taskNameInput = document.querySelector('.task-title')
const taskDateInput = document.querySelector('input[type="date"]')
const taskListDiv = document.querySelector('.content')
const taskList = document.querySelector('.tasks')

const LOCAL_STORAGE_TODO_LIST = 'todos'
const LOCAL_STORAGE_SELECTED_PROJECT = 'selectedProject'
const LOCAL_STORAGE_SELECTED_TASK = 'selectedTask'

let todoList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODO_LIST)) || []
let selectedProject = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT);
let selectedTask = localStorage.getItem(LOCAL_STORAGE_SELECTED_TASK);

addProjectBtn.addEventListener('click', (e) => {
    e.target.classList.add('hide');
    inputProjectDiv.classList.remove('hide')
})



submitProjectBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if(projectNameInput.value === '' || projectNameInput.value == null) return
    if(ifExist(projectNameInput.value, todoList) === true) return alert('This project already exist')
    addProjectBtn.classList.remove('hide');
    inputProjectDiv.classList.add('hide');
    const list = createProjectList(projectNameInput.value)
    projectNameInput.value = null;
    todoList.push(list)
    renderProject()
    save()
    renderTask()
})

submitTaskBtn.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(taskDateInput.value)
    if(taskNameInput.value === '' || taskNameInput.value == null) return
    if(taskDateInput.value === '' || taskDateInput.value == null) {
        taskDateInput.value = format(new Date(), 'yyyy-MM-dd')
    }
    addTaskBtn.classList.remove('hide');
    inputTaskDiv.classList.add('hide');
    const list = createTaskList(taskNameInput.value, taskDateInput.value)
    taskNameInput.value = null;
    taskDateInput.value = null;
    const selectedProjectArr = todoList.find(task => task.category === selectedProject)
    selectedProjectArr.tasks.push(list)
    renderProject()
    save()
    renderTask()
})

const createProjectList = (name) => {
    return { category: name, tasks: []  }
}

const createTaskList = (name, date) => {
    return { name: name, date: date }
}

const save = () => {
    localStorage.setItem(LOCAL_STORAGE_TODO_LIST, JSON.stringify(todoList))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT, selectedProject)
    localStorage.getItem(LOCAL_STORAGE_SELECTED_TASK, selectedTask)
}


cancelProjectBtn.addEventListener('click', () => {
    addProjectBtn.classList.remove('hide');
    inputProjectDiv.classList.add('hide')
})

addTaskBtn.addEventListener('click', (e) => {
    e.target.classList.add('hide');
    inputTaskDiv.classList.remove('hide')
})

submitTaskBtn.addEventListener('click', (e) => {
    if(taskNameInput.value === '') return
    addTaskBtn.classList.remove('hide');
    inputTaskDiv.classList.add('hide')
})


cancelTaskBtn.addEventListener('click', () => {
    addTaskBtn.classList.remove('hide');
    inputTaskDiv.classList.add('hide')
})

const projectList = document.querySelector('.projects-list')

projectList.addEventListener('click', (e) => {
    if(e.target.tagName.toLowerCase() === 'li') {
        selectedProject = e.target.id;
        renderProject()
        save()
        renderTask()
    } else if(e.target.tagName.toLowerCase() === 'span') {
        todoList = todoList.filter(item => item.category !== selectedProject)
        selectedProject = null
        save()
        renderProject()
        renderTask()
    }
    
})

taskList.addEventListener('click', (e) => {
    if(e.target.tagName.toLowerCase() === 'p') {
        selectedTask = e.target.id;
        renderProject()
        save()
        renderTask()
    } else if(e.target.tagName.toLowerCase() === 'span') {
      todoList.forEach(arr => {
        arr.tasks.forEach (ele => {
            if(ele.name === selectedTask) {
                arr.tasks.splice(arr.tasks.indexOf(ele), 1);
            }
        })
    })
        selectedTask = null
        save()
        renderProject()
        renderTask()
    }
})

const ifExist = (obj, list) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].category === obj) {
            return true;
        }
    } 
    return false;
}

const renderProject = () => {
    projectList.innerHTML = ''
    todoList.forEach(project => {
        const projectItem = document.createElement('li');
        projectItem.id = project.category
        projectItem.classList.add('flex')
        projectItem.textContent = project.category;
        const span = document.createElement('span')
        span.classList.add('remove-project');
        span.textContent = '🗑';
        if (project.category === selectedProject) {
            projectItem.classList.add('selected')
        }
        projectItem.appendChild(span)
        projectList.appendChild(projectItem)

    })
}


const projectTitle = document.querySelector('.projectTitle')

const renderTask = () => {
    if(selectedProject == 'null' || selectedProject == null) {
        taskListDiv.classList.add('hide')
    } else {
        taskListDiv.classList.remove('hide')
        projectTitle.textContent = selectedProject
    }

    taskList.innerHTML = ''
    const selectedProjectArr = todoList.find(task => task.category === selectedProject)
    selectedProjectArr.tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('flex')
        const taskTitle = document.createElement('p')
        taskTitle.id = task.name
        taskTitle.textContent = `${task.name}, due Date: ${task.date}`;
        const taskSpan = document.createElement('span')
        taskSpan.classList.add('remove-task')
        taskSpan.textContent = '🗑'
        if (task.name === selectedTask) {
            taskTitle.classList.add('selected')
        }
        taskItem.append(taskTitle, taskSpan)
        taskList.appendChild(taskItem)

    })
}


renderTask()
renderProject()
