// Grab query parameters from URL
const params = new URLSearchParams(window.location.search);
const serviceName = params.get("service") || "";
const tier = params.get("tier") || "";

// Get form elements
const serviceSelect = document.getElementById("service");
const tierInput = document.getElementById("selected-tier");

// Set the service
if (serviceName && serviceSelect) {
  // Remove the placeholder option
  const placeholder = serviceSelect.querySelector('option[value=""]');
  if (placeholder) placeholder.remove();

  // Set the selected service
  const options = Array.from(serviceSelect.options);
  const match = options.find(opt => opt.value === serviceName);
  if (match) {
    match.selected = true;
  } else {
    // If service not in options, add it
    const newOption = document.createElement("option");
    newOption.value = serviceName;
    newOption.textContent = serviceName;
    newOption.selected = true;
    serviceSelect.appendChild(newOption);
  }

  // Disable the service so user cannot change it
  serviceSelect.disabled = true;
}

// Set hidden package tier
if (tier && tierInput) {
  tierInput.value = tier;
}

// Handles form submission and inserts form data into the "Submissions" table in Supabase
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
