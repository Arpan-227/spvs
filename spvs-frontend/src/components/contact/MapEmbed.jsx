export default function MapEmbed() {
  return (
    <div style={{borderRadius:'20px', overflow:'hidden', border:'1.5px solid var(--brd)', boxShadow:'0 8px 32px rgba(0,0,0,.08)', height:'320px'}}>
      <iframe
        title="Sant Pathik Vidyalaya Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.592!2d81.5897!3d27.5721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399f6f2c6b3fffff%3A0x1!2sPashupati+Nagar%2C+Bahraich%2C+Uttar+Pradesh+271802!5e0!3m2!1sen!2sin!4v1"
        width="100%"
        height="320"
        style={{border:0, display:'block'}}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}