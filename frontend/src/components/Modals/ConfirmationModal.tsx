import RootModal from "./RootModal";
import { ModalProps } from "../../model/components/Modal";
import Button from "../Buttons/Button";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { useFormikContext } from "formik";

type ConfirmationProps = {
  message: string;
};

const ConfirmationModal = ({
  isFormSubmit,
  isOpen,
  setOpen,
  message,
}: ModalProps & ConfirmationProps) => {
  const { submitForm } = useFormikContext();
  return (
    <RootModal isOpen={isOpen} setOpen={setOpen}>
      <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 sm:flex sm:items-start">
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
          <InformationCircleIcon className="h-6 w-6 text-blue-600" />
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-lg leading-6 text-black-secondary font-semibold">
            Confirmation
          </h3>
          <p className="text-sm text-black-secondary text-opacity-70">
            Are you sure want to {message}? This will be permanently changed and
            the action cannot be undone.
          </p>
        </div>
      </div>
      <div className="p-4 bg-gray-100 flex justify-end gap-2">
        <Button
          bgColor="blue-500"
          onClick={() => {
            if (isFormSubmit) {
              submitForm();
            } else {
              setOpen(false);
              return;
            }
          }}
        >
          Submit
        </Button>
        <Button
          bgColor="blue-500"
          variants="ghost"
          type="submit"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </RootModal>
  );
};

export default ConfirmationModal;
