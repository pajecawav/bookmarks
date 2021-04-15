import { useState } from "react";
import Modal from "react-modal";
import { addLink } from "../../api";
import { ReactComponent as CloseIcon } from "../../icons/close.svg";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "transparent",
        padding: "0",
        border: "none",
        width: "28rem",
        maxWidth: "90%",
    },
    overlay: {
        backgroundColor: "#00000080",
    },
};

export default function AddLinkModal({ onRequestClose, isOpen }) {
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        addLink({
            title: data.get("add-title") || null,
            url: data.get("add-url"),
        })
            .then((link) => {
                onRequestClose();
                setErrors([]);
            })
            .catch((error) => {
                setErrors(error.map((e) => e.msg));
            });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            ariaHideApp={false}
            closeTimeoutMS={200}
        >
            <div className="p-4 bg-white dark:bg-trueGray-900 dark:text-gray-300">
                <div className="flex justify-between pb-4 mb-4 w-full border-b-2 dark:border-trueGray-700">
                    <div className="text-xl font-bold">Add Link</div>
                    <CloseIcon
                        className="rounded duration-200 cursor-pointer sm:w-7 sm:h-7 hover:stroke-blue-500"
                        onClick={onRequestClose}
                    />
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex items-center">
                        <label
                            className="inline-block flex-shrink-0 mr-4 w-8 text-gray-700 dark:text-current"
                            htmlFor="add-title"
                        >
                            Title
                        </label>
                        <Input
                            className="flex-grow"
                            type="text"
                            name="add-title"
                            placeholder="Title (Optional)"
                            size={1}
                        />
                    </div>
                    <div className="flex items-center">
                        <label
                            className="inline-block flex-shrink-0 mr-4 w-8 text-gray-700 dark:text-current"
                            htmlFor="add-url"
                        >
                            URL
                        </label>
                        <Input
                            className="flex-grow"
                            type="url"
                            name="add-url"
                            placeholder="Enter URL"
                            size={1}
                            required
                        />
                    </div>
                    {errors.map((error) => (
                        <div
                            className="py-2 px-4 text-red-800 bg-red-200 rounded-md border border-red-800"
                            key={error}
                        >
                            {error}
                        </div>
                    ))}
                    <Button className="px-8 ml-auto w-max h-full">Add</Button>
                </form>
            </div>
        </Modal>
    );
}
