
export interface Character {
    id: string;
    name: string;
    side: Side,
    power: string,
    description: string
}

export enum Side {
    LIGHT = 'LIGHT',
    DARK = 'DARK'
}
