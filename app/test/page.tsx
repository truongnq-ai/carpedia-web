import { getAllBrands, getAllCountries, getAllBodyTypes } from '@/lib/entities'

export default function TestPage() {
  const brands = getAllBrands()
  const countries = getAllCountries()
  const bodyTypes = getAllBodyTypes()

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Entity Data Test</h1>

      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Brands ({brands.length})</h2>
          <ul className="space-y-2">
            {brands.map((brand) => (
              <li key={brand.slug} className="rounded border p-3">
                <strong>{brand.name}</strong> - {brand.country} - Featured:{' '}
                {brand.featured ? '✅' : '❌'}
                <br />
                <small className="text-gray-600">{brand.funFact}</small>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Countries ({countries.length})</h2>
          <ul className="space-y-2">
            {countries.map((country) => (
              <li key={country.slug} className="rounded border p-3">
                <strong>{country.name}</strong> - Featured: {country.featured ? '✅' : '❌'}
                <br />
                <small className="text-gray-600">{country.funFact}</small>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Body Types ({bodyTypes.length})</h2>
          <ul className="space-y-2">
            {bodyTypes.map((bt) => (
              <li key={bt.slug} className="rounded border p-3">
                <strong>{bt.name}</strong> - Featured: {bt.featured ? '✅' : '❌'}
                <br />
                <small className="text-gray-600">{bt.description}</small>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
