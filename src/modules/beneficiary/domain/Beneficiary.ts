import { AccountStatus, Address } from "../../../shared/types";
import { validateBeneficiary } from "../utils";

export class Beneficiary {
    constructor(
        public readonly name: string,
        public readonly address: Address,
        public readonly phoneNumber: string,
        public readonly emailAddress: string,
        public readonly description?: string,
        public readonly website?: string,
        public readonly coverPicture?: string,
        public readonly status: AccountStatus = AccountStatus.PENDING,
        public readonly createdAt: Date = new Date(),
        public readonly updatedAt: Date = new Date()
    ) {
        validateBeneficiary(this);
    }

    static create(data: Omit<Beneficiary, 'createdAt' | 'updatedAt' | 'status'>): Beneficiary {
        return new Beneficiary(
            data.name,
            data.address,
            data.phoneNumber,
            data.emailAddress,
            data.description,
            data.website,
            data.coverPicture
        );
    }

    static update(
        existingBeneficiary: Beneficiary,
        updates: Partial<Omit<Beneficiary, 'createdAt' | 'status'>>
    ): Beneficiary {
        return new Beneficiary(
            updates.name ?? existingBeneficiary.name,
            updates.address ?? existingBeneficiary.address,
            updates.phoneNumber ?? existingBeneficiary.phoneNumber,
            updates.emailAddress ?? existingBeneficiary.emailAddress,
            updates.description ?? existingBeneficiary.description,
            updates.website ?? existingBeneficiary.website,
            updates.coverPicture ?? existingBeneficiary.coverPicture,
            existingBeneficiary.status,
            existingBeneficiary.createdAt
        );
    }

    static updateStatus(
        existingBeneficiary: Beneficiary,
        newStatus: AccountStatus
    ): Beneficiary {
        return new Beneficiary(
            existingBeneficiary.name,
            existingBeneficiary.address,
            existingBeneficiary.phoneNumber,
            existingBeneficiary.emailAddress,
            existingBeneficiary.description,
            existingBeneficiary.website,
            existingBeneficiary.coverPicture,
            newStatus,
            existingBeneficiary.createdAt
        );
    }
}