import { DelayBadge,MainBody } from "../components/cases/CaseCard"

export default function Home() {
  return (
    <main className="
        p-8
        flex
        flex-row
        gap-4
    ">
      <DelayBadge delayDays={-2} />
      <MainBody 
        itemName="COVER,FRONT(CDA)"
        itemCode="3B10-645521-11"
        dueDate="2023-10-01"
        replyDate="2023-10-08"
      />
    </main>
  )
}