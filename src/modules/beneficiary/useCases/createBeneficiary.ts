import { ErrorResponse } from '../../../constants';
import { AppError } from '../../../utils';
import { Beneficiary } from '../domain/Beneficiary';
import { BeneficiaryRepo, CreateBeneficiaryDTO } from '../types';

export const createBeneficiary = async (
    dto: CreateBeneficiaryDTO,
    beneficiaryRepo: BeneficiaryRepo
): Promise<Beneficiary> => {
    const { BENEFICIARY } = ErrorResponse;

    const existingBeneficiary = await beneficiaryRepo.findByEmail(dto.emailAddress);

    if (existingBeneficiary) {
        throw new AppError(
            BENEFICIARY.DUPLICATE_EMAIL.message,
            BENEFICIARY.DUPLICATE_EMAIL.code,
            BENEFICIARY.DUPLICATE_EMAIL.statusCode
        );
    }

    const beneficiary = Beneficiary.create(dto);
    await beneficiaryRepo.save(beneficiary);

    return beneficiary;
};
