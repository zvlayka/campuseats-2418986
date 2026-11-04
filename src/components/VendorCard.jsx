import { Link } from 'react-router'

function toMinutes(text) {
  const match = text.trim().match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i)
  if (!match) return null
  let hours = Number(match[1]) % 12
  if (match[3].toLowerCase() === 'pm') hours += 12
  return hours * 60 + Number(match[2])
}

// "7:00 am - 10:00 pm" → true or false, based on the current time
function isOpenNow(openHours) {
  const [startText, endText] = openHours.split('-')
  const start = toMinutes(startText)
  const end = toMinutes(endText)
  if (start === null || end === null) return false

  const now = new Date()
  const current = now.getHours() * 60 + now.getMinutes()

  if (start <= end) {
    return current >= start && current < end
  }
  return current >= start || current < end   // for hours past midnight, e.g. 6 pm - 1 am
}

function VendorCard({ vendor }) {
  const open = vendor.isOpen && isOpenNow(vendor.openHours)

  return (
    <Link to={`/vendor/${vendor.id}`} className="vendor-card">
      <div className="thumb">{vendor.name[0]}</div>
      <div>
        <h3>{vendor.name}</h3>
        <p className="muted">{vendor.location}</p>
        <p className="muted">Open: {vendor.openHours}</p>
        <span className={open ? 'status open' : 'status closed'}>
          {open ? 'Open now' : 'Closed'}
        </span>
      </div>
    </Link>
  )
}

export default VendorCard