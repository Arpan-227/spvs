import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { mandatoryAPI } from '../../api'

// ✅ Exact PDFs present in spvs-frontend/public/pdfs/ folder
var CERT_FILES = {
  'Fire Certificate 2023':                  { file: 'Fire Certificate 2023.pdf',                 ready: true },
  'NEW Bullding Safety Certificate 2023':   { file: 'NEW Bullding Safety Certificate 2023.pdf',  ready: true },
  'No Objection Certificate (NOC)':         { file: 'NOC.pdf',                                   ready: true },
  'Society Update Certificate 2024':        { file: 'Society Update Certificate 2024.pdf',        ready: true },
  'New Land Certtificate 2023-24':          { file: 'New Land Certtificate 2023-24 2.pdf',        ready: true },
  'New Affliation Cenfermation Letter 2024':{ file: 'New Affliation Cenfermation Letter 2024-29.pdf',ready: true },
  'Society Update Member List 2024':        { file: 'Society Update Member List 2024.pdf',        ready: true },
}

var CERT_ROWS = Object.keys(CERT_FILES).map(function(name) { return [name, 'View Document'] })

function renderCertBtn(certInfo) {
  if (!certInfo) return null
  var soonStyle = {
    display: 'inline-flex', alignItems: 'center', gap: '5px',
    padding: '6px 13px', borderRadius: '8px',
    background: 'rgba(0,0,0,.05)', color: 'var(--txt3)',
    fontSize: '11.5px', fontWeight: '700',
    whiteSpace: 'nowrap', cursor: 'default'
  }
  var readyStyle = {
    display: 'inline-flex', alignItems: 'center', gap: '5px',
    padding: '6px 13px', borderRadius: '8px',
    background: 'linear-gradient(135deg,var(--or),var(--gd))',
    color: '#fff', fontSize: '11.5px', fontWeight: '800',
    textDecoration: 'none', whiteSpace: 'nowrap',
    boxShadow: '0 3px 10px rgba(232,118,26,.28)'
  }
  if (certInfo.ready) {
    return (
      <a href={'/pdfs/' + encodeURIComponent(certInfo.file)} target="_blank" rel="noopener noreferrer" style={readyStyle}>
        👁 View
      </a>
    )
  }
  return <span style={soonStyle}>🕐 Soon</span>
}

function SectionTable(props) {
  var rows      = props.rows
  var certFiles = props.certFiles
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <tbody>
        {rows.map(function(row, i) {
          var certInfo  = certFiles ? certFiles[row[0]] : null
          var borderTop = i === 0 ? 'none' : '1px solid var(--brd)'
          var rowBg     = i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,.012)'
          return (
            <tr
              key={row[0] + i}
              style={{ borderTop: borderTop, background: rowBg, transition: 'background .15s' }}
              onMouseEnter={function(e) { e.currentTarget.style.background = 'rgba(232,118,26,.03)' }}
              onMouseLeave={function(e) { e.currentTarget.style.background = rowBg }}
            >
              <td style={{ padding: '13px 24px', fontSize: '13.5px', fontWeight: '600', color: 'var(--txt3)', width: '38%', verticalAlign: 'middle' }}>
                {row[0]}
              </td>
              <td style={{ padding: '13px 24px', fontSize: '13.5px', fontWeight: '600', color: 'var(--dark)', verticalAlign: 'middle' }}>
                {row[1]}
              </td>
              <td style={{ padding: '13px 18px', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                {renderCertBtn(certInfo)}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default function MandatoryDisclosurePage() {
  var [dbData, setDbData]   = useState(null)
  var [loading, setLoading] = useState(true)

  useEffect(function() {
    mandatoryAPI.get()
      .then(function(res) {
        setDbData(res.data)
        setLoading(false)
      })
      .catch(function(err) {
        console.error('Failed to load mandatory disclosure:', err)
        setLoading(false)
      })
  }, [])

  function dbToRows(arr) {
    if (!arr || !arr.length) return []
    return arr.map(function(r) { return [r.key, r.value] })
  }

  var sections = dbData ? [
    { title: 'A. General Information',      icon: '🏫', rows: dbToRows(dbData.schoolInfo),     certFiles: null       },
    { title: 'B. Documents & Certificates', icon: '📋', rows: CERT_ROWS,                       certFiles: CERT_FILES },
    { title: 'C. Result & Academics',       icon: '📊', rows: dbToRows(dbData.academic),       certFiles: null       },
    { title: 'D. Staff Information',        icon: '👨‍🏫', rows: dbToRows(dbData.staff),          certFiles: null       },
    { title: 'E. School Infrastructure',    icon: '🏗️', rows: dbToRows(dbData.infrastructure), certFiles: null       },
    { title: 'F. Transport',                icon: '🚌', rows: dbToRows(dbData.transport),      certFiles: null       },
  ] : []

  var secHeaderStyle = {
    background: 'linear-gradient(135deg,var(--dark),var(--dark2))',
    padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px'
  }

  return (
    <>
      <div className="page-banner">
        <div className="pb-inner">
          <div className="pb-chip">📋 Mandatory Disclosure</div>
          <h1 className="pb-title">
            Mandatory <span style={{ color: 'var(--gd2)', fontStyle: 'italic' }}>Disclosure</span>
          </h1>
          <p className="pb-sub">
            As per CBSE Affiliation Bye-Laws — complete school information for transparency and accountability
          </p>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <span className="bc-cur">Mandatory Disclosure</span>
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--bg)', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <div style={{ background: 'rgba(108,63,197,.06)', border: '1.5px solid rgba(108,63,197,.2)', borderRadius: '16px', padding: '20px 24px', marginBottom: '44px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ fontSize: '28px', flexShrink: 0 }}>ℹ️</div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '14px', color: '#6C3FC5', marginBottom: '4px' }}>CBSE Mandatory Disclosure</div>
              <div style={{ fontSize: '13.5px', color: 'var(--txt2)', lineHeight: '1.6' }}>
                This disclosure is published as per the requirements of CBSE Affiliation Bye-Laws.
                Sant Pathik Vidyalaya is affiliated to CBSE, New Delhi. Affiliation No. <strong>2130176</strong>.
              </div>
            </div>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--txt2)', fontSize: '14px', fontWeight: '600' }}>
              ⏳ Loading disclosure data...
            </div>
          )}

          {!loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {sections.map(function(sec) {
                return (
                  <div key={sec.title} style={{ borderRadius: '20px', overflow: 'hidden', border: '1.5px solid var(--brd)', boxShadow: '0 4px 20px rgba(0,0,0,.04)' }}>
                    <div style={secHeaderStyle}>
                      <span style={{ fontSize: '22px' }}>{sec.icon}</span>
                      <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '17px', fontWeight: '700', color: '#fff' }}>
                        {sec.title}
                      </span>
                    </div>
                    <SectionTable rows={sec.rows} certFiles={sec.certFiles} />
                  </div>
                )
              })}
            </div>
          )}

          <div style={{ marginTop: '40px', padding: '20px 24px', borderRadius: '14px', background: 'rgba(232,118,26,.05)', border: '1.5px solid rgba(232,118,26,.15)', textAlign: 'center' }}>
            <div style={{ fontSize: '13.5px', color: 'var(--txt2)', lineHeight: '1.7' }}>
              For any additional information or document verification, please contact the school office.<br />
              <strong style={{ color: 'var(--or)' }}>📞 +91 9198783830</strong>
              &nbsp;|&nbsp;
              <strong style={{ color: 'var(--or)' }}>📧 spvbrh@gmail.com</strong>
              &nbsp;|&nbsp;
              <strong style={{ color: 'var(--or)' }}>🕐 Mon–Sat, 8:00 AM – 3:00 PM</strong>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}