import { useEffect, useState } from "react";
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

export default function EditLinkModal({
    link,
    onUpdate,
    onRequestClose,
    ...props
}) {
    const [errors, setErrors] = useState([]);
    const [tags, setTags] = useState(link?.tags);

    useEffect(() => setTags(link?.tags), [link?.tags]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        await updateLink(link.id, {
            title: data.get("title"),
            url: data.get("url"),
            tags,
        })
            .then((link) => {
                onUpdate(link);
                onRequestClose();
            })
            .catch((errors) => {
                setErrors(errors.map((e) => e.msg));
            });
    };

    return (
        <Modal
            onRequestClose={onRequestClose}
            style={customStyles}
            ariaHideApp={false}
            {...props}
        >
            <>
                <div className="flex justify-between pb-4 mb-4 w-full border-b-2">
                    <div className="text-xl font-bold">Edit Link</div>
                    <CloseIcon
                        className="cursor-pointer"
                        onClick={onRequestClose}
                    />
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label
                            htmlFor="title"
                            className="inline-block mr-4 w-10 text-gray-700"
                        >
                            Title
                        </label>
                        <input
                            className="py-2 px-4 rounded border border-gray-400 focus:border-blue-500 sm:w-96"
                            type="text"
                            name="title"
                            defaultValue={link?.title}
                            placeholder="Title"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="url"
                            className="inline-block mr-4 w-10 text-gray-700"
                        >
                            URL
                        </label>
                        <input
                            className="py-2 px-4 rounded border border-gray-400 focus:border-blue-500 sm:w-96"
                            type="url"
                            name="url"
                            defaultValue={link?.url}
                            placeholder="URL"
                            required
                        />
                    </div>
                    <div className="sm:flex">
                        <label className="inline-block mr-4 w-10 text-gray-700">
                            Tags
                        </label>
                        <TagsInput
                            tags={tags}
                            onTagsUpdate={(newTags) => setTags(newTags)}
                        />
                    </div>

                    {errors.map((error) => (
                        <div
                            className="py-2 px-4 mt-2 text-red-800 bg-red-200 rounded-md border border-red-800"
                            key={error}
                        >
                            {error}
                        </div>
                    ))}

                    <input
                        className="py-2 px-8 ml-auto w-max h-full text-white bg-gray-900 rounded duration-100 cursor-pointer hover:bg-blue-500"
                        type="submit"
                        value="Save"
                    />
                </form>
            </>
        </Modal>
    );
}
