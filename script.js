const form = document.getElementById('bookingForm');
const tableBody = document.querySelector('#scheduleTable tbody');

async function loadSchedule() {
  const res = await fetch('/bookings');
  const data = await res.json();
  tableBody.innerHTML = '';
  data.forEach(b => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${b.date}</td><td>${b.name}</td><td>${b.time}</td>`;
    tableBody.appendChild(row);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const booking = {
    name: document.getElementById('name').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value
  };
  await fetch('/book', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking)
  });
  form.reset();
  loadSchedule();
});

loadSchedule();
