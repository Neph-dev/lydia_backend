import { EmailOptions } from "../types";
import { transporter } from "../utils";

/**
 * Sends an email notification
 * @param options Email sending options
 * @returns Promise resolving to sending result
 */
export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
    try {
        if (!options.text && !options.html) {
            throw new Error('Either text or html content must be provided');
        }

        await transporter.sendMail({
            from: process.env.EMAIL_FROM || 'noreply@lydia.com',
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html
        });

        return true;
    } catch (error) {
        console.error(`Email sending failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return false;
    }
};