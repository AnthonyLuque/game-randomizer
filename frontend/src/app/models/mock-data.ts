import {Player, Game, Criterion} from './models';

export const mockCriteria: Criterion[] = [
    { id: 1, name: "Stratégie" },
    { id: 2, name: "Réflexion" },
    { id: 3, name: "Aventure" },
    { id: 4, name: "Action" },
    { id: 5, name: "Coop" },
    { id: 6, name: "RPG" },
    { id: 7, name: "Gestion" }
];

export const mockGames: Game[] = [
    { id: 1, title: "Minecraft", criteria: [mockCriteria[2]] },
    { id: 2, title: "MicroWorks", criteria: [mockCriteria[1]] },
    { id: 3, title: "The Legend of Zelda: Breath of the Wild", criteria: [mockCriteria[2], mockCriteria[5]] },
    { id: 4, title: "Civilization VI", criteria: [mockCriteria[0], mockCriteria[1], mockCriteria[6]] },
    { id: 5, title: "Dark Souls III", criteria: [mockCriteria[1], mockCriteria[3], mockCriteria[5]] },
    { id: 6, title: "Overcooked! 2", criteria: [mockCriteria[3], mockCriteria[4]] }
];

export const mockPlayers: Player[] = [
    { id: 1, username: "DAPM", gamesOwned: [mockGames[0], mockGames[1], mockGames[3], mockGames[5]] },
    { id: 2, username: "Lokhéo", gamesOwned: [mockGames[0], mockGames[1], mockGames[2], mockGames[5]] },
    { id: 3, username: "AEKNIO", gamesOwned: [mockGames[0], mockGames[1], mockGames[4], mockGames[5]] },
    { id: 4, username: "Magivra", gamesOwned: [mockGames[0], mockGames[1], mockGames[3], mockGames[5]] },
    { id: 5, username: "MiraZonshi", gamesOwned: [mockGames[1], mockGames[3]] },
    { id: 6, username: "Romain", gamesOwned: [mockGames[0], mockGames[1], mockGames[4], mockGames[5]] },
    { id: 7, username: "Feyriss", gamesOwned: [mockGames[0]] }
];