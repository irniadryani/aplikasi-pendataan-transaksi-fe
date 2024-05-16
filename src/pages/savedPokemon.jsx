import React from 'react'
import { usePokemon } from '../pages/context'
import { Card } from '../component/card'
import Icon from '../assets/pokemon_icon.png'
import { Link } from 'react-router-dom'

export const SavedPokemon = () => {
	const { savedPokemon, removePokemon } = usePokemon()

	return (
		<div>
			<div className='flex w-full h-44 bg-purple-700 justify-center'>
				<img
					className='flex w-full max-w-56 h-full max-h-24 m-10'
					src={Icon}
				></img>
			</div>
			<div className='p-10'>
				<h1 className='text-2xl font-bold'>Your Pokémon Collection</h1>
				{savedPokemon.length !== 0 && (
					<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10'>
						{savedPokemon.map((pokemon, index) => (
							<React.Fragment key={index}>
								<Card
									id={index}
									aliasName={pokemon.alias}
									name={pokemon.name}
									image={pokemon.image}
									type={pokemon.type}
									weight={pokemon.weight}
									height={pokemon.height}
									removeButton={
										<button
											onClick={() =>
												removePokemon(pokemon.name)
											}
											className='px-5 py-[6px] rounded-md text-white bg-red-700 hover:bg-red-900'
										>
											Remove
										</button>
									}
								/>
							</React.Fragment>
						))}
					</div>
				)}

				{savedPokemon.length === 0 && (
					<div className='flex flex-col w-full items-center justify-center mt-10 mb-10 px-10'>
						<h2 className='font-medium text-black text-2xl mb-3'>
							You don&apos;t have any saved pokemon yet
						</h2>
						<Link to='/' className='max-w-sm w-full'>
							<button className='max-w-sm w-full px-5 py-3 border border-purple-700 bg-purple-700 hover:bg-white text-white hover:text-black text-sm font-medium rounded-lg'>
								Back
							</button>
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}