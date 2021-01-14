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
    let [url, setUrl] = useState(null);
    let [errors, setErrors] = useState(null);

    let addLink_ = async (event) => {
        event.preventDefault();
        let result = await addLink(url);
        if (result.ok) {
            props.onRequestClose();
            props.onAddLink(result.link);
        } else {
            setErrors(result.error.map((e) => e.msg));
        }
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
                <form
                    className="flex sm:flex-row gap-4 sm:gap-0 flex-col"
                    onSubmit={addLink_}
                >
                    <div>
                        <label className="sm:hidden mr-4" for="add-url">
                            URL
                        </label>
                        <input
                            className="flex-grow border rounded sm:w-96 px-4 py-2 border-gray-400 focus:border-blue-500"
                            type="url"
                            name="add-url"
                            placeholder="Enter URL"
                            autoFocus={true}
                            required
                            onChange={(event) => setUrl(event.target.value)}
                        />
                    </div>
                    <input
                        className="text-white h-full w-max bg-gray-900 hover:bg-blue-500 px-8 py-2 ml-auto sm:ml-4 rounded"
                        type="submit"
                        value="Add"
                    />
                </form>

                {errors &&
                    errors.map((error) => (
                        <div
                            className="bg-red-200 text-red-800 border border-red-800 px-4 py-2 mt-2 rounded-md"
                            key={error}
                        >
                            {error}
                        </div>
                    ))}
            </>
        </Modal>
    );
}
