import Link from "next/link";

export default function Navbar() {
  return (
    <>
        <header>
            <nav className="flex gap-4 justify-center bg-gradient-to-r from-green-400 to-slate-400 items-center h-16">
                <Link href={'/'}>Home</Link>
                <Link href={'/about'}>About</Link>
                <Link href={'/faculties'}>Faculty</Link>
                <Link href={'/login'}>Login</Link>
            </nav>
        </header>
    </>
  )
}
