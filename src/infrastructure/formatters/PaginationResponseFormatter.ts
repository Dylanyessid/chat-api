export interface PaginatedResponse<T> {
    status:number
    data: T[]; // Los datos paginados (por ejemplo, mensajes)
    pagination: {
        total?: number; // Total de elementos (opcional)
        page?: number;  // Página actual (opcional)
        limit: number;  // Límite de elementos por página
        hasNextPage: boolean; // ¿Hay más páginas?
    };
}

export const formatPaginatedData = ({data, status, total, page, limit}) =>{
    const skip = (Number(page) - 1) * Number(limit);
    return {
        status,
        data,
        pagination:{
            total,
            page,
            limit,
            hasNextPage:skip + limit < total
        }
}
}