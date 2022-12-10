import Head from "next/head";
import { useEffect, useState } from "react";
import { generateParamStr, genericGET } from "../../api";
import {
  CSSMiniThemeCard,
  FilterSelectorCard,
  LoadingSpinner,
  PageSelector,
} from "../../components";
import { FilterQueryResponse, ThemeQueryRequest, ThemeQueryResponse } from "../../types";

export default function Themes() {
  const [themeArr, setThemeArr] = useState<ThemeQueryResponse>({ total: 0, items: [] });
  const [loaded, setLoaded] = useState<boolean>(false);

  const [serverSearchOpts, setServerSearchOpts] = useState<FilterQueryResponse>({
    filters: [],
    order: [],
  });
  const [chosenSearchOpts, setChosenSearchOpts] = useState<ThemeQueryRequest>({
    page: 1,
    perPage: 25,
    filters: "",
    order: "",
    search: "",
  });

  useEffect(() => {
    async function getAndSetThemes() {
      // This just changes "All" to "", as that is what the backend looks for
      const searchOpts = generateParamStr(
        chosenSearchOpts.filters !== "All" ? chosenSearchOpts : { ...chosenSearchOpts, filters: "" }
      );
      const data = await genericGET(
        `/css_themes${searchOpts}`,
        "Error Fetching Submissions!",
        true
      );
      if (data) {
        setThemeArr(data);
      }
      setLoaded(true);
    }
    getAndSetThemes();
  }, [chosenSearchOpts]);

  useEffect(() => {
    async function getFilters() {
      const filterData = await genericGET("/css_themes/filters", "Error Fetching Theme Filters!");
      if (filterData) {
        setServerSearchOpts(filterData);
      }
    }
    getFilters();
  }, []);

  return (
    <>
      <Head>
        <title>CSSLoader</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-bold text-3xl md:text-5xl pt-4 text-glow-mdDark">Theme Viewer</h2>
          <FilterSelectorCard
            filterOpts={serverSearchOpts.filters}
            onFilterChange={(e) => {
              setChosenSearchOpts({ ...chosenSearchOpts, filters: e.target.value });
            }}
            orderOpts={serverSearchOpts.order}
            onOrderChange={(e) => {
              setChosenSearchOpts({ ...chosenSearchOpts, order: e.target.value });
            }}
            searchValue={chosenSearchOpts.search}
            onSearchChange={(e) => {
              setChosenSearchOpts({ ...chosenSearchOpts, search: e.target.value });
            }}
          />
          {themeArr.total > 0 ? (
            <>
              <div className="flex gap-4 flex-wrap items-center justify-center px-10">
                {themeArr.items.map((e) => {
                  return <CSSMiniThemeCard data={e} key={`ThemeCard ${e.id}`} />;
                })}
              </div>
              <div className="mt-4 mx-4">
                <PageSelector
                  total={themeArr.total}
                  perPage={chosenSearchOpts.perPage}
                  currentPage={chosenSearchOpts.page}
                  onChoose={(page) => {
                    setChosenSearchOpts({ ...chosenSearchOpts, page: page });
                  }}
                />
              </div>
            </>
          ) : (
            <>
              {loaded ? (
                <span className="pt-10 text-xl text-red-500">No Themes Found</span>
              ) : (
                <div className="flex items-center text-4xl gap-2 pt-10">
                  <LoadingSpinner />
                  <span>Loading</span>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
