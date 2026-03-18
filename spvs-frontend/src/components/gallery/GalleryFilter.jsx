var CATS = [
  { id:'all',      label:'All Photos',              shortLabel:'All Photos', emoji:'🖼️' },
  { id:'events',   label:'Annual Function & Events', shortLabel:'Events',    emoji:'🎉' },
  { id:'sports',   label:'Sports & Games',           shortLabel:'Sports',    emoji:'🏆' },
  { id:'labs',     label:'Labs & Science',           shortLabel:'Labs',      emoji:'🔬' },
  { id:'campus',   label:'Classroom & Campus',       shortLabel:'Campus',    emoji:'🏫' },
  { id:'cultural', label:'Cultural Programs',        shortLabel:'Cultural',  emoji:'🎭' },
  { id:'prize',    label:'Prize Distribution',       shortLabel:'Prizes',    emoji:'🥇' },
]

export default function GalleryFilter({ activeCat, onCatChange, search, onSearchChange, photos, filteredCount }) {
  var counts = { all: photos.length }
  photos.forEach(function(p){ counts[p.cat] = (counts[p.cat] || 0) + 1 })

  return (
    <>
      <style>{`
        .gf-wrap {
          position: sticky; top: 0; z-index: 100;
          background: rgba(255,253,248,.97);
          backdrop-filter: blur(18px);
          border-bottom: 1.5px solid rgba(232,118,26,.12);
          box-shadow: 0 4px 28px rgba(232,118,26,.08);
        }
        .gf-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 24px;
        }

        /* ── Top row ── */
        .gf-top {
          display: flex; align-items: center; gap: 14px;
          padding: 11px 0 9px;
          border-bottom: 1px solid rgba(232,118,26,.07);
        }
        .gf-search-wrap { position: relative; flex: 0 0 240px; }
        .gf-search-icon {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          font-size: 13px; pointer-events: none; color: #B87832;
        }
        .gf-search {
          width: 100%; box-sizing: border-box;
          padding: 8px 12px 8px 34px; border-radius: 10px;
          border: 1.5px solid rgba(232,118,26,.18);
          background: #FFFDF8; color: #1C0A00;
          font-family: 'DM Sans', sans-serif; font-size: 13px; outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .gf-search:focus {
          border-color: #E8761A;
          box-shadow: 0 0 0 3px rgba(232,118,26,.1);
        }
        .gf-divider {
          height: 24px; width: 1.5px;
          background: rgba(232,118,26,.12); flex-shrink: 0;
        }
        .gf-count {
          font-size: 12.5px; color: #B87832; font-weight: 700; white-space: nowrap;
          margin-left: auto;
        }
        .gf-count strong {
          color: #E8761A; font-family: 'Playfair Display', serif; font-size: 15px;
        }

        /* ── Pills row ── */
        .gf-pills-row {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 10px 0;
          flex-wrap: wrap;          /* laptop: wrap instead of scroll */
        }

        /* ── Individual pill ── */
        .gf-pill {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 7px 14px; border-radius: 30px;
          font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 700;
          cursor: pointer; white-space: nowrap; flex-shrink: 0;
          transition: all .22s cubic-bezier(.34,1.56,.64,1);
          border: 1.5px solid rgba(232,118,26,.15);
          background: #fff; color: #7A4010;
          box-shadow: 0 1px 4px rgba(232,118,26,.06);
        }
        .gf-pill:hover {
          border-color: rgba(232,118,26,.38);
          background: #FFF6EA;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(232,118,26,.14);
        }
        .gf-pill.active {
          background: linear-gradient(135deg,#E8761A,#F5B800);
          border-color: #E8761A;
          color: #1C0A00;
          box-shadow: 0 6px 18px rgba(232,118,26,.32);
          transform: translateY(-2px);
        }
        .gf-pill.active:hover {
          box-shadow: 0 8px 22px rgba(232,118,26,.42);
          transform: translateY(-3px);
        }
        .gf-pill-count {
          padding: 1px 7px; border-radius: 20px;
          font-size: 10px; font-weight: 800; line-height: 1.6;
        }
        .gf-pill .pill-emoji { font-size: 13px; }

        /* ── Mobile: scroll instead of wrap ── */
        @media (max-width: 768px) {
          .gf-top { flex-wrap: wrap; gap: 8px; }
          .gf-search-wrap { flex: 1 1 100%; order: 1; }
          .gf-divider { display: none; }
          .gf-count { order: 2; margin-left: 0; font-size: 11.5px; }
          .gf-pills-row {
            flex-wrap: nowrap;
            overflow-x: auto;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 4px;
          }
          .gf-pills-row::-webkit-scrollbar { display: none; }
          .gf-pill { padding: 6px 11px; font-size: 11.5px; }
        }
      `}</style>

      <div className="gf-wrap">
        <div className="gf-inner">

          {/* Top row: search + count */}
          <div className="gf-top">
            <div className="gf-search-wrap">
              <span className="gf-search-icon">🔍</span>
              <input
                className="gf-search"
                value={search}
                onChange={function(e){ onSearchChange(e.target.value) }}
                placeholder="Search photos..."
              />
            </div>
            <div className="gf-divider" />
            <div className="gf-count">
              Showing <strong>{filteredCount}</strong> photos
            </div>
          </div>

          {/* Pills — wrap on laptop, scroll on mobile */}
          <div className="gf-pills-row">
            {CATS.map(function(cat) {
              var isActive = activeCat === cat.id
              var count    = counts[cat.id] || 0
              return (
                <button
                  key={cat.id}
                  className={'gf-pill' + (isActive ? ' active' : '')}
                  onClick={function(){ onCatChange(cat.id) }}
                >
                  <span className="pill-emoji">{cat.emoji}</span>
                  <span>{cat.shortLabel}</span>
                  <span className="gf-pill-count" style={{
                    background: isActive ? 'rgba(28,10,0,.18)' : 'rgba(232,118,26,.12)',
                    color:      isActive ? '#1C0A00'           : '#E8761A',
                  }}>{count}</span>
                </button>
              )
            })}
          </div>

        </div>
      </div>
    </>
  )
}