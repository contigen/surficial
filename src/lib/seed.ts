// seed.ts
async function main() {
  console.log('Starting to seed vector database...')
  const response = await fetch('http://localhost:3000/api/seed', {
    keepalive: true,
  })
  const result = await response.json()

  if (result.success) {
    console.log('Seeding complete:', result.data)
  } else {
    console.error('Error:', result.error)
    process.exit(1)
  }
}

main()
