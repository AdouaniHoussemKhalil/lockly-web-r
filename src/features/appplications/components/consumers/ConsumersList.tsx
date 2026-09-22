import type { ConsumerDto } from "../../api/models/ConsumerDto"

type Props = {
    consumers: ConsumerDto[]
}

export default function ConsumersList({ consumers }: Props) {
  return (
    <div>ConsumersList</div>
  )
}
