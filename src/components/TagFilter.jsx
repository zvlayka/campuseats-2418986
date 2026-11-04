function TagFilter({ allTags, selectedTags, onToggle }) {
  if (allTags.length === 0) return null

  return (
    <div className="tag-filter">
      <span className="muted">Filter by:</span>
      {allTags.map((tag) => (
        <label key={tag} className="tag-option">
          <input
            type="checkbox"
            checked={selectedTags.includes(tag)}
            onChange={() => onToggle(tag)}
          />
          {tag}
        </label>
      ))}
    </div>
  )
}

export default TagFilter