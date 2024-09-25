import { getLoggedInUser } from "@/lib/actions/user.actions";
import MobileNavbar from "../components/MobileNavbar";
import Sidebar from "../components/Sidebar";
import Image from 'next/image'
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const loggedIn = await getLoggedInUser()
    // console.log(loggedIn)

    if (!loggedIn) redirect('/sign-in'); //evita tener que usar useRouter(), que es un componente del lado del servidor


    return (
        <main className="flex h-screen w-full font-inter">
            <Sidebar user={loggedIn} />

            <div className="flex size-full flex-col">
                <div className="root-layout">
                    <Image src="/icons/logo.svg" alt=" logo" width={30} height={30} />
                    <div>
                        <MobileNavbar user={loggedIn} />
                    </div>
                </div>
                {children}
            </div>

        </main>
    );
}
