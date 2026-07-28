//Display a list of suggested prompts for the chatbot as buttons
// The buttons should be styled like the chatbot's input field
//Initally we should have set answers or navigation to other pages as suggested prompts

import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

// Set up navigation through buttons

export default function SuggestedPrompts() {
  const navigate = useNavigate();
  const location = useLocation();

  function goToSection(sectionId: string) {
    // If already on dashboard, just scroll
    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }
    // Coming from another route — go home with hash
    navigate({ pathname: "/", hash: sectionId });
  }
  return (
    <div className="flex flex-wrap justify-start gap-2">
      <Button
        variant="outline"
        className="text-xs"
        onClick={() => navigate("/map")}
      >
        What do we need to do before a Mars mission?
      </Button>
      <Button
        variant="outline"
        className="text-xs"
        onClick={() => navigate("/future")}
      >
        How to colonize the Solar System?
      </Button>
      <Button
        variant="outline"
        className="text-xs"
        onClick={() => goToSection("discoveries")}
      >
        What are some key space discoveries?
      </Button>
      <Button
        variant="outline"
        className="text-xs"
        onClick={() => goToSection("missions")}
      >
        What are some historical space missions?
      </Button>
    </div>
  );
}
