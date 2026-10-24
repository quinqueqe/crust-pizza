'use client'

import { redirect } from 'next/navigation'
import React from 'react'
// import prisma from '@/prisma/prisma'
// import { VariantsProduct } from '@/shared/components/shared'
// import { notFound } from 'next/navigation'
// import { Container } from '../../../../shared/components/shared'
// import Link from 'next/link'

// type Props = {
// 	params: Promise<{
// 		id: string
// 	}>
// }

// export const generateMetadata = async () => {
// 	// { params }: Props
// 	// const { id } = await params
// 	// const productId = Number(id)
// 	// const product = await prisma.product.findFirst({
// 	// 	where: {
// 	// 		id: productId,
// 	// 	},
// 	// })
// 	// const name = product?.name
// 	// if (name) {
// 	// 	if (product.whProduct === 1) {
// 	// 		return {
// 	// 			title: `Пицца ${name} | Crust Pizza`,
// 	// 		}
// 	// 	}
// 	// 	if (product.whProduct === 2) {
// 	// 		return {
// 	// 			title: `${name} | Crust Pizza`,
// 	// 		}
// 	// 	}
// 	// } else {
// 	// 	return {
// 	// 		title: `Продукт не найден | Crust Pizza`,
// 	// 	}
// 	// }
// }

export default function ProductId() {
	// async // { params }: Props
	// const { id } = await params
	// const productId = Number(id)
	// const product = await prisma?.product.findFirst({
	// 	where: {
	// 		id: productId,
	// 	},
	// 	include: {
	// 		ingredients: true,
	// 		category: {
	// 			include: {
	// 				products: {
	// 					include: {
	// 						variations: true,
	// 					},
	// 				},
	// 			},
	// 		},
	// 		variations: true,
	// 	},
	// })

	// if (!product) return notFound()
	redirect('/')
	return (
		<></>
		// <Container>
		// 	<div>
		// 		<div className='pb-20'>
		// 			<div className='pt-10'>
		// 				<p className='flex gap-[6px] text-[16px]'>
		// 					<Link href='/' className='text-[#252525]'>
		// 						Главная
		// 					</Link>
		// 					<span className='text-[#bbbbbb]'>/</span>
		// 					<Link
		// 						href={`/#${product.category.name}`}
		// 						className='text-[#252525]'
		// 					>
		// 						{product.category.name}
		// 					</Link>
		// 					<span className='text-[#bbbbbb]'>/</span>
		// 					<span className='text-[#bbbbbb]'>{product.name}</span>
		// 				</p>
		// 				<div className='pt-10'>
		// 					<VariantsProduct
		// 						product={product}
		// 						rightBlockClassName='w-[700px] rounded-4xl'
		// 					/>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// </Container>
	)
}
