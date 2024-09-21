import { useState } from "react";
import Button from "./ui/Button";
import Close from "./Icons/Close";
import { useTrackerContext } from "../context/context";
import { url } from "../utils";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  setShowNewListModal: React.Dispatch<React.SetStateAction<boolean>>;
  postId : string
};

function CreateNewList({ setShowNewListModal,postId }: Props) {
  const { loggedInUser } = useTrackerContext();
  const [listName, setListName] = useState("");
  const [visibility, setVisibility] = useState("private");
  const createNewReadingListHandler = async () => {
    try {
      const response = await fetch(`${url}/readingList`, {
        method: "POST",
        body: JSON.stringify({
          visibility,
          name: listName,
          userId: loggedInUser?.id,
          postId
        }),
        headers : {
          "Content-Type" : "application/json"
        }
      });
      setShowNewListModal(false);
      if (response.status == 201) {
        toast.success(`Post added to ${listName}`);
      }
      if (!response.ok) throw new Error("Error creating new list");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Toaster/>
      <div className="bg-white relative p-8 rounded-lg shadow-md max-w-md">
        <span
          className="absolute right-1 top-2 text-xl cursor-pointer"
          onClick={() => setShowNewListModal(false)}
        >
          <Close />
        </span>
        <h2 className="text-xl text-center font-bold mb-8">Create New List</h2>
        <div className="space-y-4">
          <input
            className="border border-gray-300 p-2 text-sm outline-none rounded-md w-full"
            type="text"
            placeholder="Enter list name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          <select
            name=""
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="border border-gray-300 py-1 px-2 text-sm outline-none rounded-md w-full"
          >
            <option disabled>Privacy</option>
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
          <div className="text-center">
            <Button isDisabled={listName == ""} onClick={createNewReadingListHandler} className="px-2 py-1">Create</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNewList;
