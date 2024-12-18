import React, { useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter
import Footer from "../../../components/footer/Footer";
import ChatingArea from "../../../components/chat/ChatingArea";
import Head from "next/head";
import AthleteChatSlider from "@/components/slider/AthleteChatSlider";
import AthleteChatSidebar from "@/components/chat/AthleteChatSidebar";
import AthleteList from "@/components/chat/AthleteList";
import { useSession } from "next-auth/react";

const ChatMainContent = () => {
  const { data: session, status } = useSession(); // Get session and status
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      // Redirect to login if not authenticated
      router.push("/openai/openAILogin"); // Use router.push for redirection
    }
  }, [session, status, router]); // Add router to dependencies

  if (status === "loading") {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <>
      <Head>
        <title>OpenAI - Athlete Chatbot</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.png" />
      </Head>
      <div className="main-content">
        <div className="chatting-panel">
          <div className="d-flex">
            <div className="panel border-end rounded-0">
              <div className="panel-body border-bottom panelbody-openai">
                <AthleteChatSlider />
              </div>
              <AthleteList />
            </div>

            <div className="panel rounded-0 position-relative">
              <ChatingArea />
            </div>
            <AthleteChatSidebar />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ChatMainContent;
