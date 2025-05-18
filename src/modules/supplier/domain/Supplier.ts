import mongoose from "mongoose";
import { AccountStatus, Address, DonationDays, DonationFrequency, Establishment } from "../../../shared/types";
import { validateSupplier } from "../utils/validateSupplier";

/**
 * Represents a food supplier entity in the system
 */
export class Supplier {
    constructor(
        public readonly sub: string,
        public readonly name: string,
        public readonly establishment: Establishment,
        public readonly address: Address,
        public readonly phoneNumber: string,
        public readonly emailAddress: string,
        public readonly donationSchedule?: {
            days: DonationDays[];
            frequency: DonationFrequency;
        },
        public readonly description?: string,
        public readonly website?: string,
        public readonly coverPicture?: string,
        public readonly status: AccountStatus = AccountStatus.PENDING,
        public readonly createdAt: Date = new Date(),
        public readonly updatedAt: Date = new Date(),
        public readonly _id?: mongoose.Types.ObjectId,
    ) {
        validateSupplier(this);
    }

    /**
     * Creates a new Supplier entity from data
     * @param data The supplier data
     * @returns A new Supplier instance
     */
    static create(data: Omit<Supplier, 'createdAt' | 'updatedAt' | 'status'>): Supplier {
        return new Supplier(
            data.sub,
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

    /**
     * Creates a new Supplier with updated fields
     * @param existingSupplier The supplier to update
     * @param updates The fields to update
     * @returns A new Supplier instance with updated fields
     */
    static update(
        existingSupplier: Supplier,
        updates: Partial<Omit<Supplier, 'createdAt' | 'status'>>
    ): Supplier {
        return new Supplier(
            existingSupplier.sub,
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

    /**
     * Creates a new Supplier with an updated status
     * @param existingSupplier The supplier to update
     * @param newStatus The new status
     * @returns A new Supplier instance with updated status
     */
    static updateStatus(
        existingSupplier: Supplier,
        newStatus: AccountStatus
    ): Supplier {
        return new Supplier(
            existingSupplier.sub,
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