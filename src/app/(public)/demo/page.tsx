import { seedDatabaseAction } from '&/actions'

export default function Page() {
  return (
    <div>
      <h1>Seed Vector DB</h1>
      <form
        action={async () => {
          'use server'
          await seedDatabaseAction()
        }}
      >
        <button type='submit'>seed db</button>
      </form>
    </div>
  )
}
