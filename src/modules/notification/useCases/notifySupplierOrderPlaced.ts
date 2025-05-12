import { Order } from '../../order/domain/Order';
import { MongooseSupplierRepo } from '../../supplier/infra/SupplierRepo';
import { sendEmail } from '../handlers/emailHandler';
import { generateOrderPlacedTemplate } from '../templates/generateOrderPlacedTemplate';

/**
 * Sends a notification to a supplier when an order is placed
 */
export const notifySupplierOrderPlaced = async (order: Order): Promise<boolean> => {
    try {
        const supplierRepo = new MongooseSupplierRepo();
        const supplier = await supplierRepo.findById(order.supplierId.toString());

        if (!supplier) {
            console.error(`Supplier not found for ID: ${order.supplierId}`);
            return false;
        }

        const emailContent = generateOrderPlacedTemplate(supplier, order);

        await sendEmail({
            to: supplier.emailAddress,
            subject: `New Order Received (${order.orderId})`,
            html: emailContent
        });

        return true;
    } catch (error) {
        console.error('Failed to send order notification:', error);
        return false;
    }
};