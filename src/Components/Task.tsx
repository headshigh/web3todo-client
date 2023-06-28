import React from "react";
import todo from "../utils/todo.json";
import { ethers } from "ethers";
export interface taskinterface {
  id: number;
  taskText: string;
  deleted: string;
}
import DeleteIcon from "@mui/icons-material/Delete";
import { List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
function Task({ data }: { data: taskinterface }) {
  const deleteTask = async (id: number) => {
    try {
      //@ts-expect-error
      const { ethereum } = window;
      if (ethereum) {
        //@ts-expect-error
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const todoContract = new ethers.Contract(
          "0x439234B8Ba65833F0DB8De682e0a2D19B002866C",
          todo.abi,
          signer
        );
        const deleted = await todoContract.deleteTask(id);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-black w-1/2 justify-center flex ">
      <List className=" ">
        <ListItem className="">
          {/* <ListItemAvatar /> */}
          <div className="flex items-center gap-9 ">
            <ListItemText primary={data.taskText} />
            <DeleteIcon
              fontSize="medium"
              style={{ opacity: 0.7 }}
              onClick={async () => await deleteTask(data.id)}
            />
          </div>
        </ListItem>
      </List>
    </div>
  );
}

export default Task;
