import { Dispatch, ReactNode, SetStateAction } from "react";

export type ModalProps = {
    children?: ReactNode;
    isOpen: boolean;
    isFormSubmit?: boolean
    setOpen: Dispatch<SetStateAction<number | string | null | any>>;
};