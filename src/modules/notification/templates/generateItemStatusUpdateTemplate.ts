import { Item } from '../../item/domain/Item';
import { ItemStatus } from '../../item/types';
import { Beneficiary } from '../../beneficiary/domain/Beneficiary';
import { baseEmailTemplate, emailHeader } from './baseEmailTemplate';

/**
 * Generates an email template for item status change notification
 */
export const generateItemStatusUpdateTemplate = (
    beneficiary: Beneficiary,
    item: Item,
    oldStatus: ItemStatus,
    newStatus: ItemStatus
): string => {
    const content = `
    ${emailHeader('Item Status Update')}
    <div style="padding: 20px;">
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

    return baseEmailTemplate(content);
};