"use client";
import { Contract } from "ethers";
import { JsonRpcSigner } from "@ethersproject/providers";
import todo from "../utils/todo.json";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import Task, { taskinterface } from "@/Components/Task";
interface task {
  id: number;
  tastText: string;
  deleted: boolean;
}
function Page() {
  const [taskText, setTaskText] = useState();
  const [signer, setSigner] = useState();
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<taskinterface[]>([]);
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) console.log("metamask is installed");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setSigner(accounts[0]);
      console.log(signer);
    } catch (err) {
      console.log(err);
    }
  };
  const createTask = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        let provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const todoContract = new Contract(
          "0x439234B8Ba65833F0DB8De682e0a2D19B002866C",
          todo.abi,
          signer
        );
        await todoContract.addTask("task data", false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllTasks = async () => {
    console.log("getting tasks");
    const { ethereum } = window;
    if (ethereum) {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const todoContract = new ethers.Contract(
        "0x439234B8Ba65833F0DB8De682e0a2D19B002866C",
        todo.abi,
        signer
      );
      const data = await todoContract.getMyTasks();
      setTasks(data);
    }
  };

  useEffect(() => {
    // Check if MetaMask is installed and available
    connectWallet();
    getAllTasks();
  }, []);
  console.log(tasks);
  if (!signer) return <h1>please connect your account</h1>;

  return (
    <div className=" min-h-screen">
      <div className="pt-8 flex justify-center">
        <TextField
          id="outlined-basic"
          label="Make Todo"
          variant="outlined"
          style={{ margin: "0px 5px" }}
          size="small"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <Button variant="contained" color="secondary" onClick={createTask}>
          Add Task
        </Button>
      </div>
      {tasks &&
        tasks.map((task: taskinterface) => <Task key={task.id} data={task} />)}
    </div>
  );
}

export default Page;
