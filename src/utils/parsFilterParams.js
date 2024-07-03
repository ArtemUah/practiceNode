import { typesForSchema } from "../constants/constants.js"

const parseBoolean = value => {
    if(typeof value !== 'string') return;
    if(!['true', 'false'].includes(value)) return;

    const parsedValue = Boolean(value);
    return parsedValue;
}

const parsFilterParams = ({contactType, isFavourite}) => {
    const parsedContacType = typesForSchema.includes(contactType) ? contactType : null;
    const parsedIsFavourite = parseBoolean(isFavourite);

    return {
        contactType: parsedContacType,
        isFavourite: parsedIsFavourite
    };

};

export default parsFilterParams;
