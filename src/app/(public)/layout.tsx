import { PublicHeader } from '&/components/public-header'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <PublicHeader />
      <main>{children}</main>
    </div>
  )
}
