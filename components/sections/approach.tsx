import type { Content } from "@/lib/content";
import StepGrid from "@/components/sections/step-grid";

export default function Approach({ t }: { t: Content }) {
  return (
    <StepGrid
      id="pristup"
      label={t.approachLabel}
      title={t.approachTitle}
      steps={t.steps}
      micro={t.approachMicro}
    />
  );
}
