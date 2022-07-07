import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { Message } from '../Icons/Message';

const Header = () => {
  const { user } = useUser();
  return (
    // <header className="navbar bg-base-100">
    //   <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    //     <Link href="/">
    //       <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
    //         <svg
    //           className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
    //           fill="none"
    //           stroke="currentColor"
    //           viewBox="0 0 24 24"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    //           ></path>
    //         </svg>
    //       </a>
    //     </Link>
    //     <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
    //       {user && (
    //         <div className="flex itemx-center justify-center mr-5 capitalize bg-blue-500 py-1 px-3 rounded-md text-white">
    //           <Link href="/admin">
    //             <a>+ Create</a>
    //           </Link>
    //         </div>
    //       )}
    //       {user ? (
    //         <div className="flex items-center space-x-5">
    //           <Link href="/favorites">
    //             <a className="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
    //               My Favorites
    //             </a>
    //           </Link>
    //           <Link href="/api/auth/logout">
    //             <a className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
    //               Logout
    //             </a>
    //           </Link>
    //           <img
    //             alt="profile"
    //             className="rounded-full w-12 h-12"
    //             src={user.picture}
    //           />
    //         </div>
    //       ) : (
    //         <Link href="/api/auth/login">
    //           <a className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
    //             Login
    //           </a>
    //         </Link>
    //       )}
    //     </nav>
    //   </div>
    // </header>
    <div className="navbar bg-slate-100">
      <div className="navbar-start">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl max-w-fit h-full">
            <svg
              className="w-8 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              ></path>
            </svg>
          </a>
        </Link>
      </div>
      <div className="navbar-center lg:flex"></div>
      <div className="navbar-end">
        {user ? (
          <>
            <ul className="menu menu-horizontal p-0">
              <li>
                <Link href="/chats/chat">
                  <a className="btn btn-ghost normal-case text-xl max-w-fit h-fit flex items-center">
                    <div className="flex flex-row gap-2 items-center">
                      <span className="hidden sm:contents">Messages</span>
                      <Message className="w-8 stroke-2 fill-secondary" />
                    </div>
                  </a>
                </Link>
              </li>
            </ul>
            <div className="flex gap-1">
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className={`w-12 rounded-full p-0 btn btn-ghost`}
                >
                  <div className="avatar">
                    <img
                      className="object-cover rounded-full max-w-max h-full"
                      src={user.picture}
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-3 p-2 shadow-xl bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link href="/api/auth/logout">
                      <a>Logout</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <Link href="/api/auth/login">
            <a className="btn hover:bg-base-100 focus:outline-none text-base">
              Login
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
