/* eslint-disable @next/next/no-img-element */
import { useContext } from "react";
import { DownloadButtonWithIcon, HighlightCarousel, HeroReel } from "../components";
import Head from "next/head";
import { desktopModeContext } from "contexts";

export default function Home() {
  const { desktopMode } = useContext(desktopModeContext);

  return (
    <>
      <Head>
        <title>DeckThemes</title>
        <meta name="title" content="DeckThemes" />
        <meta
          name="description"
          content="CSS Loader and Audio Loader themes for Steam Deck and Desktop Steam"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://deckthemes.com/" />
        <meta property="og:title" content="DeckThemes" />
        <meta
          property="og:description"
          content="CSS Loader and Audio Loader themes for Steam Deck and Desktop Steam"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://deckthemes.com/" />
        <meta property="twitter:title" content="DeckThemes" />
        <meta
          property="twitter:description"
          content="CSS Loader and Audio Loader themes for Steam Deck and Desktop Steam"
        />
      </Head>

      <div className="landing-page-bg w-full rounded-t-3xl">
        {/* Hero */}
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-4 pt-16 lg:pt-24">
          {/* Headline */}
          <h1 className="mx-auto max-w-4xl text-center text-5xl font-extrabold tracking-tight sm:text-6xl">
            <span className="">
              Level up <br className="block sm:hidden" />
            </span>{" "}
            your Steam
          </h1>

          {/* Blurb */}
          <p className="font-fancy mx-auto mt-6 max-w-2xl text-center text-sm font-medium leading-6 text-fore-10-light dark:text-fore-10-dark sm:text-lg">
            DeckThemes is the largest repository of custom themes, styles, and audio packs for
            Steam. Available for Steam Deck and Windows.
          </p>

          {/* Download Btns */}
          <div className="font-fancy mt-6 flex flex-col gap-2 sm:flex-row">
            <DownloadButtonWithIcon iconName="steamdeck" />
            <DownloadButtonWithIcon iconName="windows11" />
          </div>

          <div className="landing-gradients">
            <HeroReel />
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative mt-16 flex h-full w-full flex-col items-center gap-8 px-4 pb-12 text-center"
          style={desktopMode ? { justifyContent: "center" } : {}}
        >
          <HighlightCarousel
            options={[
              {
                title: "Big Picture Themes",
                searchFilter: "BPM-CSS",
                hrefLink: "/themes?type=BPM-CSS",
                buttonText: "BPM",
              },
              {
                title: "Desktop Themes",
                searchFilter: "DESKTOP-CSS",
                hrefLink: "/themes?type=DESKTOP-CSS",
                buttonText: "Desktop",
              },
              // This has a trailing ? because the link filler only knows to add "&order="
              {
                title: "Audio Packs",
                searchFilter: "AUDIO",
                hrefLink: "/packs?",
                buttonText: "Audio",
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
