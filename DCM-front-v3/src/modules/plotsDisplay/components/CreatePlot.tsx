import React, { FormEvent, useContext, useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { TextFields } from "../../auth/components/TextField";
import {  UserContext } from "../../../config/Context";
import { plotsApi } from "../../../api/plots/PlotsApi";

interface CreatePlotProps {
  onClose: () => void;
  open: boolean;
}

export const CreatePlot = ({ open, onClose }: CreatePlotProps) => {
  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    codeName: "",
    width: 0,
    heigth: 0,
    ph: 0,
    pebbles: 0,
    plank: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await plotsApi.createPlot({
      ...formData,
      token: user?.token as string,
    });
  
    onClose();
  };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <>
          <Box
            sx={{
              marginLeft: "25%",
              width: "50%",
              bgcolor: "background.paper",
            }}
          >
            <div className="mt-[25%]">
              <h1 className="text-center pt-[8px] pb-[8px]">Create a Plot :</h1>
              <form
                onSubmit={handleSubmit}
                className="p-[8px] flex-collumns text-center"
              >
                <TextFields name="name" onChange={handleInputChange} />
                <TextFields name="codeName" onChange={handleInputChange} />
                <TextFields name="width" onChange={handleInputChange} />
                <TextFields name="height" onChange={handleInputChange} />
                <TextFields name="ph" onChange={handleInputChange} />
                <TextFields name="pebbles" onChange={handleInputChange} />
                <TextFields name="plank" onChange={handleInputChange} />
                <Button type="submit" variant="contained">
                  Ajouter Parcelle
                </Button>
              </form>
            </div>
          </Box>
        </>
      </Modal>
    </div>
  );
};
