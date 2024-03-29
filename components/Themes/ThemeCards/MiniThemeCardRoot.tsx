import { twMerge } from "tailwind-merge";
import { PartialCSSThemeInfo } from "../../../types";
import Link from "next/link";
import Image from "next/image";

//This looks large, but it's as optimized as I can make it without looking terrible.
const cssCardBlurDataUrl: string =
  "data:image/jpg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABAQEBAREBIUFBIZGxgbGSUiHx8iJTgoKygrKDhVNT41NT41VUtbSkVKW0uHal5eaoecg3yDnL2pqb3u4u7///8BEBAQEBEQEhQUEhkbGBsZJSIfHyIlOCgrKCsoOFU1PjU1PjVVS1tKRUpbS4dqXl5qh5yDfIOcvampve7i7v/////AABEIAF8AjgMBIgACEQEDEQH/xABjAAADAQEBAQAAAAAAAAAAAAACAwQBBQAGEAEAAwEBAQEBAAAAAAAAAAAAAQISAxMRFGEBAAMBAQEAAAAAAAAAAAAAAAABAgMEBREBAQEBAQEBAAAAAAAAAAAAAAECERIhMf/aAAwDAQACEQMRAD8A+MyzKjLJq6PCOpsvfD8hyPA6V8eybluR4HSstydFRxRNyE+BYVRzHHNNgRxzF5ro5GeLDWuNJHM8wzR1J4lTyGddFjnYbhZ5vRzaJiXDcLI5N80XTWYDFXpoorVs1enxz8RzQGVk1BkuKmU2W5UZeyVVMExU2tRxUyIZ0rnjIqZFBQbVjqIerQ2OYqnR8cm5et8ETzKnku+QGYgYPbnzye8l01hmYbX8Rn9RxzZPNX8gFnPa68z4ih6S9Mmz2PTkkFIQzLPqbpckG0vTdM7pfwbfpentF1ls+JNiyPQ4umuddWx0Xc6Og/VjrLXNdDbNoPUM9SmT1p0PSAz0QeoZ6qsTm/V09Cpuk9QT0YXLrzv4KIbk2lFEcnb6c3UOQzV0vEq3JN0fpD8e+KJ5hwi6Hor4GVGAzUvRX6nZoVoKkekcHpuyWfTB22bJ+tgFaZp77LIgeTLofshmTMhmqeKm3Y5QvpSHO5XdDn0hdKU7EEdKQo3BF7wzqklqF5NtaC9Jqnsl2qbou1kKSXhNMKekp5k4mg+MmBslXUFfB1hg6qiNHUqfFAUUwuMbSZoTaqySLHwSl06/FVe7jego6yXXTx3P0f0Fu7j+0vT2lNN0p7A9XO9WeqTdP1DPVzvVk9C4fVVrlTZPN2bHCqnT02Tbe2OJ4f8ARVsl02LnCsdGtzo6OZFzPRcqLh0J6E2ul9ATc+lMP//Z";

// This essentially just takes in the theme data and either returns an audio card or a css card

function AudioCardImage({ imageSrc, target }: { imageSrc: string; target: string }) {
  return (
    <div className="bg-clip relative h-[162.5px] w-full overflow-hidden rounded-xl drop-shadow-lg">
      <div
        className="absolute h-[162.5px] w-full rounded-xl bg-cover bg-center bg-no-repeat drop-shadow-lg"
        style={{
          backgroundImage: `url(${imageSrc})`,
          filter: "blur(20px) saturate(4) brightness(50%)",
        }}
      />
      <div className="flex h-full w-full items-center justify-center rounded-xl">
        <div
          // I'm still using the format of div-with-a-bg-image, because I think that could make it a bit easier to add icons/text in front if we want
          className="AudioLoader_PackBrowser_SingleItem_PreviewImageContainer"
          style={{
            width: "180px",
            height: "135px",
            position: "relative",
          }}
        >
          <div
            className="absolute left-0 z-30 h-full w-3/4 rounded-sm bg-cover"
            style={{
              background:
                target === "Music"
                  ? "url(https://i.imgur.com/nISGpci.png)"
                  : "linear-gradient(150deg, rgba(0, 0, 0, 0) 0%, rgba(118, 118, 118, 0) 0%, rgba(255, 255, 255, 0.2) 32%, rgba(255, 255, 255, 0.2) 35%, rgba(255, 255, 255, 0.2) 38%, rgba(210, 210, 210, 0) 70%, rgba(0, 0, 0, 0) 100%) 0% 0% / cover",
              backgroundSize: "cover",
            }}
          />
          <div
            style={{
              backgroundImage: `url(${imageSrc})`,
            }}
            className="absolute left-0 z-20 h-full w-3/4 rounded-sm bg-[#21323d] bg-cover bg-center bg-no-repeat"
          />
          <div
            className="absolute right-[5%] z-10 h-full w-1/5 bg-cover bg-right"
            style={{
              backgroundImage:
                target === "Music"
                  ? 'url("https://i.imgur.com/V9t3728.png")'
                  : 'url("https://i.imgur.com/pWm35T0.png")',
            }}
          />
        </div>
      </div>
    </div>
  );
}

function CSSCardImage({ imageSrc }: { imageSrc: string }) {
  return (
    <div className="relative aspect-video h-[162.5px] w-full rounded-xl bg-cover bg-center bg-no-repeat">
      <Image
        alt=""
        src={`${imageSrc}`}
        placeholder={"blur"}
        blurDataURL={cssCardBlurDataUrl}
        fill
        className="rounded-xl object-cover"
      />
    </div>
  );
}

function ThemeCardInfo({ data }: { data: PartialCSSThemeInfo }) {
  return (
    <>
      <div className="flex w-full flex-col items-start p-4">
        <span className="font-fancy w-full max-w-full truncate text-start font-bold">
          {data.displayName}
        </span>
        <div className="font-fancy flex w-full justify-between">
          <span className="flex-grow truncate text-start text-sm text-fore-9-light dark:text-fore-9-dark">
            {data.specifiedAuthor}
          </span>
          <span className="flex text-sm">{data.version}</span>
        </div>
      </div>
    </>
  );
}

export function MiniThemeCardRoot({
  data,
  submissionId = "",
  className = "",
}: {
  data: PartialCSSThemeInfo;
  submissionId?: string;
  className?: string;
}) {
  function imageSRCCreator(): string {
    if (!data.images || data.images.length === 0 || data.images[0].id === "MISSING") {
      return `https://share.deckthemes.com/${data?.type.toLowerCase()}placeholder.png`;
    }
    return `${process.env.NEXT_PUBLIC_API_URL}/blobs/${data?.images[0]?.id}/thumb`;
  }

  function InnerContent() {
    return (
      <div className="rounded-xl border-2 border-borders-base1-light bg-base-3-light transition hover:border-borders-base2-light dark:border-borders-base1-dark dark:bg-base-3-dark hover:dark:border-borders-base2-dark">
        {data.type === "Audio" ? (
          <>
            <AudioCardImage imageSrc={imageSRCCreator()} target={data.target} />
          </>
        ) : (
          <CSSCardImage imageSrc={imageSRCCreator()} />
        )}
        <ThemeCardInfo data={data} />
      </div>
    );
  }

  return (
    <div className={twMerge("flex w-full flex-1 items-center justify-center", className)}>
      {submissionId ? (
        <div className="h-full w-full overflow-hidden rounded-xl transition-all">
          <InnerContent />
        </div>
      ) : (
        <div className="h-full w-full overflow-hidden rounded-xl transition-all hover:-translate-y-1">
          <Link href={`/${data.type === "Audio" ? "packs" : "themes"}/view?themeId=${data.id}`}>
            <InnerContent />
          </Link>
        </div>
      )}
    </div>
  );
}
