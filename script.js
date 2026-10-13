// Set the business WhatsApp number (country code, digits only, e.g. "60123456789")
// and enquiries will open WhatsApp with the message pre-filled.
const WHATSAPP_NUMBER = '';

const form = document.getElementById('enquiry');
const status = document.getElementById('form-status');

// "Apply as Distributor" preselects the matching option in the form.
document.querySelectorAll('[data-interest]').forEach((link) => {
  link.addEventListener('click', () => {
    form.elements.interest.value = link.dataset.interest;
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const { name, phone, interest, message } = form.elements;
  let firstInvalid = null;
  [name, phone].forEach((field) => {
    const empty = !field.value.trim();
    field.setAttribute('aria-invalid', String(empty));
    if (empty && !firstInvalid) firstInvalid = field;
  });
  if (firstInvalid) {
    status.textContent = 'Please fill in your name and phone number.';
    firstInvalid.focus();
    return;
  }

  const text = [
    'Hello Sultana Food Industry,',
    `Name: ${name.value.trim()}`,
    `Phone: ${phone.value.trim()}`,
    `Interested in: ${interest.value}`,
    message.value.trim() && `Message: ${message.value.trim()}`,
  ].filter(Boolean).join('\n');

  if (WHATSAPP_NUMBER) {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    status.textContent = 'Opening WhatsApp with your enquiry…';
  } else {
    status.textContent = 'Thank you! Online enquiries are coming soon. Please contact us using the details on this page.';
  }
});
