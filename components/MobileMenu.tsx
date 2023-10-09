"use client";

import { Disclosure } from "@headlessui/react";
import { useSearchParams, useParams, usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

interface IMobileMenu {
  page: string;
}

export default function MobileMenu() {
  const pathname = usePathname();

  return (
    <div className="flex md:hidden">
      <Disclosure as="nav" className="top-2 bg-slate-100">
        {({ open }) => (
          <>
            {/* Mobile menu button */}
            <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 h-10 w-10 z-10">
              <span className="sr-only">Open main menu</span>
              {open ? (
                <RxCross1 className="h-10 w-10" aria-hidden="true" />
              ) : (
                <GiHamburgerMenu className="h-10 w-10" aria-hidden="true" />
              )}
            </Disclosure.Button>

            <Disclosure.Panel className="sm:hidden  w-64">
              <div className="space-y-1 pb-4 pt-2  w-64">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                <Disclosure.Button
                  as="a"
                  href="/about"
                  className={`${
                    pathname === "/about"
                      ? "border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
                      : "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  About
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/fixtures"
                  className={`${
                    pathname === "/fixtures"
                      ? "border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
                      : "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  Fixtures
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/articles"
                  className={`${
                    pathname === "/articles"
                      ? "border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
                      : "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  Articles
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/tools"
                  className={`${
                    pathname === "/tools"
                      ? "border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
                      : "block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                  }`}
                >
                  Tools
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
