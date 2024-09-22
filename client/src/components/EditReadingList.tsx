import { useState } from "react";
import { MdClose } from "react-icons/md";
import Button from "./ui/Button";
import { url } from "../utils";
import { useTrackerContext } from "../context/context";

type Props = {
  listName: string;
  visibility: "public" | "private" | string;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  listId: string;
  setVisibility : React.Dispatch<React.SetStateAction<string>>
  setListName : React.Dispatch<React.SetStateAction<string>>
};

function EditReadingList({
  listName,
  visibility,
  setShowEditModal,
  listId,
  setVisibility,
  setListName
}: Props) {
  
  const [updatedName, setUpdatedName] = useState(listName);
  const [updatedVisibility, setUpdatedVisibility] = useState(visibility);
  const { loggedInUser } = useTrackerContext();

  const updateReadingList = async () => {
    try {
      const response = await fetch(`${url}/readingList`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedInUser?.id,
          newName: updatedName,
          visibility: updatedVisibility,
          listId: listId,
        }),
      });
      if (!response.ok) throw new Error("Error updating the list");
      setVisibility(updatedVisibility)
      setListName(updatedName)
      setShowEditModal(false);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white relative p-8 rounded-lg shadow-md max-w-md">
        <span
          className="absolute right-1 top-2 cursor-pointer"
          onClick={() => setShowEditModal(false)}
        >
          <MdClose className="text-xl" />
        </span>
        <h2 className="text-xl text-center font-bold mb-8">Edit List</h2>
        <div className="space-y-4">
          <input
            className="border border-gray-300 p-2 text-sm outline-none rounded-md w-full"
            type="text"
            placeholder="Enter list name"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <select
            name=""
            value={updatedVisibility}
            onChange={(e) => setUpdatedVisibility(e.target.value)}
            className="border border-gray-300 py-1 px-2 text-sm outline-none rounded-md w-full"
          >
            <option disabled>Privacy</option>
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
          <div className="text-center">
            <Button
              isDisabled={
                listName == updatedName && visibility == updatedVisibility
              }
              onClick={updateReadingList}
              className="px-2 py-1"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditReadingList;
