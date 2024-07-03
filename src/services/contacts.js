import Contact from "../db/Contact.js";
import calcPaginationData from "../utils/calcPaginationData.js";


export const getAllContacts = async({filter, page, perPage, sortBy, sortOrder}) => {
    const skip = (page - 1) * perPage;
    const dataBaseQuery = Contact.find();
    if(filter.contactType) {
        dataBaseQuery.where('contactType').equals(filter.contactType);
    };
    if(filter.isFavourite) {
        dataBaseQuery.where('isFavourite').equals(filter.isFavourite);
    };


    const items = await dataBaseQuery.skip(skip).limit(perPage).sort({[sortBy]: sortOrder});
    const totalItems = await Contact.find().merge(dataBaseQuery).countDocuments();
    const {totalPages, hasPreviousPage, hasNextPage} = calcPaginationData(totalItems, page, perPage);

    return {
        data: items,
        page,
        perPage,
        totalItems,
        totalPages,
        hasPreviousPage,
        hasNextPage
    };
};

export const getContactById = (id) => Contact.findById(id);

export const postContact = (data) => Contact.create(data);

export const deleteContact = (filter) => Contact.findOneAndDelete(filter);

export const upsertContact = async(filter, data, options={}) => {
const result = await Contact.findOneAndUpdate(filter, data, {new: true,
    includeResultMetadata: true,
    ...options,});

    if(!result || !result.value) return null;

    return ({
        data: result,
        isNew:Boolean(result?.lastErrorObject?.upserted)
    });
};

