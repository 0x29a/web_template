import type { ReactElement } from "react"
import Head from "next/head";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout({
    children
}: { children: ReactElement }) {
    return (
        <>
            <Head>
                <title>Web Template</title>
            </Head>
            <div className="antialiased bg-white text-gray-900 tracking-light">
                <div className="flex flex-col min-h-screen overflow-hidden">
                    <Header />
                    <main className="grow">
                        {children}
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    )
}
