

export const checkIfhavePhoto = (initial: string | undefined, final: string) => {
    if (initial?.length) return initial;
    return final;
}