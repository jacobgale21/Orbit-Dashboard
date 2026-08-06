import { MissionMap } from "../components/missionMap";
import SiteNavbar from "../components/navBar";
import Chatbot from "../components/chat/chatbot";
export function MapPage() {
  return (
    <div>
      <SiteNavbar />
      <MissionMap />
      <Chatbot />
    </div>
  );
}
