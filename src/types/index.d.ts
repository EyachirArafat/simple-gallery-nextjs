export interface ICard {
    id: string;
    src: string;
    title: string;
    des: string;
    like: number;
    share: number;
    index?: number
    types?: string
}

export interface IChildren {
    children: React.ReactNode
}
