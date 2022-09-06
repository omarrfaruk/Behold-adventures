export const excerpt = (str, number) => {
    if (str.length > number) {
        str = str.substring(0, number) + " ...";
    }
    return str;
};