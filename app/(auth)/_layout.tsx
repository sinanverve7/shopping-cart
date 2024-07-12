import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack, useRootNavigationState } from "expo-router";
import React from "react";

export default function AuthRoutesLayout() {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  return <Stack />;
}
