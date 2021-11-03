export const Unauthorized = () => ({
    status: 401,
    body: { message: 'Unauthorized' }
});

export const NotFound = (value) => ({
    status: 404,
    body: { message: `${value} not found` }
});