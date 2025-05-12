import { v4 as uuidv4 } from 'uuid';

export const generateOrderId = (): string => {
    const uuid = uuidv4();
    const orderId = `#${uuid.replace(/-/g, '').slice(0, 7).toUpperCase()}`;
    return orderId;
};;