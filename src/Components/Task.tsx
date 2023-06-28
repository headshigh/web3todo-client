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
  };
  return (
    <div className="bg-black">
      <List>
        <ListItem>
          <ListItemAvatar />
          <ListItemText primary={data.taskText} />
          <DeleteIcon
            fontSize="large"
            style={{ opacity: 0.7 }}
            onClick={async () => await deleteTask(data.id)}
          />
        </ListItem>
      </List>
    </div>
  );
}

export default Task;
