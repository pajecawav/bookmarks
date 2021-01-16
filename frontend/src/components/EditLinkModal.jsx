import { useRef, useState } from "react";
import Modal from "react-modal";
import { updateLink } from "../api";
import { ReactComponent as CloseIcon } from "../icons/close.svg";
import TagsInput from "./TagsInput";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        maxHeight: "90vh",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
    },
    overlay: {
        backgroundColor: "#00000080",
    },
};

export default function EditLinkModal(props) {
    let [errors, setErrors] = useState(null);
    let tagsInput = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        let result = await updateLink(props.id, {
            title: data.get("title"),
            url: data.get("url"),
            tags: tagsInput.current.getTags(),
        });
        if (result.ok) {
            props.onUpdate(result.link);
            props.onRequestClose();
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
                    <div className="font-bold text-xl">Edit Link</div>
                    <CloseIcon
                        className="cursor-pointer"
                        onClick={props.onRequestClose}
                    />
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label
                            htmlFor="title"
                            className="inline-block w-10 mr-4 text-gray-700"
                        >
                            Title
                        </label>
                        <input
                            className="border rounded sm:w-96 px-4 py-2 border-gray-400 focus:border-blue-500"
                            type="text"
                            name="title"
                            defaultValue={props.title}
                            placeholder="Title"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="url"
                            className="inline-block w-10 mr-4 text-gray-700"
                        >
                            URL
                        </label>
                        <input
                            className="border rounded sm:w-96 px-4 py-2 border-gray-400 focus:border-blue-500"
                            type="url"
                            name="url"
                            defaultValue={props.url}
                            placeholder="URL"
                            required
                        />
                    </div>
                    <div className="sm:flex">
                        <label className="inline-block w-10 mr-4 text-gray-700">
                            Tags
                        </label>
                        <TagsInput ref={tagsInput} tags={props.tags} />
                    </div>

                    {errors &&
                        errors.map((error) => (
                            <div
                                className="bg-red-200 text-red-800 border border-red-800 px-4 py-2 mt-2 rounded-md"
                                key={error}
                            >
                                {error}
                            </div>
                        ))}

                    <input
                        className="text-white ml-auto w-max h-full bg-gray-900 hover:bg-blue-500 px-8 py-2 rounded cursor-pointer"
                        type="submit"
                        value="Save"
                    />
                </form>
            </>
        </Modal>
    );
}
