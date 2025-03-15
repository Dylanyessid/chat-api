// Interface for paginated response
export interface PaginatedResponse<T> {
    status: number;
    data: T[];
    pagination: {
        total?: number;
        page?: number;
        limit: number;
        hasNextPage: boolean;
    };
}

// Function to format paginated data
export const formatPaginatedData = ({ data, status, total, page, limit }) => {
    const skip = (Number(page) - 1) * Number(limit);
    return {
        status,
        data,
        pagination: {
            total,
            page,
            limit,
            hasNextPage: skip + limit < total
        }
    }
}