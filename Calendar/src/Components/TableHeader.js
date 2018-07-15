import React from 'react'

const TableHeader = ({dayName}) => dayName.map((el, i) => <th className='th' key={i}>{el}</th>)

export default TableHeader