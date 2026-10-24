'use server'

import prisma from '@/prisma/prisma'
import { cookies } from 'next/headers'

import { CheckoutSchemaType } from '@/shared/constants'
import { OrderStatus } from '@prisma/client'
import { createPayment, sendEmail } from '@/shared/lib'
import { PayOrderTemplate } from '@/shared/components'

export async function createOrder(
	data: CheckoutSchemaType,
	totalAmountCart: number,
	totalPrice: number,
	deliveryPrice: number,
	discount: number,
	promoCheckout: string
) {
	// console.log(data)
	try {
		const cookiesStore = await cookies()
		const token = cookiesStore.get('cartToken')?.value

		if (!token) {
			throw new Error('Cart token not found')
		}

		// Находим корзину по токену
		const userCart = await prisma.cart.findFirst({
			where: {
				token,
			},
			include: {
				items: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true,
							},
						},
					},
				},
			},
		})

		// если корзина не найдена возращаем ошибку
		if (!userCart) {
			throw new Error('Cart not found')
		}

		// если корзина пустая возращаем ошибку
		if (userCart?.totalAmount === 0) {
			throw new Error('Cart is empty')
		}

		// создаем заказ
		const order = await prisma?.order.create({
			data: {
				token,
				fullName: data.firstName + ' ' + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				totalAmount: totalAmountCart,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.items),
				totalPrice,
				deliveryPrice,
				promo: promoCheckout,
				discount,
			},
		})

		// Очищаем корзину по айди с найденной корзины
		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		})

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		})

		// создание ссылки оплаты
		const paymentData = await createPayment({
			description: `Оплата заказа #${order.id}`,
			orderId: order.id,
			amount: order.totalAmount,
		})

		if (!paymentData) {
			throw new Error('Payment data not found')
		}

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				paymentId: paymentData.id, // добавили для каждого заказа свой уникальный paymentId который береться с yookassa, по нему можно найти order пользователя
			},
		})

		const paymentUrl = paymentData.confirmation.confirmation_url // уникальная ссылка на оплату order пользователя

		// отправка письма на почту
		await sendEmail(
			data.email,
			`Crust Pizza | Подтверждение вашего заказа 🍕`,
			PayOrderTemplate({
				paymentUrl,
				items: JSON.parse(order.items as string),
				order,
			})
		)

		return paymentUrl // возращаем ссылку на оплату для перехода после нажатия на кнопку отправки формы пользователя
	} catch (err) {
		console.log('[CREATE_ORDER_ERROR]', err)
	}
}
