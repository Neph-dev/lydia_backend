import { AccountStatus, Address, DonationDays, DonationFrequency, Establishment } from "../../../shared/types";

/**
 * SupplierBase interface represents the base structure of a supplier entity.
 * It includes common properties that are shared across different supplier-related operations.
 */
export interface SupplierBase {
    name: string;
    establishment: Establishment;
    address: Address;
    phoneNumber: string;
    emailAddress: string;
    description?: string;
    website?: string;
    coverPicture?: string;
    status: AccountStatus;
    donationSchedule?: {
        days: DonationDays[];
        frequency: DonationFrequency;
    };
}