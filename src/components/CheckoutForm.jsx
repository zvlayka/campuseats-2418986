import { useState } from 'react'
 
const MAHALLAHS = ['Ali', 'Aminah', 'Faruq', 'Asiah', 'Bilal', 'Hafsa', 'Uthman', 
'Zubair']
 
// A plain function: values in, errors object out. Empty object = valid. 
function validate(values) {   const errors = {}
  if (values.name.trim().length < 3) errors.name = 'Enter your name (at least 3 characters).'
  // TODO: mahallah must be chosen
  // TODO: pickupTime must be between '07:00' and '22:00' (strings compare fine)   
return errors
}  
function CheckoutForm({ onPlaceOrder }) {
  const [values, setValues] = useState({ name: '', mahallah: '', pickupTime: '' })   
  const [errors, setErrors] = useState({})  
  // One handler for every input: the input's name matches a key in values.   
function handleChange(event) {     const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }
 
  function handleSubmit(event) {
    event.preventDefault()             // stop the page reloading     
const found = validate(values)     
setErrors(found)
    // TODO: if found has no keys, call onPlaceOrder(values)
  }
 
  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h3>Checkout</h3>
 
      <label htmlFor="name">Name</label>
      <input id="name" name="name" value={values.name} onChange={handleChange} />
      {errors.name && <p className="field-error">{errors.name}</p>}
 
      <label htmlFor="mahallah">Mahallah</label>
      <select id="mahallah" name="mahallah" value={values.mahallah} onChange={handleChange}>
        <option value="">Select…</option>
        {MAHALLAHS.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      {/* TODO: show errors.mahallah */}
 
      {/* TODO: label + <input type="time" name="pickupTime" ...> + its error */}
 
      <button type="submit" className="btn">Place order</button>
    </form>
  )
}
 
export default CheckoutForm
