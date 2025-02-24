export interface Board {
    id: number;
    title: string;
    columns: Column[];
    slug: string;
}

export interface Column {
    generalId: string;
    id: string;
    title: string;
    tasks: Task[];
}

export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    timer: number;
}

