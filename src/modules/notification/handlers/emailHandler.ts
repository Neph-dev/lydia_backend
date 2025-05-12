import { ErrorResponse } from "../../../constants";
import { AppError } from "../../../utils";
import { transporter } from "../config";
import { EmailOptions } from "../types";

/**
 * Sends an email notification
 * @param options Email sending options
 * @returns Promise resolving to sending result
 */
export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
    const { NOTIFICATION } = ErrorResponse;

    try {
        if (!options.to) {
            throw new AppError(
                NOTIFICATION.FIELDS.EMAIL_RECIPIENT_MISSING.message,
                NOTIFICATION.FIELDS.EMAIL_RECIPIENT_MISSING.code,
                NOTIFICATION.FIELDS.EMAIL_RECIPIENT_MISSING.statusCode
            );
        }

        if (!options.subject) {
            throw new AppError(
                NOTIFICATION.FIELDS.EMAIL_SUBJECT_MISSING.message,
                NOTIFICATION.FIELDS.EMAIL_SUBJECT_MISSING.code,
                NOTIFICATION.FIELDS.EMAIL_SUBJECT_MISSING.statusCode
            );
        }

        if (!options.text && !options.html) {
            throw new AppError(
                NOTIFICATION.FIELDS.EMAIL_CONTENT_MISSING.message,
                NOTIFICATION.FIELDS.EMAIL_CONTENT_MISSING.code,
                NOTIFICATION.FIELDS.EMAIL_CONTENT_MISSING.statusCode
            );
        }

        await transporter.sendMail({
            from: '"Lydia" <noreply@brickous.com>',
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