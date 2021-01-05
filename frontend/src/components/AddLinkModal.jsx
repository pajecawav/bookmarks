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

    let addLink_ = () => {
        addLink(url);
        props.onRequestClose();
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
                <form onSubmit={addLink_}>
                    <input
                        className="flex-grow border rounded w-96 px-4 py-2 border-gray-400 focus:border-blue-500"
                        type="url"
                        placeholder="Enter URL"
                        autoFocus={true}
                        onChange={(event) => setUrl(event.target.value)}
                    ></input>
                    <input
                        className="text-white h-full bg-gray-900 hover:bg-blue-500 px-8 py-2 ml-4 rounded"
                        type="submit"
                        value="Add"
                    ></input>
                </form>
            </>
        </Modal>
    );
}
