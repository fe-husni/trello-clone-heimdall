import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <SignIn appearance={{
    elements: {
      form: {
        display: "none",
      },
      dividerRow: {
        display: "none",
      },
    },
  }} />
}