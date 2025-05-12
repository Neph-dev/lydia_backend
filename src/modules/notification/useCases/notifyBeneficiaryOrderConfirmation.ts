import { Order } from '../../order/domain/Order';
import { MongooseBeneficiaryRepo } from '../../beneficiary/infra/BenefiaciaryRepo';
import { MongooseSupplierRepo } from '../../supplier/infra/SupplierRepo';
import { MongooseItemRepo } from '../../item/infra/ItemRepo';
import { sendEmail } from '../handlers/emailHandler';
import { generateBeneficiaryOrderConfirmationTemplate } from '../templates/generateBeneficiaryOrderConfirmationTemplate';

export const notifyBeneficiaryOrderConfirmation = async (order: Order): Promise<boolean> => {
    try {
        const beneficiaryRepo = new MongooseBeneficiaryRepo();
        const supplierRepo = new MongooseSupplierRepo();
        const itemRepo = new MongooseItemRepo();

        const beneficiary = await beneficiaryRepo.findById(order.beneficiaryId.toString());
        if (!beneficiary) {
            console.error(`Beneficiary not found for ID: ${order.beneficiaryId}`);
            return false;
        }

        const supplier = await supplierRepo.findById(order.supplierId.toString());
        if (!supplier) {
            console.error(`Supplier not found for ID: ${order.supplierId}`);
            return false;
        }

        const itemsWithDetails = await Promise.all(
            order.items.map(async (orderItem) => {
                const item = await itemRepo.findById(orderItem.itemId.toString());
                if (!item) {
                    console.error(`Item not found for ID: ${orderItem.itemId}`);
                    throw new Error(`Item not found for ID: ${orderItem.itemId}`);
                }
                return {
                    item,
                    quantity: orderItem.quantity
                };
            })
        );

        const emailContent = generateBeneficiaryOrderConfirmationTemplate(
            beneficiary,
            order,
            supplier,
            itemsWithDetails
        );

        await sendEmail({
            to: beneficiary.emailAddress,
            subject: `Order Confirmation #${order.orderId}`,
            html: emailContent
        });

        return true;
    } catch (error) {
        console.error('Failed to send beneficiary order confirmation:', error);
        return false;
    }
};