// Business WhatsApp number (country code, digits only). Enquiries open WhatsApp pre-filled.
const WHATSAPP_NUMBER = '60122312214';

// Duplicate the promo messages so the scrolling bar loops seamlessly.
const promoTrack = document.querySelector('.promo-track');
if (promoTrack && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const sep = document.createElement('span');
  sep.textContent = '✦';
  sep.setAttribute('aria-hidden', 'true');
  promoTrack.append(sep);
  [...promoTrack.children].forEach((item) => {
    const copy = item.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    if (copy.tagName === 'A') copy.tabIndex = -1;
    promoTrack.append(copy);
  });
}

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
    'Hello U4 NUR Wedding Laddoo,',
    `Name: ${name.value.trim()}`,
    `Phone: ${phone.value.trim()}`,
    `Interested in: ${interest.value}`,
    message.value.trim() && `Message: ${message.value.trim()}`,
  ].filter(Boolean).join('\n');

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  status.textContent = 'Opening WhatsApp with your enquiry…';
});
