import React from 'react'
import SignIn from '../components/SignIn/SignIn.component'

import { Row, Col } from 'antd'
import 'antd/dist/antd.css'

const image =
	'https://res.cloudinary.com/dfulxq7so/image/upload/v1572452572/malawi20100165_cesh8j.jpg'

const Landing = (props) => {
	console.log('props in Landing', props)

	return (
		<div className='landing'>
			<SignIn history={props.history} />
		</div>
	)
}

export default Landing
