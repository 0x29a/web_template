import type { ReactElement } from 'react'
import Head from "next/head";


export default function Layout({
    children
}: { children: ReactElement }) {
    return (
        <>
            <Head>
                <title>Web Template</title>
            </Head>
            <main>
                {children}
            </main>
        </>
    )
}