"use client";
import { DelayBadge } from "../components/cases/DelayBadge";
import { CardHeader } from "../components/cases/CardHeader";
import { OpenButton } from "../components/cases/OpenButton";

export default function Home() {
  return (
    <main className="flex flex-row gap-4 p-8">
      <DelayBadge delayDays={-2} />
      <CardHeader
        itemName="COVER,FRONT(CDA)"
        itemCode="3B10-645521-11"
        dueDate="2023-10-01"
        replyDate="2023-10-08"
      />
      <OpenButton />
    </main>
  );
}
