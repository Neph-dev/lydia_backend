import { AccountStatus } from "../../../shared/types";
import { executeDatabaseOperation } from "../../../shared/utils";
import { Beneficiary } from "../domain/Beneficiary";
import { BeneficiaryRepo } from "../types";
import { BenefiaciaryModel } from "./BenefiaciaryModel";

export class MongooseBeneficiaryRepo implements BeneficiaryRepo {
    async save(beneficiary: Beneficiary): Promise<void> {
        const doc = new BenefiaciaryModel({
            ...beneficiary,
            status: AccountStatus.PENDING
        });
        await doc.save();
    }

    async findByEmail(email: string): Promise<Beneficiary | null> {
        return executeDatabaseOperation(async () => {
            if (!email) return null;
            const doc = await BenefiaciaryModel.findOne({ emailAddress: email });
            return this.documentToBeneficiary(doc);
        }, 'findByEmail');
    }

    async findById(id: string): Promise<Beneficiary | null> {
        return executeDatabaseOperation(async () => {
            if (!id) return null;
            const doc = await BenefiaciaryModel.findById(id);
            return this.documentToBeneficiary(doc);
        }, 'findById');
    }

    async updateStatus(id: string, beneficiary: Beneficiary, newStatus: AccountStatus): Promise<Beneficiary | null> {
        return executeDatabaseOperation(async () => {
            if (!beneficiary) return null;
            const updatedBeneficiary = await BenefiaciaryModel.findByIdAndUpdate(
                id,
                { status: newStatus },
                { new: true }
            );
            return this.documentToBeneficiary(updatedBeneficiary);
        }, 'updateStatus');
    }

    private documentToBeneficiary(doc: any): Beneficiary | null {
        if (!doc) return null;

        return new Beneficiary(
            doc.name,
            doc.address,
            doc.phoneNumber,
            doc.emailAddress,
            doc.description,
            doc.website,
            doc.coverPicture,
            doc.status,
            doc.createdAt
        );
    }

}