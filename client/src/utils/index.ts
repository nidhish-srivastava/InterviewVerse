// export const url = `http://localhost:4000`
export const url = `https://inter-view-tracker.vercel.app`

export const dateFormatter = (date: Date | string | number) => {
    const currentDate = new Date(date);
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };