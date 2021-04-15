import clsx from "clsx";

export default function Input({ className, ...props }) {
    return (
        <input
            className={clsx(
                "py-2 px-3 placeholder-gray-700 rounded border border-gray-400 transition-colors duration-100 appearance-none text-gray-darker focus:border-blue-500 dark:bg-trueGray-800 dark:text-white dark:border-trueGray-800 dark:placeholder-gray-500 dark:focus:border-blue-500",
                className
            )}
            {...props}
        />
    );
}
