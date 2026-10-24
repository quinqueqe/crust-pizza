import type { Metadata } from 'next'
import { HeaderProvider } from '@/shared/components'

export const metadata: Metadata = {
	title: 'Оформление заказа | Crust Pizza',
}

export default function CheckoutLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<main className='min-h-screen bg-[#f4f1ee]'>
				<HeaderProvider />
				{children}
			</main>
		</>
	)
}
