import type { Metadata } from 'next'
import { HeaderProvider } from '@/shared/components'

export const metadata: Metadata = {
	title: 'Главная | Crust Pizza',
}

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode
	modal: React.ReactNode
}>) {
	return (
		<>
			<main className='min-h-screen'>
				<HeaderProvider hasSearch hasCart hasProfile />
				{modal}
				{children}
			</main>
		</>
	)
}
