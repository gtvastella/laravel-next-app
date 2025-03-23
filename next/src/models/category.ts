import api, { BaseResponse } from '../utils/api';
export interface Category {
    id: number;
    name: string;
}

export interface CategoriesResponse extends BaseResponse{
    data: {
        categories: Category[];
        total: number;
    };
}
export const fetchCategories = async (
): Promise<CategoriesResponse> => {
    const fakeCategoriesResponse: CategoriesResponse = {
        success: false,
        message: "Erro ao buscar categorias",
        data: {
            categories: [],
            total: 0,
        },
    };

    try {
        const response = await api.get('/categories');
        try {
            const categoriesResponse = response.data as CategoriesResponse;
            return categoriesResponse;
        } catch (error : any) {
            fakeCategoriesResponse.message = response.data?.data?.message ?? "Erro ao buscar categorias";
            console.error('Error fetching categories:', error);
            return fakeCategoriesResponse;
        }
    } catch (error : any) {
        fakeCategoriesResponse.message = error.response?.data?.message ?? "Erro ao buscar categorias";
        console.error('Error fetching categories:', error);
        return fakeCategoriesResponse;
    }
};
