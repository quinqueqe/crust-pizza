import { PaymentData } from '@/@types/yookassa'
import axios from 'axios'

type Props = {
	description: string
	orderId: number
	amount: number
}

export async function createPayment({ description, orderId, amount }: Props) {
	const { data } = await axios.post<PaymentData>(
		'https://api.yookassa.ru/v3/payments',
		{
			amount: {
				value: amount,
				currency: 'RUB',
			},

			capture: true,
			description: description,
			metadata: {
				order_id: orderId,
			},
			confirmation: {
				type: 'redirect',
				return_url: process.env.YOOKASSA_CALLBACK_URL,
				// return_url: 'https://crust-pizza.vercel.app/checkout',
			},
		},
		{
			auth: {
				username: process.env.YOOKASSA_STORE_ID as string,
				password: process.env.YOOKASSA_API_KEY as string,
			},
			headers: {
				'Idempotence-Key': Math.random().toString(36).substring(7),
			},
		}
	)

	return data
}
