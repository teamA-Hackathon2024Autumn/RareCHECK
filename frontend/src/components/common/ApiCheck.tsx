import { useState } from "react";
import { Page } from "../layout/Page";
import { ApiTest } from "../../services/api";
import { Button } from "@mui/material";

interface Item {
  id: number;
  name: string;
}

export const ApiCheck = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [message, setMessage] = useState("");

  const handleButtonClick = async () => {
    try {
      const result = await ApiTest();
      console.log("API response:", result);
      setItems(result);
      setMessage("Data fetched successfully!");
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Failed to fetch data.");
    }
  };

  return (
    <Page login={false}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{ width: "25%" }}
          onClick={handleButtonClick}
        >
          API Check
        </Button>
      </div>
      <div>
        <h1>{message}</h1>
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </Page>
  );
};
