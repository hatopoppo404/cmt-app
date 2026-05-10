import type { Case } from "@/types/case"

// export const CaseCard = ({
//   itemName,
//   itemCode,
//   quantity,
// }: Props) => {
//   return (
//     <>
//         <DelayBadge delayDays={delayDays} />
//     </>
//   )
// }


type DelayBadgeProps = {
  delayDays: number
}
export const DelayBadge = ({
    delayDays,
}:DelayBadgeProps) => {
    const days = delayDays
const statusMap = {
    danger: {
        color: "bg-[var(--color-error)]",
        text: "危険",
    },
    warning: {
        color: "bg-[var(--color-warning)]",
        text: "注意",
    },
    safe: {
        color: "bg-[var(--color-success)]",
        text: "安全",
    },
}

const status =
    days <= -2
        ? "danger"
        : days <= 1
        ? "warning"
        : "safe"

const badge = statusMap[status]
  return (
    <div
      className={`
        w-20
        aspect-square
        rounded-md
        p-3

        ${badge.color}
        text-white

        grid 
        grid-cols-[14px_1fr]
        grid-rows-[auto_1fr]
        gap-1
      `}
    >
        <div className="
            flex
            items-center
            justify-center
        ">
            <svg 
                width="14" 
                height="14"
                viewBox="0 0 14 14" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                >
                <path 
                    d="M6.66667 10.6667C7.77778 10.6667 8.72222 10.2778 9.5 9.5C10.2778 8.72222 10.6667 7.77778 10.6667 6.66667C10.6667 5.55556 10.2778 4.61111 9.5 3.83333C8.72222 3.05556 7.77778 2.66667 6.66667 2.66667V6.66667L3.83333 9.5C4.22222 9.86667 4.65833 10.1528 5.14167 10.3583C5.625 10.5639 6.13333 10.6667 6.66667 10.6667ZM6.66667 13.3333C5.74444 13.3333 4.87778 13.1583 4.06667 12.8083C3.25556 12.4583 2.55 11.9833 1.95 11.3833C1.35 10.7833 0.875 10.0778 0.525 9.26667C0.175 8.45555 0 7.58889 0 6.66667C0 5.74444 0.175 4.87778 0.525 4.06667C0.875 3.25556 1.35 2.55 1.95 1.95C2.55 1.35 3.25556 0.875 4.06667 0.525C4.87778 0.175 5.74444 0 6.66667 0C7.58889 0 8.45555 0.175 9.26667 0.525C10.0778 0.875 10.7833 1.35 11.3833 1.95C11.9833 2.55 12.4583 3.25556 12.8083 4.06667C13.1583 4.87778 13.3333 5.74444 13.3333 6.66667C13.3333 7.58889 13.1583 8.45555 12.8083 9.26667C12.4583 10.0778 11.9833 10.7833 11.3833 11.3833C10.7833 11.9833 10.0778 12.4583 9.26667 12.8083C8.45555 13.1583 7.58889 13.3333 6.66667 13.3333ZM6.66667 12C8.15555 12 9.41667 11.4833 10.45 10.45C11.4833 9.41667 12 8.15555 12 6.66667C12 5.17778 11.4833 3.91667 10.45 2.88333C9.41667 1.85 8.15555 1.33333 6.66667 1.33333C5.17778 1.33333 3.91667 1.85 2.88333 2.88333C1.85 3.91667 1.33333 5.17778 1.33333 6.66667C1.33333 8.15555 1.85 9.41667 2.88333 10.45C3.91667 11.4833 5.17778 12 6.66667 12Z" 
                    fill="white"
                    />
            </svg>
        </div>

        <span 
            className="
                text-sm
                font-bold
            "
        >
            {badge.text}
        </span>

        <div className="
            col-span-2
            flex
            items-center
            justify-center
        ">
            <span 
                className="
                    text-xl
                    font-bold
                "
                >
                {days}
            </span>
        </div>
    </div>
  )
}
type MainBodyProps = {
  itemName: string
  itemCode: string
  dueDate: string
  replyDate: string
}
export const MainBody = ({
    itemName,
    itemCode,
    dueDate,
    replyDate,
}: MainBodyProps) => {
    
  return (
    <div>
        <div
            className="
                flex
                flex-col
                gap-1
            "
        >
            <p className="text-sm">{itemName}</p>
            <h3 className="text-xl font-bold">{itemCode}</h3>
            <div className="
                flex
                flex-row
                gap-1

                text-sm
            ">
            <p>回答 {replyDate}</p>
            <p>希望 {dueDate}</p>
            </div>
        </div>
    </div>
  )
}