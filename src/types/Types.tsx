export interface UserType {
    id: string,
    username: string,
    password: string,
    balance: number
}

export interface AppSlicepType {
    currentUser: UserType | null,
    loading: boolean,
    products: ProductType[]
}

export interface CheckUserType {
    result: boolean,
    currentUser: UserType | null
}

export interface ProductType {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    count?: number,
    rating: RatingType
}

export interface RatingType {
    rate: number,
    count: number
}

export interface ProductCardProps {
    product: ProductType
}

export interface BasketSliceType {
    basket: ProductType[]
}

