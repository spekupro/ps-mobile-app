export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    imageUrl?: string;
    category?: string;
    inStock: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ProductFormData {
    name: string;
    description: string;
    price: number;
    category?: string;
    inStock: boolean;
}