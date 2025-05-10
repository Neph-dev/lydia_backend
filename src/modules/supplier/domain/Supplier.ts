import { Address, DonationDays, DonationFrequency, Establishment } from "../../../shared/types";
import { SupplierStatus } from "../types";

export class Supplier {
    constructor(
        public name: string,
        public establishment: Establishment,
        public address: Address,
        public phoneNumber: string,
        public emailAddress: string,
        public donationSchedule: {
            days: DonationDays[];
            frequency: DonationFrequency;
        },
        public description?: string,
        public website?: string,
        public coverPicture?: string,
        public status: SupplierStatus = SupplierStatus.PENDING,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {
        if (!this.name || !this.emailAddress) {
            throw new Error('Supplier must have a name and email');
        }
    }

    static create(data: Omit<Supplier, 'createdAt' | 'updatedAt' | 'status'>): Supplier {
        return new Supplier(
            data.name,
            data.establishment,
            data.address,
            data.phoneNumber,
            data.emailAddress,
            data.donationSchedule,
            data.description,
            data.website,
            data.coverPicture
        );
    }

    static update(
        existingSupplier: Supplier,
        updates: Partial<Omit<Supplier, 'createdAt' | 'status'>>
    ): Supplier {
        return new Supplier(
            updates.name ?? existingSupplier.name,
            updates.establishment ?? existingSupplier.establishment,
            updates.address ?? existingSupplier.address,
            updates.phoneNumber ?? existingSupplier.phoneNumber,
            updates.emailAddress ?? existingSupplier.emailAddress,
            updates.donationSchedule ?? existingSupplier.donationSchedule,
            updates.description ?? existingSupplier.description,
            updates.website ?? existingSupplier.website,
            updates.coverPicture ?? existingSupplier.coverPicture,
            existingSupplier.status,
            existingSupplier.createdAt,
            new Date()
        );
    }

    static updateStatus(
        existingSupplier: Omit<Supplier, 'updatedAt' | 'status'>,
        newStatus: SupplierStatus
    ): Supplier {
        return new Supplier(
            existingSupplier.name,
            existingSupplier.establishment,
            existingSupplier.address,
            existingSupplier.phoneNumber,
            existingSupplier.emailAddress,
            existingSupplier.donationSchedule,
            existingSupplier.description,
            existingSupplier.website,
            existingSupplier.coverPicture,
            newStatus,
            existingSupplier.createdAt,
            new Date()
        );
    }
}