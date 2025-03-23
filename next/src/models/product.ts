import api, { BaseResponse } from '../utils/api';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category_id: number;
    category_name: string;
}

export interface ProductsResponse extends BaseResponse {
    data: {
        products: Product[];
        total: number;
        perPage: number;
        currentPage: number;
        totalPages: number;
    };
}

export interface ProductResponse extends BaseResponse {
    data: Product;
}

export const fetchProducts = async (
    page: number | null = null,
    perPage: number | null = null,
    categoryId: number | null = null,
    searchQuery: string | null = null
): Promise<ProductsResponse> => {
    const fakeProductsResponse: ProductsResponse = {
        success: false,
        message: "Erro ao buscar produtos",
        data: {
            products: [],
            total: 0,
            perPage: 0,
            currentPage: 0,
            totalPages: 0,
        },
    };

    try {
        const params: { [key: string]: any } = {};
        if (page != null) params['page'] = page;
        if (perPage != null) params['per_page'] = perPage;
        if (categoryId != null) params['category_id'] = categoryId;
        if (searchQuery != null && searchQuery.trim() !== '') params['search'] = searchQuery;


        const response = await api.get('/products', {
            params: params,
        });
        return response.data as ProductsResponse;
    } catch (error: any) {
        if (!error.response) {
            console.error('Network error:', error);
            return fakeProductsResponse;
        }
        console.error('Error fetching products:', error);
        fakeProductsResponse.message = error.response?.data?.message ?? "Erro ao buscar produtos";
        return fakeProductsResponse;
    }
};

export const fetchProduct = async (productId: number): Promise<ProductResponse> => {
    const fakeProductResponse: ProductResponse = {
        success: false,
        message: "Erro ao buscar produto",
        data: {
            id: 0,
            name: "",
            description: "",
            price: 0,
            image_url: "",
            category_id: 0,
            category_name: "",
        },
    };

    try {
        const response = await api.get(`/products/${productId}`);
        return response.data as ProductResponse;
    } catch (error: any) {
        if (!error.response) {
            console.error('Network error:', error);
            return fakeProductResponse;
        }
        console.error('Error fetching product:', error);
        fakeProductResponse.message = error.response?.data?.message ?? "Erro ao buscar produto";
        return fakeProductResponse;
    }
}
