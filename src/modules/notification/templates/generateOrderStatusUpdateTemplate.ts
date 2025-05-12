import { Order } from '../../order/domain/Order';
import { Beneficiary } from '../../beneficiary/domain/Beneficiary';
import { baseEmailTemplate, emailHeader } from './baseEmailTemplate';
import { OrderStatus } from '../../order/types';

export const generateOrderStatusUpdateTemplate = (
    beneficiary: Beneficiary,
    order: Order,
    oldStatus: OrderStatus,
    newStatus: OrderStatus
): string => {
    const content = `
    ${emailHeader('Order Status Update')}
    <div style="padding: 20px;">
      <p>Hello ${beneficiary.name},</p>
      <p>The status of your order has been updated.</p>
      <p><strong>Order ID:</strong> ${order.orderId}</p>
      <p><strong>Previous Status:</strong> ${oldStatus}</p>
      <p><strong>New Status:</strong> ${newStatus}</p>
      ${newStatus === OrderStatus.COMPLETED ? '<p>Your order is now complete and ready for collection.</p>' : ''}
      <p>Thank you for using our platform!</p>
      <p>Best regards,<br>The Lydia Team</p>
    </div>
  `;

    return baseEmailTemplate(content);
};