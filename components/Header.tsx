'use client'

import { useUser } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
    const { user } = useUser();

    console.log(user);

    return <header className="flex flex-wrap justify-between items-center px-4 py-2">
        {/* Top Row */}
        <div>
            <Link
                href="/"
                className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
            >
                Sharp 🛒
            </Link>
        </div>
    </header>
}

export default Header