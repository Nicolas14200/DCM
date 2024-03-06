import { Modal } from "@mui/material";

export interface UpdateEventCultureProps {
    onClose: () => void;
    open: boolean;
}


export const UpdateEventCulture = ({ open, onClose }: UpdateEventCultureProps) => {

    return (
        <>
              <Modal open={open} onClose={onClose}>
                <>
                    
                </>
              </Modal>
        </>
    )
}