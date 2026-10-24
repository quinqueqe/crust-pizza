import React from 'react'
import { Metadata } from 'next'
import { Container, InfoBlock } from '@/shared/components'
import { cn } from '@/shared/lib'

export const metadata: Metadata = {
	title: 'Страница не найдена | Crust Pizza',
}

export default function NotFound() {
	return (
		<Container
			className={cn(
				'h-full flex justify-center items-center pt-40',
				'max-[830px]:pt-30',
				'max-[640px]:pt-25'
			)}
		>
			<InfoBlock
				title='Страница не найдена'
				text='Проверьте корректность введённого адреса или повторите попытку позже'
				imageUrl='/assets/images/not-found.png'
			/>
		</Container>
	)
}
