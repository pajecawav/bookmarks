import { useState } from "react";
import Modal from "react-modal";
import { addLink } from "../../api";
import { ReactComponent as CloseIcon } from "../../icons/close.svg";

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

    const submitHandler = async (event) => {
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
                        className="cursor-pointer"
                        onClick={onRequestClose}
                    />
                </div>

                <form className="flex flex-col gap-4" onSubmit={submitHandler}>
                    <div className="flex items-center">
                        <label
                            className="inline-block flex-shrink-0 mr-4 w-8 text-gray-700 dark:text-current"
                            htmlFor="add-title"
                        >
                            Title
                        </label>
                        <input
                            className="flex-grow py-2 px-4 rounded border border-gray-400 focus:border-blue-500 dark:bg-trueGray-800 dark:text-white dark:border-trueGray-800 dark:placeholder-gray-500 dark:focus:border-blue-500"
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
                        <input
                            className="flex-grow py-2 px-4 rounded border border-gray-400 focus:border-blue-500 dark:bg-trueGray-800 dark:text-white dark:border-trueGray-800 dark:placeholder-gray-500 dark:focus:border-blue-500"
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
                    <input
                        className="py-2 px-8 ml-auto w-max h-full text-white bg-gray-900 rounded duration-200 cursor-pointer hover:bg-blue-500 dark:bg-trueGray-800 dark:hover:bg-blue-400 dark:hover:text-gray-800 hover:bg-blue-400"
                        type="submit"
                        value="Add"
                    />
                </form>
            </div>
        </Modal>
    );
}
