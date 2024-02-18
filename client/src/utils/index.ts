// export const url = `http://localhost:4000`
 export const url = `https://inter-view-tracker.vercel.app`

export const defaultDp = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"

export const fetchSinglePostPromise = async(id : string | undefined)=>{
            const response = await fetch(`${url}/post/single/${id}`)
            return response.json()
}

export const timeToReadPost = (post : string | undefined) =>{
  const timeToReadOneWord = 0.005
  let time =  Math.round((post?.trim().split(" ").length as number)*timeToReadOneWord)
  if(time==0) return 1
  return time
}

export const dateFormatter = (date?: Date | string | number) => {
    const currentDate = new Date(date);
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };
