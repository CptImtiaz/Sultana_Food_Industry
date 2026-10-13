// ===== WhatsApp settings: the only place to change the number =====
// WHATSAPP_NUMBER: country code + number, digits only (e.g. '60123456789' for 012-345 6789).
// WHATSAPP_DISPLAY: how the number is shown on the page (e.g. '012-345 6789').
// While WHATSAPP_NUMBER is empty, order buttons scroll to the contact form instead.
const WHATSAPP_NUMBER = '';
const WHATSAPP_DISPLAY = '';

const waLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

if (WHATSAPP_NUMBER) {
  document.querySelectorAll('[data-wa]').forEach((link) => {
    link.href = waLink(link.dataset.wa);
    link.target = '_blank';
    link.rel = 'noopener';
    link.hidden = false;
  });
  document.querySelectorAll('[data-wa-display]').forEach((el) => {
    el.textContent = WHATSAPP_DISPLAY || `+${WHATSAPP_NUMBER}`;
  });
}

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
    'Hello Sultana Food Industry,',
    `Name: ${name.value.trim()}`,
    `Phone: ${phone.value.trim()}`,
    `Interested in: ${interest.value}`,
    message.value.trim() && `Message: ${message.value.trim()}`,
  ].filter(Boolean).join('\n');

  if (WHATSAPP_NUMBER) {
    window.open(waLink(text), '_blank', 'noopener');
    status.textContent = 'Opening WhatsApp with your enquiry…';
  } else {
    status.textContent = 'Thank you! WhatsApp ordering opens soon. Please check back shortly.';
  }
});
