import Link from "next/link";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { Url } from "url";
import {
  FormattedSubmissionIntent,
  FormattedSubmissionStatus,
  ThemeSubmissionInfo,
} from "../../types";
import { MiniThemeCardRoot } from "./MiniThemeCardRoot";

export function MiniSubmissionCard({ data }: { data: ThemeSubmissionInfo }) {
  return (
    <Link
      href={`/submissions/view?submissionId=${data.id}`}
      className="flex flex-col items-center transition-all hover:translate-y-1 bg-cardLight dark:bg-cardDark hover:bg-borderLight hover:dark:bg-borderDark p-4 rounded-3xl w-[300px] text-center"
    >
      <span className="text-xl mb-2">{FormattedSubmissionIntent[data.intent]}</span>
      <MiniThemeCardRoot data={data.newTheme} submissionId={data.id} />
      {
        (() => {
          switch (data.status) {
            case "Approved":
              return (
                <>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center text-xl gap-2 mt-2">
                      <BsCheckCircleFill className="text-emerald-600" />
                      <span>Approved</span>
                    </div>
                    {data?.message ? (
                      <span>
                        <span className="text-textFadedLight dark:text-textFadedDark">
                          Moderator Comment:
                        </span>{" "}
                        {data.message}
                      </span>
                    ) : (
                      <span>No Message Provided</span>
                    )}
                  </div>
                </>
              );
            case "Denied":
              return (
                <>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center text-xl gap-2 mt-2">
                      <BsXCircleFill className="text-red-500" />
                      <span>Denied</span>
                    </div>
                    {data?.message ? (
                      <>
                        <span>
                          <span className="text-textFadedLight dark:text-textFadedDark">
                            Moderator Comment:
                          </span>{" "}
                          {data.message}
                        </span>
                      </>
                    ) : (
                      <span>No Message Provided</span>
                    )}
                  </div>
                </>
              );
            case "Dead":
              return (
                <>
                  <div>Dead</div>
                </>
              );
            case "AwaitingApproval":
              return (
                <>
                  <div className="flex flex-col items-center">
                    <span>Awaiting Review</span>
                    <span>Submitted On {new Date(data.submitted).toLocaleDateString()}</span>
                    {data?.errors ? (
                      <>
                        <span>
                          {data.errors.length} Error{data.errors.length === 1 ? "" : "s"}
                        </span>
                      </>
                    ) : (
                      <>
                        <span>No Errors</span>
                      </>
                    )}
                  </div>
                </>
              );
            default:
              return null;
          }
        })() // I LOOOOOOOOOOOOOOOOVE self-invoking anonymous functions!
      }
    </Link>
  );
}
