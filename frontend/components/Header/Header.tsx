import React, { useState, useRef, useEffect } from 'react';

import Link from "next/link";

export default function Header() {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [top, setTop] = useState(true);

    const trigger = useRef<HTMLButtonElement>(null);
    const mobileNav = useRef<HTMLElement>(null);

    // close the mobile menu on click outside
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!mobileNav.current || !trigger.current) return;
            if (!mobileNavOpen || mobileNav.current.contains(target as Node) || trigger.current.contains(target as Node)) return;
            setMobileNavOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close the mobile menu if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ key }: KeyboardEvent) => {
            if (!mobileNavOpen || key !== "Escape") return;
            setMobileNavOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    // detect whether user has scrolled the page down by 10px 
    useEffect(() => {
        const scrollHandler = () => {
            window.pageYOffset > 10 ? setTop(false) : setTop(true)
        };
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [top]);

    return (
        <header className={`fixed w-full z-30 md:bg-opacity-90 ${!top && 'bg-white backdrop-blur-sm shadow-lg'}`}>
            <div className="max-w-6xl mx-auto px-5 sm:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Site branding */}
                    <div className="shrink-0 mr-4">
                        {/* Logo */}
                        <Link href="/" className="block" aria-label="Web Template">
                            <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <radialGradient cx="21.152%" cy="86.063%" fx="21.152%" fy="86.063%" r="79.941%" id="header-logo">
                                        <stop stopColor="#4FD1C5" offset="0%" />
                                        <stop stopColor="#81E6D9" offset="25.871%" />
                                        <stop stopColor="#338CF5" offset="100%" />
                                    </radialGradient>
                                </defs>
                                <rect width="32" height="32" rx="16" fill="url(#header-logo)" fillRule="nonzero" />
                            </svg>
                        </Link>
                    </div>

                    {/* Desktop navigation */}
                    <nav className="hidden md:flex md:grow">
                        {/* Desktop menu links */}
                        <ul className="flex grow justify-end flex-wrap items-center">
                            <li>
                                <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center">Pricing</Link>
                            </li>
                            <li>
                                <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center">About us</Link>
                            </li>
                            <li>
                                <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center">Tutorials</Link>
                            </li>
                            <li>
                                <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 lg:px-5 py-2 flex items-center">Blog</Link>
                            </li>
                        </ul>
                        {/* Desktop sign in links */}
                        <ul></ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}