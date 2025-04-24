import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import AnimatedButton from '../../Button';
export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="shadow sticky z-50 rounded-4xl top-1 ">
            <nav className="bg-black/50 border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="react.svg"
                            className="mr-3 h-12 animate-spin-slow "
                            alt="Logo"
                        />
                    </Link>

                    {/* Hamburger Icon */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="mobile-menu-2"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>

                    <div className="flex items-center lg:order-2">
                        <Link
                            to="/"
                        >
                            <AnimatedButton
                                text="Get started"
                                icon={<img src="react.svg" className="h-6 animate-spin-slow" alt="Logo" />}
                                size="sm"
                                colors={["white","gray","darkblue"]}
                            />   
                        </Link>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <Link
                            to="#"
                        >
                            <AnimatedButton
                                text="Login"
                                icon={<img src="react.svg" className="h-6 animate-spin-slow" alt="Logo" />}
                                size="sm"
                                colors={["red","orange"]}
                            />
                        </Link>
                    </div>

                    <div
                        className={`${
                            isMenuOpen ? "flex" : "hidden"
                        } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            {["/", "/about", "/contact","/feature"].map((path, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={path}
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 duration-200 ${
                                                isActive
                                                    ? "text-red-600"
                                                    : "text-white"
                                            } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                    >
                                        <span className="text-2xl">
                                            {path === "/"
                                                ? "Home"
                                                : path.slice(1).charAt(0).toUpperCase() +
                                                  path.slice(2)}
                                        </span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
