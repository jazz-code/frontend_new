import React, { useState } from 'react'
import axios from 'axios'

import { Form, Icon, Input, Button, Row, Col, Typography } from 'antd'
import 'antd/dist/antd.css'
const { Title } = Typography

const SignIn = (props) => {
	// console.log('props in SignIn', props)
	const [account, setAccount] = useState({
		email_address: 'admin@email',
		password: 'password',
	})

	const handleChange = (event) => {
		setAccount({ ...account, [event.target.name]: event.target.value })
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		console.log('submit', account)
		axios
			.post('https://welldone-server.herokuapp.com/api/auth/login', account)
			.then((res) => {
				console.log('res', res.data)
				localStorage.setItem('token', res.data.token)
				localStorage.setItem('userId', res.data.id)
				props.history.push('/')
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<Row className='signIn'>
			<Col
				span={24}
				style={{
					marginBottom: '20px',
					marginLeft: '50px',
					display: 'flex',
					justifyContent: 'flex-start',
					height: '75px',
				}}
			>
				<Title
					style={{
						color: '#D63D19',
						fontSize: '6em',
						textShadow: '2px 2px #FFFF',
						marginTop: '25px',
					}}
				>
					WellDone
				</Title>
			</Col>
			<Col
				span={24}
				style={{
					marginBottom: '20px',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				{/* <Title style={{color: "white"}}>Sign In</Title> */}
			</Col>
			<Col
				span={24}
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: '12%',
				}}
			>
				<Form
					onSubmit={handleSubmit}
					style={{
						maxWidth: '280px',
						border: '5px solid white',
						borderRadius: '15px',
						backgroundColor: 'white',
						padding: '50px',
					}}
				>
					<Form.Item>
						<Input
							prefix={<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />}
							type='email'
							name='email_address'
							placeholder='Email'
							value={account.email_address}
							onChange={handleChange}
							defaultValue='admin@emails'
						/>
					</Form.Item>
					<Form.Item>
						<Input
							prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
							type='password'
							name='password'
							placeholder='Password'
							value={account.password}
							onChange={handleChange}
							defaultValue='password'
						/>
					</Form.Item>
					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							style={{
								width: '100%',
								backgroundColor: '#D63D19',
								border: '1px solid #D63D19',
								fontWeight: '700',
							}}
						>
							Sign In
						</Button>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	)
}

export default SignIn
