import { DeckIcon } from "@components/DeckIcon";
import InstallSection from "@components/Download/InstallSection";
import Link from "next/link";

export default function DeckDownload() {
  return (
    <>
      <div className="flex h-full w-full max-w-7xl flex-col items-center justify-center gap-6 px-4 pt-4 lg:pt-24">
        {/* Headline */}
        <h1 className="mx-auto max-w-4xl text-center text-5xl font-extrabold tracking-tight sm:text-6xl">
          <span className="">
            CSS Loader <br className="block sm:hidden" />
          </span>{" "}
          for Steam Deck
        </h1>

        {/* Blurb */}
        <p className="font-fancy mx-auto mt-6 max-w-2xl text-center text-sm font-medium leading-6 text-fore-10-light dark:text-fore-10-dark sm:text-lg">
          Steam Deck is supported through Decky Loader. You can also install CSS Loader on your{" "}
          <Link className="text-brandBlue hover:underline" href={"/download/windows"}>
            Windows PC
          </Link>
        </p>

        <InstallSection>
          <InstallSection.Header>Install Decky</InstallSection.Header>

          <InstallSection.Content>
            <div className="w-full">
              Follow the instructions on the{" "}
              <a
                className="text-brandBlue hover:underline"
                href="https://github.com/SteamDeckHomebrew/decky-loader#-installation"
                target="_blank"
                rel="noreferrer"
              >
                Decky repository
              </a>{" "}
              to get started.
            </div>
          </InstallSection.Content>
        </InstallSection>

        <InstallSection>
          <InstallSection.Header>Install CSS Loader</InstallSection.Header>

          <InstallSection.Content>
            <ol className="flex w-full list-decimal flex-col gap-4">
              <li>
                <div className="flex flex-row items-center">
                  Open the <DeckIcon iconName="qam" /> Quick Access menu
                </div>
              </li>

              <li>
                <div className="flex flex-row items-center">
                  Navigate to the <DeckIcon iconName="plug" /> Decky menu
                </div>
              </li>

              <li>
                <div className="flex flex-row items-center">
                  Open the <DeckIcon iconName="decky-store" />
                  Plugin Store
                </div>
              </li>

              <li>
                <div className="flex flex-row items-center">
                  Search for CSS Loader, select it, and install
                </div>
              </li>
            </ol>
          </InstallSection.Content>
        </InstallSection>

        <InstallSection>
          <InstallSection.Header>Using CSS Loader</InstallSection.Header>

          <InstallSection.Content>
            <div className="flex flex-row flex-wrap items-center">
              Now that CSS Loader is installed, you can download and manage your themes in the{" "}
              <div className="inline-flex w-full items-center">
                <DeckIcon iconName="plug" /> Decky menu
              </div>
            </div>
          </InstallSection.Content>
        </InstallSection>
      </div>
    </>
  );
}
