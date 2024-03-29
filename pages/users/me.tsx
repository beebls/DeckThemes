import { useContext, useEffect, useState } from "react";
import { authContext } from "contexts";
import { clearCookie, genericFetch, genericGET } from "../../apiHelpers";
import {
  AccountKeyDisplay,
  AddEmailForm,
  LoadingPage,
  LogInPage,
  PfpDisplay,
  ThemeCategoryDisplay,
  TransitionedCarouselTitle,
} from "../../components";
import Head from "next/head";
import { useHasCookie } from "../../hooks";
import { UserInfo } from "../../types";
import { HorizontalRadio } from "@components/Primitives/HorizontalRadio";
import { RadioDropdown, SquishyButton } from "@components/Primitives";

export default function Account() {
  const { accountInfo, setAccountInfo } = useContext(authContext);

  const hasCookie = useHasCookie();

  const [meInfo, setMeInfo] = useState<UserInfo>();

  const [radioValue, setRadioValue] = useState<string>("stars");
  const radioOptions = [
    { value: "stars", displayText: "Stars", title: "Your Stars" },
    { value: "themes", displayText: "Themes", title: "Your Themes" },
    {
      value: "submissions",
      displayText: "Submissions",
      title: "Your Submissions",
    },
  ];

  useEffect(() => {
    genericGET(`/auth/me_full`).then((data) => {
      if (data) {
        setMeInfo(data);
      }
      return;
    });
  }, []);

  function logOut() {
    setAccountInfo(undefined);
    clearCookie();
  }

  function logOutAll() {
    const isSure = confirm("This will remove all signed in web browsers and Steam Decks");
    if (isSure) {
      genericFetch("/users/me/logout_all", { method: "POST" }, true).then((success) => {
        if (success) {
          setAccountInfo(undefined);
          clearCookie();
        }
      });
    }
  }

  if (accountInfo?.username) {
    return (
      <>
        <Head>
          <title>DeckThemes | My Profile</title>
        </Head>
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
          <PfpDisplay userData={meInfo || accountInfo} />
          <TransitionedCarouselTitle
            className="px-4 pb-20"
            titles={radioOptions.map((e) => e.title)}
            currentTitle={
              radioOptions.find((e) => e.value === radioValue)?.title || radioOptions[0].title
            }
          />
          <div className="mx-4 block md:hidden">
            <RadioDropdown
              ariaLabel="Your Theme Types Dropdown"
              options={radioOptions}
              value={radioValue}
              onValueChange={setRadioValue}
            />
          </div>
          <div className="hidden w-full items-center justify-center md:flex">
            <HorizontalRadio
              rootClass="self-center pb-4"
              options={radioOptions}
              value={radioValue}
              onValueChange={setRadioValue}
            />
          </div>
          <ThemeCategoryDisplay
            typeOptionPreset="All"
            themesPerPage={4}
            useSubmissionCards={radioValue === "submissions"}
            themeDataApiPath={`/users/me/${radioValue}`}
            filterDataApiPath={`/users/me/${radioValue}/filters`}
          />
          <AddEmailForm />
          <AccountKeyDisplay />
          <div className="flex flex-col gap-6 p-4">
            <span className="font-fancy text-xl font-semibold">Log Out</span>
            <SquishyButton onClick={logOut} customClass="bg-red-500 hover:bg-red-600">
              <div className="font-fancy text-xs font-bold">Log out</div>
            </SquishyButton>
            <SquishyButton onClick={logOutAll} customClass="border-red-500 hover:bg-red-600">
              <div className="font-fancy text-xs font-bold">Log out all devices</div>
            </SquishyButton>
          </div>
        </div>
      </>
    );
  }
  if (hasCookie) {
    return <LoadingPage />;
  }

  if (!accountInfo?.username) {
    return <LogInPage />;
  }
}
