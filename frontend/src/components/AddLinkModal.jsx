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

export default function AddLinkModal(props) {
    let [errors, setErrors] = useState(null);

    let addLink_ = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        addLink({
            title: data.get("add-title") || null,
            url: data.get("add-url"),
        })
            .then((link) => {
                props.onRequestClose();
                props.onAddLink(link);
                setErrors([]);
            })
            .catch((error) => {
                setErrors(error.map((e) => e.msg));
            });
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            style={customStyles}
            ariaHideApp={false}
        >
            <>
                <div className="flex w-full justify-between mb-4 pb-4 border-b-2">
                    <div className="font-bold text-xl">Add Link</div>
                    <CloseIcon
                        className="cursor-pointer"
                        onClick={props.onRequestClose}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <form className="flex flex-col gap-4" onSubmit={addLink_}>
                        <div>
                            <label
                                className="inline-block w-10 mr-4 text-gray-700"
                                htmlFor="add-title"
                            >
                                Title
                            </label>
                            <input
                                className="flex-grow border rounded sm:w-96 px-4 py-2 border-gray-400 focus:border-blue-500"
                                type="text"
                                name="add-title"
                                placeholder="Title (Optional)"
                            />
                        </div>
                        <div>
                            <label
                                className="inline-block w-10 mr-4 text-gray-700"
                                htmlFor="add-url"
                            >
                                URL
                            </label>
                            <input
                                className="flex-grow border rounded sm:w-96 px-4 py-2 border-gray-400 focus:border-blue-500"
                                type="url"
                                name="add-url"
                                placeholder="Enter URL"
                                required
                            />
                        </div>

                        {errors &&
                            errors.map((error) => (
                                <div
                                    className="bg-red-200 text-red-800 border border-red-800 px-4 py-2 rounded-md"
                                    key={error}
                                >
                                    {error}
                                </div>
                            ))}

                        <input
                            className="text-white ml-auto w-max h-full bg-gray-900 hover:bg-blue-500 px-8 py-2 rounded cursor-pointer"
                            type="submit"
                            value="Add"
                        />
                    </form>
                </div>
            </>
        </Modal>
    );
}
