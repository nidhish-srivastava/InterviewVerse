
const cleanInput = (input: string) => {
    return new RegExp(
      input
        ?.trim()
        .replace(/\s{2,}/g, " ")
        .replace(/,(?!\s)/g, ", ")
        .toString()
        .toLowerCase(),
      "i"
    );
  };
  
export {cleanInput}  