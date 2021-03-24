import { useState } from "react";
import Modal from "react-modal";
import { addLink } from "../api";
import { ReactComponent as CloseIcon } from "../icons/close.svg";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
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
            <>
                <div className="flex justify-between pb-4 mb-4 w-full border-b-2">
                    <div className="text-xl font-bold">Add Link</div>
                    <CloseIcon
                        className="cursor-pointer"
                        onClick={onRequestClose}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={submitHandler}
                    >
                        <div>
                            <label
                                className="inline-block mr-4 w-10 text-gray-700"
                                htmlFor="add-title"
                            >
                                Title
                            </label>
                            <input
                                className="flex-grow py-2 px-4 rounded border border-gray-400 focus:border-blue-500 sm:w-96"
                                type="text"
                                name="add-title"
                                placeholder="Title (Optional)"
                            />
                        </div>
                        <div>
                            <label
                                className="inline-block mr-4 w-10 text-gray-700"
                                htmlFor="add-url"
                            >
                                URL
                            </label>
                            <input
                                className="flex-grow py-2 px-4 rounded border border-gray-400 focus:border-blue-500 sm:w-96"
                                type="url"
                                name="add-url"
                                placeholder="Enter URL"
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
                            className="py-2 px-8 ml-auto w-max h-full text-white bg-gray-900 rounded cursor-pointer hover:bg-blue-500 duration-100"
                            type="submit"
                            value="Add"
                        />
                    </form>
                </div>
            </>
        </Modal>
    );
}
