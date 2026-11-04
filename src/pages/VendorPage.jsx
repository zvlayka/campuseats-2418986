import { useParams, useSearchParams, Link } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import MenuList from '../components/MenuList.jsx'
import TagFilter from '../components/TagFilter.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function VendorPage() {
  const { id } = useParams()
  const { vendors, loading, error, reload } = useVendors()
  const [searchParams, setSearchParams] = useSearchParams()

  const selectedTags = searchParams.getAll('tag')

  function handleToggleTag(tag) {
    const next = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]
    setSearchParams(next.map((t) => ['tag', t]))
  }

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  const vendor = vendors.find((v) => v.id === id)

  if (!vendor) {
    return (
      <div className="card">
        <h2 className="section-title">Vendor not found</h2>
        <p className="muted">No vendor has the id “{id}”.</p>
        <Link to="/">Back to vendors</Link>
      </div>
    )
  }

  const allTags = [...new Set(vendor.menu.flatMap((item) => item.tags ?? []))]

  const visibleItems = vendor.menu.filter((item) =>
    selectedTags.every((tag) => (item.tags ?? []).includes(tag))
  )

  return (
    <section>
      <Link to="/">← All vendors</Link>
      <h2 className="section-title">Menu: {vendor.name}</h2>
      <TagFilter
        allTags={allTags}
        selectedTags={selectedTags}
        onToggle={handleToggleTag}
      />
      <MenuList items={visibleItems} />
    </section>
  )
}

export default VendorPage