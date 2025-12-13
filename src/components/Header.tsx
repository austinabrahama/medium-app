import { FC } from 'react'
import Link from 'next/link'

const Header:FC = () => {
  return (
    <header className="mx-auto flex max-w-7xl justify-between items-center p-5">
        <div className="flex items-center space-x-5">
            <Link href="/">
                <img className="w-44 object-contain cursor-pointer" src="https://miro.medium.com/v2/resize:fit:8978/1*s986xIGqhfsN8U--09_AdA.png" alt="Medium Logo" />
            </Link>
            <h3 className="hidden md:inline-block">About</h3>
            <h3 className="hidden md:inline-block">Contact</h3>
            <button className="rounded-full bg-green-400 px-4 py-2 text-white">Follow</button>
        </div>

        <div className="flex items-center space-x-5 text-sm">
            <h3 className="hidden md:inline-block text-green-400">Sign In</h3>
            <button className="rounded-full text-green-400 px-4 py-2 border border-green-400">Get Started</button>
        </div>
    </header>
  )
}

export default Header