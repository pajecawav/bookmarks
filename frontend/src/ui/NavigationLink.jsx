import clsx from "clsx";
import { NavLink } from "react-router-dom";

export default function NavigationLink({
    className,
    activeClassName,
    icon: Icon,
    text,
    children,
    ...props
}) {
    return (
        <NavLink
            className={clsx(
                "flex gap-3 items-center cursor-pointer group hover:text-blue-500",
                className
            )}
            activeClassName={clsx("font-bold text-blue-500", activeClassName)}
            {...props}
        >
            {Icon && (
                <Icon className="duration-200 group-hover:stroke-blue-500" />
            )}
            <div className="duration-200">{text}</div>
        </NavLink>
    );
}
