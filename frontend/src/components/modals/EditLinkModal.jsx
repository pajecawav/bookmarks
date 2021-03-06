import { useEffect, useState } from "react";
import Modal from "react-modal";
import { updateLink } from "../../api";
import { ReactComponent as CloseIcon } from "../../icons/close.svg";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import TagsInput from "./../TagsInput";

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
        console.log(event.target);

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
            <div className="p-4 bg-white dark:bg-trueGray-900 dark:text-gray-300">
                <div className="flex justify-between pb-4 mb-4 w-full border-b-2 dark:border-trueGray-700">
                    <div className="text-xl font-bold">Edit Link</div>
                    <CloseIcon
                        className="rounded duration-200 cursor-pointer sm:w-7 sm:h-7 hover:stroke-blue-500"
                        onClick={onRequestClose}
                    />
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex items-center">
                        <label
                            htmlFor="title"
                            className="inline-block flex-shrink-0 mr-4 w-8 text-gray-700 dark:text-current"
                        >
                            Title
                        </label>
                        <Input
                            className="flex-grow"
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
                            className="inline-block flex-shrink-0 mr-4 w-8 text-gray-700 dark:text-current"
                        >
                            URL
                        </label>
                        <Input
                            className="flex-grow"
                            type="url"
                            name="url"
                            defaultValue={link?.url}
                            placeholder="URL"
                            size={1}
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="inline-block flex-shrink-0 mr-4 w-8 text-gray-700 dark:text-current">
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

                    <Button className="px-8 ml-auto w-max h-full">Save</Button>
                </form>
            </div>
        </Modal>
    );
}
