import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const url = import.meta.env.VITE_BACKEND_URL;

const defaultDp =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

const timeToReadPost = (post: string | undefined) => {
  const timeToReadOneWord = 0.005;
  let time = Math.round(
    (post?.trim().split(" ").length as number) * timeToReadOneWord
  );
  if (time == 0) return 1;
  return time;
};

const updateRequest = async (url: string | undefined, data: any) => {
  try {
    return await fetch(`${url}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (error) {
  } finally {
  }
};

const dateFormatter = (date?: Date | string | number) => {
  const currentDate = new Date(date);
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return formattedDate;
};

const titleParse = (title: string) => {
  return title.split(" ").join("-");
};

export {
  titleParse,
  dateFormatter,
  updateRequest,
  timeToReadPost,
  defaultDp,
  cn,
  url,
};
