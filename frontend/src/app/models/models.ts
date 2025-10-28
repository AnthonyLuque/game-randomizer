export interface Criterion {
    id: number;
    name: string;
}

export interface Game {
    id: number;
    title: string;
    criteria: Criterion[];
}

export interface Player {
    id: number;
    username: string;
    gamesOwned: Game[];
}