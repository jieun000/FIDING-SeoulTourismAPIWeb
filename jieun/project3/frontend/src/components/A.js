import React ,{useState} from 'react'
import B from './B'

const A = () => {

    const [address1, setAddress1] = useState(10)
    var obj={"a":"홍길동", setAddress1}
  return (
    <div>
        <B obj={obj}/>
        {address1}
    </div>
  )
}

export default A