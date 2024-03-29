"use client";
import * as React from "react";
import { ArrowRight, Recycle, FancyCheck } from "~/ui/icons";
import { Tooltip } from "~/ui/tooltip";
import { SearchModal } from "./search-modal";
import { Button } from "~/ui/button";
import { LoadingIndicator } from "~/ui/loading-indicator";
import { useParams, useRouter } from "next/navigation";
import { cn } from "~/ui/shadcn/utils";
import { DEFAULT_BRAND_COLOR } from "~/lib/constants";
import { useSearchOptionsContext } from "~/ui/search-options-context";

export function SearchForm() {
  const params = useParams();
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const optionGroups = useSearchOptionsContext();

  const network = React.useMemo(() => {
    const values = optionGroups.flat();
    return (
      values.find((network) => network.slug === params.network) ?? values[0]
    );
  }, [optionGroups, params.network]);

  const primaryColor = !!params.network
    ? network.brandColor!
    : DEFAULT_BRAND_COLOR;

  const defaultSearchModalNetwork = React.useMemo(
    () => ({
      value: network,
    }),
    [network],
  );

  return (
    <div
      style={{
        "--color-primary": primaryColor,
      }}
      className={cn(
        "flex items-stretch rounded-lg border border-mid-dark-100 bg-white max-w-[450px] min-w-0 w-full mx-auto",
        "focus-within:border-primary focus-within:border-1.5",
        "shadow-sm h-12 text-sm",
      )}
    >
      <SearchModal
        defaultNetwork={defaultSearchModalNetwork}
        brandColor={primaryColor}
        optionGroups={optionGroups}
      >
        <Button
          className={cn(
            "border-0 border-r rounded-r-none h-full border-mid-dark-100 flex-none min-w-0 text-sm tab:text-base",
            "tab:px-4 px-2",
          )}
        >
          <div className="inline-flex gap-1 tab:gap-2 items-center">
            <span aria-hidden="true">{network.displayName}</span>
            <span className="sr-only">
              Current network : {network.displayName} of {network.brandName},
            </span>
            {network.verified && (
              <Tooltip label="This chain is verified">
                <span>
                  <FancyCheck
                    className="text-primary h-6 w-6 flex-none"
                    aria-hidden="true"
                  />
                </span>
              </Tooltip>
            )}
          </div>
          <div>
            <Recycle className="text-muted" aria-hidden="true" />
          </div>
        </Button>
      </SearchModal>

      <form
        className={cn(
          "flex flex-shrink min-w-0 items-stretch rounded-r-lg",
          "hover:bg-muted/5 transition duration-200",
          "max-w-full flex-1 h-full justify-between gap-0",
          "text-sm tab:text-base",
        )}
        action={`/${network.slug}/search`}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);

          const searchQuery = formData.get("q")?.toString();
          // this makes sure we don't navigate to an empty search route (which would throw a 404)
          if (searchQuery) {
            startTransition(() =>
              router.push(
                `/${network.slug}/search/${encodeURIComponent(searchQuery)}`,
              ),
            );
          }
        }}
      >
        <input
          type="text"
          name="q"
          placeholder="Explore"
          className="focus:outline-none placeholder:text-muted font-medium bg-transparent py-2 pl-4 h-full flex-1 min-w-0"
          onChange={(e) => {
            if (e.target.value) {
              // prefetch on search to make the navigation faster
              router.prefetch(
                `/${network.slug}/search/${encodeURIComponent(e.target.value)}`,
              );
            }
          }}
        />

        <button
          className="h-full flex-none rounded-r-lg px-4 py-2 inline-flex items-center justify-center"
          type="submit"
        >
          {isPending ? (
            <LoadingIndicator className="h-4 w-4 text-muted" />
          ) : (
            <ArrowRight
              className="text-muted flex-none h-3 w-3"
              aria-hidden="true"
            />
          )}
        </button>
      </form>
    </div>
  );
}
