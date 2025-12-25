<script type="module">
  import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

  const supabaseUrl = 'https://gwasxibrhchgrxctdngt.supabase.co';
  const supabaseKey = 'sb_publishable_MCTQtkika8OnHSOT27UpJQ__vcbV0Ja';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending...';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const service = form.service.value;
    const message = form.message.value.trim();

    if (!service) {
      status.textContent = 'Please select a service.';
      return;
    }

    const { data, error } = await supabase
      .from('submissions')
      .insert([{ name, email, service, message }]);

    if (error) {
      console.error(error);
      status.textContent = 'Error sending. Try again.';
    } else {
      status.textContent = 'Sent! Thank you.';
      form.reset();
    }
  });
</script>
