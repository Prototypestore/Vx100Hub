import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Your Supabase project URL and publishable key
const SUPABASE_URL = 'https://gwasxibrhchgrxctdngt.supabase.co'
const SUPABASE_KEY = 'sb_publishable_MCTQtkika8OnHSOT27UpJQ__vcbV0Ja'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const form = document.getElementById('contact-form')
const status = document.getElementById('form-status')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())

  // Insert data into your "Submissions" table
  const { error } = await supabase
    .from('Submissions')
    .insert([data])

  if (error) {
    status.textContent = 'Error submitting form: ' + error.message
    status.style.color = 'red'
    console.error(error)
  } else {
    status.textContent = 'Form submitted successfully!'
    status.style.color = 'green'
    form.reset()
  }
})

