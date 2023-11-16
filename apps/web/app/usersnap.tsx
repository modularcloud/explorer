"use client";

import Script from "next/script";

export function UsersnapScript() {
  return (
    <>
      <Script id="preUsersnap">{`window.onUsersnapLoad = function(api) { api.init(); window.Usersnap = api; }`}</Script>
      <Script
        id="usersnap"
        src="https://widget.usersnap.com/global/load/cd4f37a6-76b6-4bda-8f77-683d06163d38?onload=onUsersnapLoad"
      />
    </>
  );
}
