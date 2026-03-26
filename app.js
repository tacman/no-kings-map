(function () {
  const spots = window.PARKING_SPOTS || [];
  const container = document.getElementById('spots');

  function encode(value) {
    return encodeURIComponent(value);
  }

  function googleMapsUrl(spot) {
    if (spot.mode === 'latlng') {
      return `https://www.google.com/maps/dir/?api=1&destination=${spot.value}`;
    }

    if (spot.mode === 'address') {
      return `https://www.google.com/maps/dir/?api=1&destination=${encode(spot.value)}`;
    }

    return `https://www.google.com/maps/search/?api=1&query=${encode(spot.value)}`;
  }

  function googleMapsViewUrl(spot) {
    if (spot.mode === 'latlng') {
      return `https://www.google.com/maps/search/?api=1&query=${spot.value}`;
    }

    return `https://www.google.com/maps/search/?api=1&query=${encode(spot.value)}`;
  }

  function renderSpot(spot) {
    const article = document.createElement('article');
    article.className = 'spot';

    article.innerHTML = `
      <div class="spot-header">
        <div class="badge">${spot.id}</div>
        <h3 class="spot-title">${spot.name}</h3>
      </div>

      ${spot.image ? `<img src="${spot.image}" alt="${spot.name}" class="spot-image">` : ''}

      <p class="spot-address">${spot.address}</p>
      <p class="spot-notes">${spot.notes || ''}</p>

      <div class="actions">
        <a
          class="button button-primary"
          href="${googleMapsUrl(spot)}"
          target="_blank"
          rel="noopener"
        >Open in Google Maps</a>

        <a
          class="button button-secondary"
          href="${googleMapsViewUrl(spot)}"
          target="_blank"
          rel="noopener"
        >View Map</a>
      </div>
    `;

    return article;
  }

  for (const spot of spots) {
    container.appendChild(renderSpot(spot));
  }
})();
