"use client";
import { useNewsLetter } from "@/hooks/stores/useNewsLetterTrigger";
import React, { useEffect } from "react";

// Function to get a cookie by name
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
}

// Function to set a cookie
function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

const NewsLetterProvider: React.FC = () => {
  const openNewsletter = useNewsLetter((state) => state.onOpen); // Access store function for opening the newsletter modal

  useEffect(() => {
    const handlePageLoad = () => {
      // Function to check and trigger the newsletter
      const checkAndTriggerNewsletter = () => {
        const lastTriggered = getCookie("lastTriggered");

        if (!lastTriggered) {
          // If no timestamp exists, trigger newletter and set the timestamp after 10 seconds
          setTimeout(() => {
            openNewsletter(); // Trigger the newsletter modal using the store function
            setCookie("lastTriggered", Date.now().toString(), 1); // Set cookie for 1 day
          }, 10000); // Trigger after 10 seconds for first-time visitor
        } else {
          // If the timestamp exists, check if 2 hours have passed
          const timePassed = Date.now() - parseInt(lastTriggered);
          const twoHoursInMs = 2 * 60 * 60 * 1000;

          if (timePassed >= twoHoursInMs) {
            // Trigger the newsletter if 2 hours have passed
            openNewsletter(); // Trigger the newsletter modal using the store function
            setCookie("lastTriggered", Date.now().toString(), 1); // Update the timestamp
          }
        }
      };

      // Call the function to check and trigger the newsletter
      checkAndTriggerNewsletter();
    };

    // Ensure that the newsletter triggers only after the page is fully loaded
    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.onload = handlePageLoad; // Trigger after the window is fully loaded
    }
  }, [openNewsletter]);

  return <div></div>;
};

export default NewsLetterProvider;
