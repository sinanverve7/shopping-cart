import React from 'react';
import { Redirect, useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  // Check if the auth state is loaded
  if (!isLoaded) {
    return null; // You can show a loading indicator here if needed
  }

  // Redirect based on the sign-in status
  if (isSignedIn) {
    return <Redirect href="/home" />;
  } else {
    return <Redirect href="/sign-in" />;
  }
}
