export interface Board {
    id: string;
    title: string;
    slug: string;
    bg: string
}

export interface Column {
    boardId: string | null
    id: string;
    title: string;
}

export interface Task {
    boardId: string | null
    id: string;
    colId: string;
    title: string;
    description: string;
    completed: boolean;
    minutes: number;
    seconds: number;
    isOn: boolean;
}

