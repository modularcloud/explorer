"use client";
import * as React from "react";

import { loadSpace } from '@usersnap/browser'
import {useEffect} from 'react'

export function UserSnap({}: {}) {
  useEffect(()=> {
    // TODO use env variable
    loadSpace("502e49a7-69bd-400b-86b5-aa8275f8d8d4").then((api) => {
      api.init()
  })
  }, []);
  return (
    <></>
  );
}
