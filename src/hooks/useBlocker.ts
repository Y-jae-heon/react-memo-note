/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { To, unstable_useBlocker, useNavigate } from "react-router-dom";

/**
 * React-router-dom 6.22.1 부터는 useBlocker 훅이 따로 제공됨.
 */
interface UseBlockerProps {
  isBlock?: boolean;
  browserBackClick: (url: unknown, action: string) => boolean | void;
}

/**
 *
 * @param isBlock 블락 여부 판단 변수
 * @param browserBackClick 뒤로가기 핸들링 함수
 * @returns change navigation nextpath
 */
function useBlocker({ isBlock, browserBackClick }: UseBlockerProps) {
  const navigate = useNavigate();
  const [navUrl, setNavUrl] = useState<To>();
  const [params, setParams] = useState<{ [key: string]: any }>();

  const onSetUrl = useCallback((url: To, state?: { [key: string]: any }) => {
    setNavUrl(url);
    setParams(state);
  }, []);

  useEffect(() => {
    if (navUrl === "-1") {
      navigate(-1);
    } else if (navUrl) {
      navigate(navUrl, { state: params });
    }
  }, [navUrl, navigate, params]);

  const blockNavigation = useCallback(
    (tx: any) => {
      console.log(tx.historyAction, "::: history");
      if (tx.historyAction === "POP" && isBlock) {
        browserBackClick(tx.nextLocation.pathname, tx.historyAction);
        return true;
      }
      if (tx.historyAction === "POP" && !isBlock) {
        return false;
      }
      if (tx.historyAction === "PUSH" && !navUrl && isBlock) {
        browserBackClick(tx.nextLocation.pathname, tx.historyAction);
        return true;
      }
      if (tx.historyAction === "PUSH" && !navUrl && !isBlock) {
        return false;
      }
      if (!isBlock) return false;
      return false;
    },
    [browserBackClick, isBlock, navUrl]
  );

  unstable_useBlocker(blockNavigation);

  const preventClose = useCallback(
    (e: BeforeUnloadEvent) => {
      if (isBlock) {
        e.preventDefault();
        e.returnValue = ""; // chrome에서는 설정이 필요해서 넣은 코드
      }
    },
    [isBlock]
  );

  useEffect(() => {
    window.addEventListener("beforeunload", preventClose);

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, [preventClose]);

  return { onSetUrl };
}

export default useBlocker;
