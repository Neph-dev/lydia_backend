import { ErrorResponse } from "../../../constants";
import { AccountStatus } from "../../../shared/types";
import { AppError } from "../../../utils";
import { Beneficiary } from "../domain/Beneficiary";
import { BeneficiaryRepo } from "../types";

export const updateBeneficiaryStatus = async (
    id: string,
    newStatus: AccountStatus,
    beneficiaryRepo: BeneficiaryRepo
): Promise<Beneficiary> => {
    const { BENEFICIARY } = ErrorResponse;

    const exists = await beneficiaryRepo.findById(id);
    if (!exists) {
        throw new AppError(
            BENEFICIARY.NOT_FOUND.message.replace(':id', id),
            BENEFICIARY.NOT_FOUND.code,
            BENEFICIARY.NOT_FOUND.statusCode
        );
    }

    if (exists.status === newStatus) {
        throw new AppError(
            BENEFICIARY.SAME_STATUS.message.replace(':status', newStatus),
            BENEFICIARY.SAME_STATUS.code,
            BENEFICIARY.SAME_STATUS.statusCode
        );
    }

    const beneficiary = await beneficiaryRepo.updateStatus(id, exists, newStatus);

    if (!beneficiary) {
        throw new AppError(
            BENEFICIARY.UPDATE_STATUS.message,
            BENEFICIARY.UPDATE_STATUS.code,
            BENEFICIARY.UPDATE_STATUS.statusCode
        );
    }

    return beneficiary;
};