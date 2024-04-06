

export const checkIfhavePhoto = (initial: string | undefined, final: string) => {
    if (initial?.length) return initial;
    return final;
}

export const formatDate = (dateVal: string) => {
    const parsedDate = new Date(dateVal);

    const months = ["January", "February", "March", "April", "May", "Jun", "July", "August", "September", "October", "November", "December"];
    const hours = parsedDate.getHours();
    const minutes = parsedDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${months[parsedDate.getMonth()]} ${parsedDate.getDate()} ${parsedDate.getFullYear()} @ ${formattedHours}:${formattedMinutes} ${ampm}`;
}