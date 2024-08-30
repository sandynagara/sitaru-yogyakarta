import React from 'react'
import "./IntensitasSimulasi.scss"

function IntensitasHasilSimulasi({intensitas}) {
  
    return <div>
      <p style={{margin:"10px 10px"}}>Untuk luas tanah seluas {intensitas.luas} m<sup>2</sup> maka aturannya sebagai berikut:</p>
      <div>
          <div className="intensitas-hasil">
            <b>Koefisien Dasar Bangunan</b>
            <p>:</p>
            <p> KDB maksimal adalah {intensitas.kdb}% atau sebesar {(intensitas.luas*intensitas.kdb*0.01).toFixed(2)} m<sup>2</sup></p>
          </div>
          <div className="intensitas-hasil">
            <p><b>Koefisien Lantai Bangunan</b></p>
            <p>:</p>
            <p> KLB maksimal adalah {intensitas.klb} atau sebesar {(intensitas.luas*intensitas.klb.replace(/,/g, '.')).toFixed(2)} m<sup>2</sup></p>
          </div>
          <div className="intensitas-hasil">
            <p><b>Koefisien Daerah Hijau</b></p>
            <p>:</p>
            <p>KDH minimal adalah {intensitas.kdh}% atau sebesar {(intensitas.luas*intensitas.kdh*0.01).toFixed(2)} m<sup>2</sup></p>
          </div>
          <div className="intensitas-hasil">
            <p><b>Tinggi Bangunan</b></p>
            <p>:</p>
            <p> Tinggi maksimal bangunan adalah {intensitas.tinggi} m </p>
          </div>
      </div>
  </div>
}

export default IntensitasHasilSimulasi