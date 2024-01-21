import { ChangeEvent, FormEvent, useState } from 'react';
import { PlusCircle } from 'phosphor-react';

import styles from './App.module.css';

import Logo from './assets/logo.svg';
import ClipboardImg from './assets/clipboard.svg';

import { Task } from './components/Task';

interface Task {
	id: number;
	content: string;
	isCompleted: boolean;
}

function App() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [newTask, setNewTask] = useState<string>('');
	const [feedbackMessage, setFeedBackMessage] = useState<string>('');

	const tasksCreated = tasks.length;
	const tasksCompleted = tasks.filter((task) => {
		return task.isCompleted === true;
	}).length;

	function handleCreateNewTask(event: FormEvent) {
		event?.preventDefault();

		if (newTask.length < 1) {
			setFeedBackMessage('Task obrigatório.');

			setTimeout(() => setFeedBackMessage(''), 2000);

			return;
		}

		setTasks([
			...tasks,
			{ id: tasks.length + 1, content: newTask, isCompleted: false },
		]);
		setNewTask('');

		setFeedBackMessage('Task Cadastrado.');

		setTimeout(() => setFeedBackMessage(''), 2000);
	}

	function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
		setNewTask(event?.target.value);
	}

	function handleDeleteTask(taskToDelete: Task): void {
		const tasksWithoutDeletedOne = tasks.filter((task) => {
			return task.id !== taskToDelete.id;
		});

		setTasks(tasksWithoutDeletedOne);
	}

	function handleCompleteTask(taskToComplete: Task): void {
		const tasksWithNewCompletedOne = tasks.map((task) => {
			return taskToComplete.id === task.id
				? { ...task, isCompleted: task.isCompleted ? false : true }
				: task;
		});

		setTasks(tasksWithNewCompletedOne);
	}

	return (
		<>
			<header>
				<img src={Logo} alt="logo do header" />
				<form className={styles.newTask} onSubmit={handleCreateNewTask}>
					<input
						type="text"
						placeholder="Adicione uma nova tarefa"
						onChange={handleNewTaskChange}
						value={newTask}
					/>
					<button type="submit">
						Criar
						<PlusCircle size={20} />
					</button>
				</form>

				<div
					className={
						feedbackMessage === ''
							? styles.hide
							: feedbackMessage === 'Task obrigatório.'
							? styles.failed
							: styles.success
					}
				>
					{feedbackMessage}
				</div>
			</header>

			<div className={styles.content}>
				<div className={styles.infos}>
					<p>
						Tarefas criadas<span>{tasksCreated}</span>
					</p>
					<p>
						Concluídas
						<span>
							{tasksCreated === 0
								? '0'
								: `${tasksCompleted} de ${tasksCreated}`}
						</span>
					</p>
				</div>

				<div className={styles.taskList}>
					{tasks.length === 0 ? (
						<div className={styles.empty}>
							<img src={ClipboardImg} />
							<p>Você ainda não tem tarefas cadastradas</p>
							<p>Crie tarefas e organize seus itens a fazer</p>
						</div>
					) : (
						<ul className={styles.filled}>
							{tasks.map((task) => (
								<Task
									key={task.id}
									task={task}
									onDelete={handleDeleteTask}
									onComplete={handleCompleteTask}
								/>
							))}
						</ul>
					)}
				</div>
			</div>
		</>
	);
}

export default App;
