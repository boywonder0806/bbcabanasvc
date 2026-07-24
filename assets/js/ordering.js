// Gates online ordering to a daily time window in America/Chicago time
// (automatically handles CST/CDT — no manual DST adjustment needed).
const ORDER_WINDOW = {
  timeZone: 'America/Chicago',
  startMinutes: 11 * 60,        // 11:00 AM
  endMinutes: 17 * 60 + 30,     // 5:30 PM
};

function getChicagoMinutesSinceMidnight(date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: ORDER_WINDOW.timeZone,
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date);

  const hour = Number(parts.find(p => p.type === 'hour').value);
  const minute = Number(parts.find(p => p.type === 'minute').value);
  return hour * 60 + minute;
}

function isOrderingOpen(date = new Date()) {
  const minutes = getChicagoMinutesSinceMidnight(date);
  return minutes >= ORDER_WINDOW.startMinutes && minutes < ORDER_WINDOW.endMinutes;
}

function formatWindowTime(minutes) {
  const hour24 = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const period = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = ((hour24 + 11) % 12) + 1;
  return minute === 0 ? `${hour12}:00 ${period}` : `${hour12}:${String(minute).padStart(2, '0')} ${period}`;
}

function renderOrderWidget() {
  const widget = document.getElementById('order-widget');
  if (!widget) return;

  const orderUrl = widget.dataset.orderUrl;
  const open = isOrderingOpen();
  const startLabel = formatWindowTime(ORDER_WINDOW.startMinutes);
  const endLabel = formatWindowTime(ORDER_WINDOW.endMinutes);

  if (open) {
    widget.innerHTML = `
      <a class="order-button order-button--open" href="${orderUrl}" target="_blank" rel="noopener">
        Order Online
      </a>
      <p class="order-status">Ordering open now &middot; closes at ${endLabel}</p>
    `;
  } else {
    widget.innerHTML = `
      <span class="order-button order-button--closed" aria-disabled="true">
        Online Ordering Closed
      </span>
      <p class="order-status">Available daily ${startLabel} – ${endLabel}</p>
    `;
  }
}

renderOrderWidget();
// Re-check periodically so the widget flips live at the open/close boundary.
setInterval(renderOrderWidget, 60 * 1000);
