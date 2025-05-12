import { v4 as uuidv4 } from 'uuid';

export const generateOrderCode = (): string => {
    const uuid = uuidv4();
    const orderCode = `#${uuid.replace(/-/g, '').slice(0, 4).toUpperCase()}`;
    return orderCode;
};