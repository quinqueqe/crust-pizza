'use client'

import { usePizzaOptions } from '@/shared/hooks'
import { Ingredients, Variation } from '@prisma/client'
import {
	CloseProductModalBtn,
	PizzaImage,
	PizzaSelector,
	ProductIngredient,
} from '../../components/shared'
import { Button } from '../ui'
import { cn, getPizzaDetails } from '@/shared/lib' 

type Props = {
	imageUrl: string
	name: string
	ingredients: Ingredients[]
	price: number
	className?: string
	desc?: string | null
	variations?: Variation[]
	onClickAdd: (productItemId: number, ingredients: number[]) => void
	status: string | boolean
	rightBlockClassName?: string
	onCloseModal?: () => void
}

export const ChoosePizzaForm = ({
	imageUrl,
	name,
	ingredients,
	// price,
	variations,
	onClickAdd,
	status,
	rightBlockClassName,
	onCloseModal,
}: Props) => {
	const {
		activeSize,
		activeType,
		setActiveSize,
		setActiveType,
		selectedIds,
		add,
		remove,
		size,
		sizes,
		types,
		productItemId,
	} = usePizzaOptions(variations!)

	const { details, totalPrice } = getPizzaDetails(
		variations!,
		ingredients,
		selectedIds,
		types,
		activeType,
		size
	)

	const handleClickAdd = () => {
		onClickAdd(productItemId, Array.from(selectedIds))
		// console.log(types[activeType].value)
		// console.log({ size, ingredients: selectedIds })
	}
	return (
		<div className='flex justify-between relative items-center max-[1100px]:flex-col max-[1100px]:px-4 max-[1100px]:pt-17 max-[1100px]:h-[100vh] max-[1100px]:justify-center max-[1100px]:scroll-auto max-[1100px]:relative max-[1100px]:gap-[20px] max-[1100px]:relative'>
			<div className=' max-[1100px]:bg-[rgb(255,255,255)]'>
				<PizzaImage
					className='w-[550px] h-[500px] flex justify-center items-center max-[1100px]:w-full max-[1100px]:h-full'
					imageUrl={imageUrl}
					size={size}
				/>
			</div>
			<div
				className={cn(
					'bg-[#F4F1EE] h-[610px] p-10 flex flex-col justify-center',
					'max-[1100px]:p-0 max-[1100px]:bg-white',
					'max-[1100px]:w-[420px]',
					'max-[470px]:w-full',

					rightBlockClassName
				)}
			>
				<div
					className={cn(
						'max-[1100px]:overflow-auto max-[1100px]:scroll-auto  max-[1100px]:pb-18'
					)}
				>
					<h4 className='font-extrabold text-[#373737] text-4xl pb-2'>
						{name}
					</h4>
					<p className='text-[#373737] opacity-60 pb-3'>{details}</p>
					<div className='flex flex-col gap-1 mb-5 max-[470px]:justify-center max-[470px]:items-center'>
						<PizzaSelector
							pizzaSizes={sizes}
							pizzaTypes={types}
							setActiveSize={setActiveSize}
							setActiveType={setActiveType}
							activeSize={activeSize}
							activeType={activeType}
						/>
					</div>
					<h5 className='text-[#000] text-[18px] font-semibold pb-2'>
						Добавить по вкусу
					</h5>

					<ul
						className={cn(
							'grid grid-cols-3 gap-2 mb-4 p-2 max-[460px]:grid-cols-2',
							'pizza-ingredients min-[1100px]:h-[245px]',
						)}
					>
						{ingredients.map((ing, i) => (
							<ProductIngredient
								key={i}
								imageUrl={ing.imageUrl}
								name={ing.name}
								price={ing.price}
								active={selectedIds.has(ing.id)}
								onClick={() => {
									if (selectedIds.has(ing.id)) {
										remove(ing.id)
									} else {
										add(ing.id)
									}
								}} // Используем add, remove вместо toggle
								className='max-[460px]:w-full'
							/>
						))}
					</ul>
				</div>
				<div className='max-[1100px]:sticky max-[1100px]:bottom-0 max-[1100px]:left-0 max-[1100px]:py-4 max-[1100px]:px-4 max-[1100px]:bg-white max-[1100px]:z-8 max-[1100px]:-mx-4 max-[470px]:shadow-[0_4px_30px_rgba(6,5,50,0.1)]'>
					<Button
						status={status}
						onClick={() => handleClickAdd()}
						variant={'outline'}
						className='font-bold text-center text-[16px] py-[16px] px-[35px] text-white rounded-[18px] bg-[#fe5f00] h-[50px] w-[100%]'
					>
						В корзину за {totalPrice}₽
					</Button>
				</div>
			</div>
			<CloseProductModalBtn onClick={onCloseModal} />
		</div>
	)
}
