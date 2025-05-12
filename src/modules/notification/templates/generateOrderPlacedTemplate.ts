import { Order } from '../../order/domain/Order';
import { Supplier } from '../../supplier/domain/Supplier';
import { baseEmailTemplate, emailHeader } from './baseEmailTemplate';

/**
 * Generates an email template for order creation notification to supplier
 */
export const generateOrderPlacedTemplate = (supplier: Supplier, order: Order): string => {
    const content = `
    ${emailHeader('New Order Received')}
    <div style="padding: 20px;">
      <p>Hello ${supplier.name},</p>
      <p>A new order has been placed for items from your establishment.</p>
      <p><strong>Order ID:</strong> ${order.orderId}</p>
      <p><strong>Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
      <h3>Order Items:</h3>
      <ul>
        ${order.items.map(item => {
        const itemName = `Item ID: ${item.itemId}`;
        return `<li>${item.quantity}x ${itemName}</li>`;
    }).join('')}
      </ul>
      <p>Please prepare these items for pickup.</p>
      <p>Thank you for your participation in reducing food waste and helping those in need.</p>
      <p>Best regards,<br>The Lydia Team</p>
    </div>
  `;

    return baseEmailTemplate(content);
};