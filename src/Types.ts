export interface Board {
    id: string;
    title: string;
    slug: string;
    bg: string;
    userId: string | null;
    timerCounter: number;
    timerMinutes: number;
    timerHours: number;
}

export interface Column {
    boardId: string | null;
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
    hasTimer: boolean;
}

export interface Timer {
    id: string;
    boardId: string;
    colId: string;
    taskId: string;
    minutes: number;
    seconds: number;
    isOn: boolean;
    fixedPomodoroTime: number;
    fixedBreakTime: number;
    breakTime: boolean;
}

