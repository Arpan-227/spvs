import { useState } from 'react'

var CERT_FILES = {
  'Copies of Affiliation / Upgradation Letter':         { file:'Affiliation Letter.pdf',                ready:false },
  'Copies of Societies / Trust / Company Registration': { file:'Society Update Certificate 2024.pdf',  ready:true  },
  'Copy of No Objection Certificate (NOC)':             { file:'NOC.pdf',                              ready:true  },
  'Copies of Recognition Certificate':                  { file:'Recognition Certificate.pdf',          ready:false },
  'Copy of Valid Building Safety Certificate':          { file:'NEW Bullding Safety Certificate 2023.pdf', ready:true },
  'Copy of Valid Fire Safety Certificate':              { file:'Fire Certificate 2023.pdf',             ready:true  },
  'Copy of Self Certification':                         { file:'Self Certification.pdf',               ready:false },
  'Copies of Land Certificate':                         { file:'Land Certificate.pdf',                 ready:false },
}

var INIT_DATA = {
  schoolInfo: [
    ['Name of School',              'Sant Pathik Vidyalaya'],
    ['Affiliation No.',             '2130176'],
    ['School No.',                  '70178'],
    ['UDISE Code',                  '09500707504'],
    ['Year of Establishment',       '1987'],
    ['Principal Name',              'Mrs. Pooja Agarwal'],
    ['Principal Qualification',     'M.A. B.Ed'],
    ['Email',                       'spvbrh@gmail.com'],
    ['Contact No.',                 '+91 9198783830'],
    ['Address',                     'Pashupati Nagar, Bahraich, UP 271802'],
    ['Area of School',              '10 Acres'],
    ['Area of Playground',          '5 Acres'],
    ['No. of Students',             '1410'],
    ['No. of Teachers',             '73'],
    ['No. of Non-Teaching Staff',   '35'],
  ],
  infrastructure: [
    ['No. of Classrooms',           '73'],
    ['No. of Labs',                 '8'],
    ['No. of Computer Lab Systems', '60'],
    ['No. of Library Books',        '5000+'],
    ['No. of School Buses',         '22'],
    ['Toilet Blocks (Boys)',        '10'],
    ['Toilet Blocks (Girls)',       '12'],
    ['Drinking Water',              'Yes — RO Purified'],
    ['Fire Extinguishers',          'Yes — All Floors'],
    ['CCTV Cameras',                'Yes — 40+ cameras'],
    ['Ramp for Disabled',           'Yes — All Buildings'],
  ],
  academic: [
    ['Board',                       'CBSE — Central Board of Secondary Education'],
    ['Affiliation Valid Till',      '31 March 2029'],
    ['Classes Offered',             'Play Group to Class XII'],
    ['Streams (XI-XII)',            'Science, Commerce, Humanities'],
    ['Medium of Instruction',       'Hindi & English'],
    ['Academic Session',            'April to March'],
    ['Result (Class X 2024-25)',    '100% — All students passed'],
    ['Result (Class XII 2024-25)',  '100% — All students passed'],
    ['Fee Structure',               'As per CBSE norms. Available at school office.'],
  ],
}

var s = {
  card:  { background:'#FFFFFF', borderRadius:'16px', border:'1.5px solid rgba(232,118,26,.12)', boxShadow:'0 2px 12px rgba(232,118,26,.06)' },
  label: { fontSize:'11px', fontWeight:'800', color:'#B87832', letterSpacing:'.8px', textTransform:'uppercase', display:'block', marginBottom:'5px' },
  input: { width:'100%', padding:'9px 12px', borderRadius:'9px', border:'1.5px solid rgba(232,118,26,.2)', background:'#FFFDF8', color:'#1C0A00', fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:'600', outline:'none', boxSizing:'border-box' },
  h2:    { fontFamily:"'Playfair Display',serif", fontSize:'16px', fontWeight:'700', color:'#1C0A00', margin:0 },
}

var TABS = ['School Info', 'Infrastructure', 'Academic', 'Documents & Certificates']

export default function ManageMandatoryPage() {
  var [tab, setTab]   = useState('School Info')
  var [data, setData] = useState(INIT_DATA)
  var [saved, setSaved] = useState(false)
  var [certStatus, setCertStatus] = useState(CERT_FILES)

  function updateRow(section, rowIdx, colIdx, val) {
    setData(function(prev) {
      var updated = prev[section].map(function(row, i) {
        if (i !== rowIdx) return row
        var newRow = row.slice()
        newRow[colIdx] = val
        return newRow
      })
      var n = {}
      for (var k in prev) n[k] = prev[k]
      n[section] = updated
      return n
    })
  }

  function handleSave() {
    setSaved(true)
    setTimeout(function(){ setSaved(false) }, 2500)
  }

  function toggleReady(certName) {
    setCertStatus(function(prev) {
      var n = {}
      for (var k in prev) n[k] = prev[k]
      n[certName] = { file: prev[certName].file, ready: !prev[certName].ready }
      return n
    })
  }

  function renderTable(section, rows) {
    return (
      <div>
        {rows.map(function(row, ri) {
          return (
            <div key={ri} style={{display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:'10px', alignItems:'center', padding:'10px 0', borderBottom:'1px solid rgba(232,118,26,.07)'}}>
              <div>
                <input
                  value={row[0]}
                  onChange={function(e){ updateRow(section, ri, 0, e.target.value) }}
                  style={{...s.input, fontSize:'12.5px', color:'#7A4010', fontWeight:'700', background:'#FFF6EA'}}
                  placeholder="Field name"
                />
              </div>
              <div>
                <input
                  value={row[1]}
                  onChange={function(e){ updateRow(section, ri, 1, e.target.value) }}
                  style={s.input}
                  placeholder="Value"
                />
              </div>
            </div>
          )
        })}
        <button
          onClick={function(){
            setData(function(prev){
              var n = {}
              for(var k in prev) n[k] = prev[k]
              n[section] = prev[section].concat([['New Field','']])
              return n
            })
          }}
          style={{marginTop:'12px', padding:'8px 16px', borderRadius:'8px', border:'1.5px dashed rgba(232,118,26,.3)', background:'transparent', color:'#E8761A', fontSize:'12px', fontWeight:'700', cursor:'pointer', transition:'all .15s'}}
          onMouseEnter={function(e){e.currentTarget.style.background='rgba(232,118,26,.06)'}}
          onMouseLeave={function(e){e.currentTarget.style.background='transparent'}}
        >+ Add Row</button>
      </div>
    )
  }

  return (
    <div style={{maxWidth:'960px'}}>
      {/* Header */}
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px'}}>
        <div>
          <h1 style={{...s.h2, fontSize:'22px', marginBottom:'4px'}}>Mandatory Disclosure</h1>
          <p style={{fontSize:'13px', color:'#B87832', margin:0}}>Edit all CBSE mandatory disclosure information</p>
        </div>
        <button onClick={handleSave}
          style={{padding:'10px 24px', borderRadius:'10px', border:'none', background: saved ? 'linear-gradient(135deg,#22a35a,#16a34a)' : 'linear-gradient(135deg,#E8761A,#F5B800)', color:'#fff', fontSize:'13px', fontWeight:'800', cursor:'pointer', boxShadow: saved ? '0 4px 14px rgba(34,163,90,.3)' : '0 4px 14px rgba(232,118,26,.3)', transition:'all .25s', display:'flex', alignItems:'center', gap:'7px'}}>
          {saved ? '✓ Saved!' : '💾 Save Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div style={{display:'flex', gap:'4px', marginBottom:'20px', background:'#fff', padding:'5px', borderRadius:'12px', border:'1.5px solid rgba(232,118,26,.12)', width:'fit-content'}}>
        {TABS.map(function(t) {
          var active = tab === t
          return (
            <button key={t} onClick={function(){setTab(t)}}
              style={{padding:'8px 16px', borderRadius:'9px', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight: active ? '800' : '600', background: active ? 'linear-gradient(135deg,#E8761A,#F5B800)' : 'transparent', color: active ? '#fff' : '#B87832', transition:'all .18s', boxShadow: active ? '0 3px 10px rgba(232,118,26,.3)' : 'none', whiteSpace:'nowrap'}}>
              {t}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div style={{...s.card, padding:'24px'}}>
        {tab === 'School Info' && (
          <div>
            <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px', paddingBottom:'14px', borderBottom:'1.5px solid rgba(232,118,26,.1)'}}>
              <div style={{width:'32px', height:'32px', borderRadius:'9px', background:'rgba(232,118,26,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'15px'}}>🏫</div>
              <div style={s.h2}>Basic School Information</div>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1.5fr', gap:'6px', marginBottom:'8px'}}>
              <div style={{fontSize:'11px', fontWeight:'800', color:'rgba(184,120,50,.5)', letterSpacing:'1px', textTransform:'uppercase', padding:'0 12px'}}>Field</div>
              <div style={{fontSize:'11px', fontWeight:'800', color:'rgba(184,120,50,.5)', letterSpacing:'1px', textTransform:'uppercase', padding:'0 12px'}}>Value</div>
            </div>
            {renderTable('schoolInfo', data.schoolInfo)}
          </div>
        )}

        {tab === 'Infrastructure' && (
          <div>
            <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px', paddingBottom:'14px', borderBottom:'1.5px solid rgba(232,118,26,.1)'}}>
              <div style={{width:'32px', height:'32px', borderRadius:'9px', background:'rgba(108,63,197,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'15px'}}>🏗️</div>
              <div style={s.h2}>Infrastructure Details</div>
            </div>
            {renderTable('infrastructure', data.infrastructure)}
          </div>
        )}

        {tab === 'Academic' && (
          <div>
            <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px', paddingBottom:'14px', borderBottom:'1.5px solid rgba(232,118,26,.1)'}}>
              <div style={{width:'32px', height:'32px', borderRadius:'9px', background:'rgba(34,163,90,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'15px'}}>📚</div>
              <div style={s.h2}>Academic Information</div>
            </div>
            {renderTable('academic', data.academic)}
          </div>
        )}

        {tab === 'Documents & Certificates' && (
          <div>
            <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px', paddingBottom:'14px', borderBottom:'1.5px solid rgba(232,118,26,.1)'}}>
              <div style={{width:'32px', height:'32px', borderRadius:'9px', background:'rgba(196,95,10,.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'15px'}}>📋</div>
              <div style={s.h2}>Documents & Certificates</div>
            </div>
            <p style={{fontSize:'12.5px', color:'#B87832', marginBottom:'16px', marginTop:'-4px'}}>Toggle which certificates are visible to the public. Place PDF files in <code style={{background:'rgba(232,118,26,.08)', padding:'2px 6px', borderRadius:'4px', fontSize:'11.5px', color:'#E8761A'}}>public/pdfs/</code> folder.</p>
            <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
              {Object.entries(certStatus).map(function(entry) {
                var name = entry[0]
                var info = entry[1]
                return (
                  <div key={name} style={{display:'flex', alignItems:'center', gap:'12px', padding:'12px 16px', borderRadius:'11px', border:'1.5px solid rgba(232,118,26,.1)', background:'#FFFDF8', transition:'all .15s'}}
                    onMouseEnter={function(e){e.currentTarget.style.borderColor='rgba(232,118,26,.25)'}}
                    onMouseLeave={function(e){e.currentTarget.style.borderColor='rgba(232,118,26,.1)'}}>
                    <div style={{flex:1, minWidth:0}}>
                      <div style={{fontSize:'13px', fontWeight:'700', color:'#1C0A00', marginBottom:'2px'}}>{name}</div>
                      <div style={{fontSize:'11.5px', color:'#B87832', fontFamily:"'DM Sans',sans-serif"}}>{info.file}</div>
                    </div>
                    <div style={{display:'flex', alignItems:'center', gap:'10px', flexShrink:0}}>
                      <a href={'/pdfs/'+encodeURIComponent(info.file)} target="_blank" rel="noreferrer"
                        style={{fontSize:'11.5px', color:'#6C3FC5', fontWeight:'700', textDecoration:'none', padding:'5px 10px', borderRadius:'6px', background:'rgba(108,63,197,.07)', border:'1px solid rgba(108,63,197,.15)', transition:'all .15s'}}
                        onMouseEnter={function(e){e.currentTarget.style.background='rgba(108,63,197,.14)'}}
                        onMouseLeave={function(e){e.currentTarget.style.background='rgba(108,63,197,.07)'}}>
                        👁 Test
                      </a>
                      <button onClick={function(){ toggleReady(name) }}
                        style={{display:'flex', alignItems:'center', gap:'7px', padding:'6px 14px', borderRadius:'8px', cursor:'pointer', fontSize:'12px', fontWeight:'800', transition:'all .2s',
                          background: info.ready ? 'rgba(34,163,90,.1)' : 'rgba(232,118,26,.08)',
                          color: info.ready ? '#22a35a' : '#B87832',
                          border: '1.5px solid ' + (info.ready ? 'rgba(34,163,90,.25)' : 'rgba(232,118,26,.2)') }}>
                        <span style={{width:'8px', height:'8px', borderRadius:'50%', background: info.ready ? '#22a35a' : '#B87832', flexShrink:0}} />
                        {info.ready ? 'Visible' : 'Hidden'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Note */}
      <div style={{marginTop:'16px', padding:'12px 16px', borderRadius:'10px', background:'rgba(232,118,26,.06)', border:'1px solid rgba(232,118,26,.15)', fontSize:'12px', color:'#7A4010'}}>
        <strong>Note:</strong> Changes saved here update the Mandatory Disclosure public page. Certificate visibility controls the 👁 View button shown to visitors.
      </div>
    </div>
  )
}