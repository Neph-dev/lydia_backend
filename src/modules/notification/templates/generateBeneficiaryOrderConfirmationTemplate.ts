import { Order } from '../../order/domain/Order';
import { Supplier } from '../../supplier/domain/Supplier';
import { Beneficiary } from '../../beneficiary/domain/Beneficiary';
import { Item } from '../../item/domain/Item';
import { baseEmailTemplate, emailHeader } from './baseEmailTemplate';

export const generateBeneficiaryOrderConfirmationTemplate = (
    beneficiary: Beneficiary,
    order: Order,
    supplier: Supplier,
    itemsWithDetails: Array<{ item: Item, quantity: number; }>
): string => {
    const orderDate = new Date(order.orderDate).toLocaleDateString();
    const estimatedPickupDate = new Date(order.orderDate);
    estimatedPickupDate.setDate(estimatedPickupDate.getDate() + 1);

    const content = `
    ${emailHeader('Order Confirmation')}
    <div style="padding: 20px;">
      <p>Hello ${beneficiary.name},</p>
      <p>Thank you for your order. Your request has been successfully placed and is being processed.</p>
      
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <h2 style="color: #4a6f8a; margin-top: 0;">Order Summary</h2>
        <p><strong>Order ID:</strong> ${order.orderId}</p>
        <p><strong>Date Placed:</strong> ${orderDate}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <p><strong>Supplier:</strong> ${supplier.name}</p>
        <p><strong>Supplier Address:</strong> ${supplier.address.line1}, ${supplier.address.city}</p>
        <p><strong>Estimated Pickup Date:</strong> ${estimatedPickupDate.toLocaleDateString()}</p>
      </div>
      
      <h3 style="color: #4a6f8a; margin-top: 30px;">Items Ordered:</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr style="background-color: #ececec;">
            <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Item</th>
            <th style="padding: 10px; text-align: center; border-bottom: 1px solid #ddd;">Quantity</th>
            <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Category</th>
          </tr>
        </thead>
        <tbody>
          ${itemsWithDetails.map(({ item, quantity }) => `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
              <td style="padding: 10px; text-align: center; border-bottom: 1px solid #ddd;">${quantity}</td>
              <td style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">${item.category}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div style="margin-top: 30px; padding: 15px; background-color: #f0f7ff; border-radius: 5px;">
        <h3 style="color: #4a6f8a; margin-top: 0;">Pickup Instructions</h3>
        <p>Please bring your order ID when picking up your items. The supplier may ask to verify your identity.</p>
        <p>If you need to change or cancel your order, please contact us as soon as possible.</p>
      </div>
      
      <p style="margin-top: 30px;">Thank you for using our platform to reduce food waste and support our community.</p>
      <p>Best regards,<br>The Lydia Team</p>
    </div>
  `;

    return baseEmailTemplate(content);
};