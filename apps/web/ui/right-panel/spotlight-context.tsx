"use client";
import * as React from "react";
import type { Sidebar } from "@modularcloud/headless";

export const SpotlightContext = React.createContext<Sidebar | null>(null);