export interface Board {
    id: number;
    title: string;
    columns: Column[];
    slug: string;
    bg: string
}

export interface Column {
    boardId: string | null
    id: string;
    title: string;
    tasks: Task[];
}

export interface Task {
    boardId: string | null
    id: string;
    title: string;
    description: string;
    completed: boolean;
    timer: number;
}

