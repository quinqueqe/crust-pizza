'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
	Container,
	SearchInput,
	CartButton,
	ProfileBtn,
	AuthModal,
	// Burger,
} from './'
import { useHeaderInterface } from '@/shared/hooks/use-header-interface'

type Props = {
	hasSearch?: boolean
	hasCart?: boolean
	hasProfile?: boolean
}

export const Header = ({
	hasSearch = false,
	hasCart = false,
	hasProfile = false,
}: Props) => {
	const { openModal, setOpenModal } = useHeaderInterface()

	return (
		<header>
			<Container className='flex justify-between items-center py-8 max-[915px]:pt-6 max-[915px]:pb-7'>
				<Link href='/' className='flex gap-4 items-center'>
					<Image src='/favicon.ico' alt='img' width={35} height={35} />
					<div>
						<h1 className='text-2xl uppercae font-black'>Crust Pizza</h1>
						{/* <p className='text-sm text-gray-400 leading-3'>
							вкусней уже некуда
						</p> */}
					</div>
				</Link>
				{hasSearch && <SearchInput className='max-[915px]:hidden' />}
				<div className='flex gap-3 items-center'>
					<AuthModal open={openModal} onClose={() => setOpenModal(false)} />
					{hasProfile && <ProfileBtn onClickLogin={() => setOpenModal(true)} />}

					<div className='flex items-center gap-4 max-[915px]:hidden'>
					{hasCart && <CartButton />}
					</div>
				</div>

				{/* <Burger
					setIsOpen={setIsOpen}
					isOpen={isOpen}
					hasSearch
					hasProfile
					openModal={openModal}
					setOpenModal={setOpenModal}
				/> */}
			</Container>
		</header>
	)
}
