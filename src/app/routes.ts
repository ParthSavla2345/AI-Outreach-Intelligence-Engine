import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import { Leads } from "./pages/Leads";
import { StrategyEngine } from "./pages/StrategyEngine";
import { ChannelOptimizer } from "./pages/ChannelOptimizer";
import { TimingInsights } from "./pages/TimingInsights";
import { GraphIntelligence } from "./pages/GraphIntelligence";
import { ContentGenerator } from "./pages/ContentGenerator";
import { Analytics } from "./pages/Analytics";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "leads", Component: Leads },
      { path: "strategy", Component: StrategyEngine },
      { path: "channels", Component: ChannelOptimizer },
      { path: "timing", Component: TimingInsights },
      { path: "graph", Component: GraphIntelligence },
      { path: "content", Component: ContentGenerator },
      { path: "analytics", Component: Analytics },
      { path: "settings", Component: Settings },
    ],
  },
]);
