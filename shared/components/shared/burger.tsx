'use client'

import React from 'react'
import { cn } from '@/shared/lib'
import Link from 'next/link'
import Image from 'next/image'
import { AuthModal, ProfileBtn, SearchInput } from '.'

type Props = {
	setIsOpen: (isOpen: boolean) => void
	isOpen: boolean
	hasSearch: boolean
	hasProfile: boolean
	openModal: boolean
	setOpenModal: (value: boolean) => void
}

export const Burger = ({
	setIsOpen,
	isOpen,
	hasSearch,
	hasProfile,
	openModal,
	setOpenModal,
}: Props) => {
	return (
		<>
			<button
				aria-label='Toggle menu'
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					'relative w-8 h-10 flex items-center justify-center z-1000', // h-12 больше пространства!
					'hidden max-[915px]:block'
				)}
				type='button'
			>
				<span
					className={cn(
						'absolute left-0 w-8 h-1 bg-black rounded transition-all duration-300',
						isOpen ? 'top-1/2 rotate-45 bg-white' : 'top-2'
					)}
				/>
				<span
					className={cn(
						'absolute left-0 w-6 ml-2 h-1 bg-black rounded transition-all duration-300',
						isOpen ? 'opacity-0 bg-white' : 'top-1/2 -translate-y-1/2'
					)}
				/>
				<span
					className={cn(
						'absolute left-0 w-4 ml-4 h-1 bg-black rounded transition-all duration-300',
						isOpen ? 'top-1/2 -rotate-45 ml-0 w-8 bg-white' : 'bottom-2'
					)}
				/>
			</button>

			{isOpen && (
				<div className='absolute top-0 left-0 z-999 flex flex-col items-center justify-center gap-4 w-full h-full bg-black overflow-hidden'>
					<div>
						<div className='absolute top-6 left-4 flex border-b-[1px] border-white/20 border-solid w-full -ml-4 pl-4 pb-4'>
							<Link href='/' className='flex gap-4 items-center'>
								<Image src='/favicon.ico' alt='img' width={35} height={35} />
								<div>
									<h1 className='text-2xl uppercae text-white font-black'>
										Crust Pizza
									</h1>
									<p className='text-sm text-gray-400 leading-3'>
										вкусней уже некуда
									</p>
								</div>
							</Link>
						</div>
					</div>
					<div className='w-full absolute top-27 px-4 flex gap-4 flex-col'>
						{hasSearch && (
							<SearchInput
							// onClick={() => setIsOpen(false)}
							/>
						)}

						<AuthModal open={openModal} onClose={() => setOpenModal(false)} />
						{hasProfile && (
							<div onClick={() => setIsOpen(false)}>
								<ProfileBtn onClickLogin={() => setOpenModal(true)} />
							</div>
						)}
					</div>
				</div>
			)}
		</>
	)
}
