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


/**
 * Generates an email template for beneficiary order confirmation with detailed order summary
 * @param beneficiary The beneficiary who placed the order
 * @param order The order details
 * @param supplier The supplier providing the items
 * @param itemsWithDetails Full details of the ordered items
 * @returns HTML email template
 */
export const generateBeneficiaryOrderConfirmationTemplate = (
  beneficiary: Beneficiary,
  order: Order,
  supplier: Supplier,
  itemsWithDetails: Array<{ item: Item, quantity: number; }>
): string => {
  const orderDate = new Date(order.orderDate).toLocaleDateString();
  const estimatedPickupDate = new Date(order.orderDate);
  estimatedPickupDate.setDate(estimatedPickupDate.getDate() + 1);

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
      <div style="background-color: #4a6f8a; padding: 15px; text-align: center; border-radius: 5px 5px 0 0;">
        <h1 style="color: white; margin: 0;">Order Confirmation</h1>
      </div>
      
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
      
      <div style="background-color: #eeeeee; padding: 15px; text-align: center; border-radius: 0 0 5px 5px; font-size: 12px; color: #666;">
        <p>If you have any questions about your order, please contact us at help@lydia.com</p>
        <p>&copy; ${new Date().getFullYear()} Lydia - Fighting Food Waste Together</p>
      </div>
    </div>
  `;
};