import { Trash } from 'phosphor-react';

import styles from './Task.module.css';

interface Task {
	id: number;
	content: string;
	isCompleted: boolean;
}

interface taskProps {
	task: Task;
	onDelete: (task: Task) => void;
	onComplete: (task: Task) => void;
}

export function Task({ task, onDelete, onComplete }: taskProps) {
	return (
		<li className={styles.taskItem} key={task.id}>
			<input
				type="checkbox"
				onChange={() => onComplete(task)}
				checked={task.isCompleted}
			/>
			<p>{task.content}</p>
			<button>
				<Trash size={20} onClick={() => onDelete(task)} />
			</button>
		</li>
	);
}
