import React from 'react'

const B = ({obj}) => {
    var {setAddress1} =obj;
  return (
    <div>B
        <button onClick={()=>setAddress1("홍말자")}>눌러라</button>
    </div>
  )
}

export default B