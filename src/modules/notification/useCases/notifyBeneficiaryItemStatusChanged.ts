import { Item } from '../../item/domain/Item';
import { ItemStatus } from '../../item/types';
import { MongooseBeneficiaryRepo } from '../../beneficiary/infra/BenefiaciaryRepo';
import { sendEmail } from '../handlers/emailHandler';
import { generateItemStatusUpdateTemplate } from '../templates/generateItemStatusUpdateTemplate';

/**
 * Sends a notification to a beneficiary when an item's status changes
 */
export const notifyBeneficiaryItemStatusChanged = async (
    item: Item,
    oldStatus: ItemStatus,
    newStatus: ItemStatus,
    beneficiaryId: string
): Promise<boolean> => {
    try {
        if (!item.claimedBy || item.claimedBy.length === 0) {
            console.warn(`Item has no claimed beneficiaries`);
            return false;
        }

        const beneficiaryRepo = new MongooseBeneficiaryRepo();
        const beneficiary = await beneficiaryRepo.findById(beneficiaryId);

        if (!beneficiary) {
            console.error(`Beneficiary not found for ID: ${beneficiaryId}`);
            return false;
        }

        const emailContent = generateItemStatusUpdateTemplate(
            beneficiary,
            item,
            oldStatus,
            newStatus
        );

        await sendEmail({
            to: beneficiary.emailAddress,
            subject: `Item Status Update: ${item.name}`,
            html: emailContent
        });

        return true;
    } catch (error) {
        console.error('Failed to send item status notification:', error);
        return false;
    }
};