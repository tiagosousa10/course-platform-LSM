import React from 'react'

async function SearchPage ({searchParams}: {
   searchParams: Promise<{[key: string]: string | string[] | undefined}>   
}) {
   const term = await ((await searchParams).term)

   return (
    <div>SearchPage {term}</div>
  )
}

export default SearchPage
