"use client";

import { useCallback, useEffect, useState } from "react";
import type { Lang } from "@/lib/content";

export const LANG_KEY = "fcd-lang";

/**
 * The stored locale, read synchronously. The demo iframe needs this on mount
 * to build its src: effects run children-first, so a child cannot wait for
 * `useLang`'s own effect to settle.
 */
export function readStoredLang(): Lang {
  if (typeof window === "undefined") return "cs";
  const saved = window.localStorage.getItem(LANG_KEY);
  return saved === "en" || saved === "cs" ? saved : "cs";
}

/**
 * The site's locale mechanism: client state persisted to localStorage, with
 * `<html lang>` kept in step. There are no locale-prefixed routes, so this
 * hook is what every page shares — the homepage and /demo must read and write
 * the same key or the toggle would disagree between them.
 */
export function useLang(): [Lang, (next: Lang) => void] {
  const [lang, setLang] = useState<Lang>("cs");

  useEffect(() => {
    setLang(readStoredLang());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const changeLang = useCallback((next: Lang) => {
    setLang(next);
    window.localStorage.setItem(LANG_KEY, next);
  }, []);

  return [lang, changeLang];
}
