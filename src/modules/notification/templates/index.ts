import { OrderStatus } from '../../order/types';
import { ItemStatus } from '../../item/types';
import { Supplier } from '../../supplier/domain/Supplier';
import { Beneficiary } from '../../beneficiary/domain/Beneficiary';
import { Order } from '../../order/domain/Order';
import { Item } from '../../item/domain/Item';

/**
 * Generates an email template for order creation notification
 */
export const generateOrderPlacedTemplate = (supplier: Supplier, order: Order): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
      <h1 style="color: #4a6f8a;">New Order Received</h1>
      <p>Hello ${supplier.name},</p>
      <p>A new order has been placed for items from your establishment.</p>
      <p><strong>Order ID:</strong> ${order.orderId}</p>
      <p><strong>Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
      <h3>Order Items:</h3>
      <ul>
        ${order.items.map(item => `<li>${item.quantity}x Item ID: ${item.itemId}</li>`).join('')}
      </ul>
      <p>Please prepare these items for pickup.</p>
      <p>Thank you for your participation in reducing food waste and helping those in need.</p>
      <p>Best regards,<br>The Lydia Team</p>
    </div>
  `;
};

/**
 * Generates an email template for item status change notification
 */
export const generateItemStatusUpdateTemplate = (beneficiary: Beneficiary, item: Item, oldStatus: ItemStatus, newStatus: ItemStatus): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
      <h1 style="color: #4a6f8a;">Item Status Update</h1>
      <p>Hello ${beneficiary.name},</p>
      <p>The status of an item you've claimed has been updated.</p>
      <p><strong>Item:</strong> ${item.name}</p>
      <p><strong>Previous Status:</strong> ${oldStatus}</p>
      <p><strong>New Status:</strong> ${newStatus}</p>
      ${newStatus === ItemStatus.AVAILABLE ? '<p>This item is now available for pickup.</p>' : ''}
      <p>Thank you for being part of our community!</p>
      <p>Best regards,<br>The Lydia Team</p>
    </div>
  `;
};

/**
 * Generates an email template for order status update notification
 */
export const generateOrderStatusUpdateTemplate = (beneficiary: Beneficiary, order: Order, oldStatus: OrderStatus, newStatus: OrderStatus): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
      <h1 style="color: #4a6f8a;">Order Status Update</h1>
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
};