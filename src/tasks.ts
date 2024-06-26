const taskFrom = document.querySelector<HTMLFormElement>('.form')
const fromInput = document.querySelector<HTMLInputElement>('.form-input')
const taskListElement = document.querySelector<HTMLUListElement>('.list')

type Task = {
	description: string
	isCompleted: boolean
}

const tasks: Task[] = loadTask()

tasks.forEach(renderTask)

function loadTask(): Task[] {
	const storedTasks = localStorage.getItem('tasks')
	return storedTasks ? JSON.parse(storedTasks) : []
}

taskFrom?.addEventListener('submit', e => {
	e.preventDefault()
	const taskDescription = fromInput?.value

	if (taskDescription) {
		const task: Task = {
			description: taskDescription,
			isCompleted: false,
		}

		// add task to list
		addTask(task)

		// render tasks
		renderTask(task)

		// update ls
		updateStorage()

		fromInput.value = ''
		return
	}
	alert('Please enter Your task')
})

function addTask(task: Task): void {
	tasks.push(task)
}

function renderTask(task: Task): void {
	const taskElement = document.createElement('li')
	taskElement.textContent = task.description

	const taskCheckbox = document.createElement('input')
	taskCheckbox.type = 'checkbox'
	taskCheckbox.checked = task.isCompleted

	taskCheckbox.addEventListener('change', () => {
		task.isCompleted = !task.isCompleted
		updateStorage()
	})

	taskElement.appendChild(taskCheckbox)

	if (taskListElement) {
		taskListElement.appendChild(taskElement)
	}
}

function updateStorage(): void {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}
