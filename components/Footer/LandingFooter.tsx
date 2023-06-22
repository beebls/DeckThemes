import { FaRegMoon, FaRegSun } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { NavIconLink } from "@components/Nav";
import { useTheme } from "next-themes";
import { useContext } from "react";
import { desktopModeContext } from "@pages/_app";
import { PatreonFooterBar } from "./PatreonFooterBar";

export function LandingFooter() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { desktopMode } = useContext(desktopModeContext);

  const src = () => {
    if (router.pathname.includes("/packs")) {
      // @ts-ignore
      return theme === "light" ? "/logo_audio_lightmode.png" : "/logo_audio_darkmode.png";
    }
    // @ts-ignore
    return theme === "light" ? "/logo_css_lightmode.png" : "/logo_css_darkmode.png";
  };

  return (
    <footer className="mt-auto flex h-fit w-full flex-col">
      <div className="mx-auto my-16 w-full max-w-7xl">
        <div className="flex flex-col justify-between gap-20 px-8 lg:flex-row">
          {/* logo section */}
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-4">
              <Link
                href={"/"}
                className="group flex select-none items-center transition duration-150 hover:scale-95 hover:active:scale-90 "
              >
                <>
                  <Image
                    src={src()}
                    height="24"
                    width="24"
                    alt="CSSLoader Logo"
                    className="transition duration-1000 group-hover:brightness-150 group-hover:hue-rotate-180"
                  />
                  <span className="font-fancy hidden pl-4 text-xl font-semibold md:flex">
                    DeckThemes
                  </span>
                </>
              </Link>
              <button
                className=" text-textLight hover:text-bgDark dark:text-textDark dark:hover:text-bgLight"
                onClick={() => {
                  theme === "light" ? setTheme("dark") : setTheme("light");
                }}
              >
                {theme === "light" ? <FaRegSun size={18} /> : <FaRegMoon size={18} />}
              </button>
            </div>

            <p className="font-fancy text-sm text-fore-10-light dark:text-fore-10-dark">
              DeckThemes is the largest repository of custom themes, styles, and audio packs for
              Steam.
            </p>
            <p className="font-fancy max-w-2xl text-sm text-fore-6-light dark:text-fore-5-dark">
              Decky Loader, CSS Loader, and Audio Loader are not affiliated with Valve Corporation.
              Steam, the Steam logo, Steam Deck, and the Steam Deck logo are trademarks and/or
              registered trademarks of Valve Corporation in the U.S. and/or other countries.
            </p>
          </div>

          <div className="flex flex-row gap-32">
            {!desktopMode && (
              <div className="flex flex-col">
                <span className="text-brandBlue">Socials</span>
                <ul className="my-4 flex w-max flex-col gap-4">
                  <li className="list-none">
                    {!!process.env.NEXT_PUBLIC_DISCORD_URL && (
                      <NavIconLink
                        ariaLabel="Our Discord"
                        href={process.env.NEXT_PUBLIC_DISCORD_URL}
                        className="flex items-center gap-2"
                      >
                        <div className="">Discord</div>
                      </NavIconLink>
                    )}
                  </li>
                  <li>
                    {!!process.env.NEXT_PUBLIC_PATREON_URL && (
                      <NavIconLink
                        ariaLabel="Our Patreon"
                        href={process.env.NEXT_PUBLIC_PATREON_URL}
                        className="flex items-center gap-2"
                      >
                        <div className="">Patreon</div>
                      </NavIconLink>
                    )}
                  </li>
                </ul>
              </div>
            )}
            <div className="flex flex-col items-start">
              <span className="text-brandBlue">Policies</span>
              <ul className="my-4 flex w-max flex-col gap-4">
                <li className="list-none">
                  <Link href="/tos" className="">
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <PatreonFooterBar />
      </div>
    </footer>
  );
}
