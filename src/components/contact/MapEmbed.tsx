export function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-2xl shadow-card">
      <iframe
        title="DriveToOwn location — 33 Princes Cct, Craigieburn VIC 3064"
        src="https://www.google.com/maps?q=33+Princes+Cct+Craigieburn+VIC+3064+Australia&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0, display: 'block', minHeight: '340px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
