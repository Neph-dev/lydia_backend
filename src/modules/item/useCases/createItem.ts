import { Item } from '../domain';
import { CreateItemDTO, ItemRepo } from '../types';

export const createItem = async (
    dto: CreateItemDTO,
    itemRepo: ItemRepo
): Promise<Item> => {
    const item = Item.create(dto);
    await itemRepo.save(item);

    return item;
};
