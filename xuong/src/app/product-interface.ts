export interface ProductInterface {
    id: string;
    kind: string;
    image: string;
    thumbnail: Array<string>;
    name: string;
    nameNation: string,
    interval: string;
    type: string;
    destination: string;
    time: string;
    transport: Array<string>;
    price: number;
    sale: number;
    preferential: Array<string>;
    review: string;
    start: string;
};
