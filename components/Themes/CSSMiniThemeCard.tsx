import Link from "next/link";
import { PartialCSSThemeInfo } from "../../types";

export function CSSMiniThemeCard({
  data,
  submissionId = "",
}: {
  data: PartialCSSThemeInfo;
  submissionId?: string;
}) {
  function imageSRCCreator(): string {
    if (data?.images[0]?.id && data.images[0].id !== "MISSING") {
      return `${process.env.NEXT_PUBLIC_API_URL}/blobs/${data?.images[0]?.id}`;
    } else {
      return `https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Steam_Deck_logo_%28blue_background%29.svg/2048px-Steam_Deck_logo_%28blue_background%29.svg.png`;
    }
  }

  function InnerContent() {
    return (
      <div className="bg-cardLight dark:bg-cardDark rounded-xl">
        <div
          className="rounded-xl bg-cover bg-center bg-no-repeat w-[260px] h-[162.5px] drop-shadow-lg"
          style={{
            backgroundImage: `url(${imageSRCCreator()})`,
          }}
        />
        <div className="flex flex-col items-start p-4">
          <span className="font-bold">{data.name}</span>
          <div className="flex justify-between w-full">
            <span>{data.specifiedAuthor}</span>
            <span>{data.version}</span>
          </div>
        </div>
      </div>
    );
  }

  if (submissionId) {
    return (
      <div className="transition-all sm:w-[260px] w-full">
        <div>
          <InnerContent />
        </div>
      </div>
    );
  }

  return (
    <div className="transition-all sm:w-[260px] w-full">
      <Link href={`/themes/view?themeId=${data.id}`}>
        <InnerContent />
      </Link>
    </div>
  );
}
