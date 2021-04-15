import clsx from "clsx";

export default function Button({ className, children, ...props }) {
    return (
        <button
            className={clsx(
                "py-2 px-4 text-white bg-gray-900 rounded duration-200 cursor-pointer dark:bg-trueGray-800 dark:hover:bg-blue-400 dark:hover:text-gray-800 hover:bg-blue-400 hover:bg-blue-500",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
