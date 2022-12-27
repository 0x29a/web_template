import NProgress from "nprogress";
import { useSelector } from "react-redux";

import { isAnyRequestPendingSelector, isAuthInitializedSelector } from "../../lib/selectors";

// This component renders a progress bar at the top of the page when an RTK Query or firebase request is pending.
export function ProgressBar() {
  const isAnyRequestPending = useSelector(isAnyRequestPendingSelector);
  const isAuthInitialized = useSelector(isAuthInitializedSelector);

  if (typeof document !== "undefined") {
    if ((isAnyRequestPending || !isAuthInitialized) && !NProgress.isStarted()) {
      NProgress.start();
    } else if (!isAnyRequestPending && isAuthInitialized && NProgress.isStarted()) {
      NProgress.done();
    }
  }
  return null;
}
