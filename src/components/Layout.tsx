import Link from 'next/link';
import { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/search">Search</Link>
                    </li>
                    <li>
                        <Link href="/watchlist">Watch List</Link>
                    </li>
                    {/* Add other navigation links */}
                </ul>
            </nav>
            <main>{children}</main>
        </div>
    );
};

export default Layout;