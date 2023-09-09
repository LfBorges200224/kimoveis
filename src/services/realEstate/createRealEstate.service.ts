import { Repository } from "typeorm";
import { iRealEstateRequest } from "../../interface/realEstate.interface";
import { Address, Category, RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../erro";

const realEstateServiceCreate = async (
    realEstateData: iRealEstateRequest,
): Promise<RealEstate> => {
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

    const repositoryAddress: Repository<Address> = AppDataSource.getRepository(Address);

    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

    const category: Category | null = await categoryRepository.findOne({
        where: {
            id: realEstateData.categoryId,
        },
    })

    if(!category){
        throw new AppError('Category not found', 404);
    }

    const checkAddressExist: Address | null = await repositoryAddress.findOne({
        where:{
            street: realEstateData.address.street,
            zipCode: realEstateData.address.zipCode,
            city: realEstateData.address.city,
            state: realEstateData.address.state,
        },
    });

    if(checkAddressExist){
        throw new AppError('Address already exists', 409);
    }

    const addressData = realEstateData.address;

    const address: Address = repositoryAddress.create(addressData);

    await repositoryAddress.save(address);

    const realEstate: RealEstate = realEstateRepository.create({
        ...realEstateData,
        address: address,
        category: category,
    });

    await realEstateRepository.save(realEstate);

    return realEstate;
}

export default realEstateServiceCreate;