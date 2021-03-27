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
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "transparent",
        padding: "0",
        border: "none",
        maxWidth: "90%",
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
            <div className="p-4 bg-white sm:w-96 dark:bg-trueGray-900 dark:text-gray-300">
                <div className="flex justify-between pb-4 mb-4 w-full border-b-2 dark:border-trueGray-700">
                    <div className="text-xl font-bold">Edit Link</div>
                    <CloseIcon
                        className="cursor-pointer"
                        onClick={onRequestClose}
                    />
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex items-center">
                        <label
                            htmlFor="title"
                            className="flex-shrink-0 inline-block mr-4 w-8 text-gray-700 dark:text-current"
                        >
                            Title
                        </label>
                        <input
                            className="flex-grow py-2 px-4 rounded border border-gray-400 focus:border-blue-500 w-96 dark:bg-trueGray-800 dark:text-white dark:border-trueGray-800 dark:placeholder-gray-500 dark:focus:border-blue-500"
                            type="text"
                            name="title"
                            defaultValue={link?.title}
                            placeholder="Title"
                            size={1}
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <label
                            htmlFor="url"
                            className="flex-shrink-0 inline-block mr-4 w-8 text-gray-700 dark:text-current"
                        >
                            URL
                        </label>
                        <input
                            className="flex-grow py-2 px-4 rounded border border-gray-400 focus:border-blue-500 w-96 dark:bg-trueGray-800 dark:text-white dark:border-trueGray-800 dark:placeholder-gray-500 dark:focus:border-blue-500"
                            type="url"
                            name="url"
                            defaultValue={link?.url}
                            placeholder="URL"
                            size={1}
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="inline-block mr-4 w-8 text-gray-700 dark:text-current">
                            Tags
                        </label>
                        <div className="flex-grow">
                            <TagsInput
                                tags={tags}
                                onTagsUpdate={(newTags) => setTags(newTags)}
                            />
                        </div>
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
                        className="py-2 px-8 ml-auto w-max h-full text-white bg-gray-900 rounded duration-200 cursor-pointer hover:bg-blue-500 dark:bg-trueGray-800 dark:hover:bg-blue-400 dark:hover:text-gray-800 hover:bg-blue-400"
                        type="submit"
                        value="Save"
                    />
                </form>
            </div>
        </Modal>
    );
}
