
export const formatDate = (dateString: string): string => {

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2,'0');
    const month = (date.getMonth() + 1).toString().padStart(2,'0');
    const year = date.getFullYear()
    return `${day}-${month}-${year}`;
    
};

export const parseFormattedDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('-').map(num => parseInt(num, 10));
    return new Date(year, month - 1, day);
}