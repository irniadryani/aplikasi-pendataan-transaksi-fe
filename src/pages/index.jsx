import React, { useEffect, useState } from 'react'
import Icon from '../assets/pokemon_icon.png'
import { Card } from '../component/card'
import { Filter } from '../component/filter'
import { allPokemonFn, pokemonByIdFn } from '../api/Pokemon'
import { useQuery } from 'react-query'
import { IoMdSearch } from 'react-icons/io'
import { MdCatchingPokemon } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function Index() {
	const [pokemonDetails, setPokemonDetails] = useState([])
	const [loadingPokemonDetails, setLoadingPokemonDetails] = useState(true)
	const [search, setSearch] = useState('')
	const [filter, setFilter] = useState(null)
	const [itemsToShow, setItemsToShow] = useState(20)

	const { data: pokemonData, isLoading: isLoadingPokemonData } = useQuery({
		queryKey: ['pokemon'],
		queryFn: allPokemonFn,
	})

	const fetchPokemonDetails = async () => {
		if (pokemonData?.results.length !== 0) {
			setLoadingPokemonDetails(true)
			const details = await Promise.all(
				pokemonData.results.map((pokemon) => {
					return pokemonByIdFn(pokemon.name)
				})
			)
			setPokemonDetails(details)
			setLoadingPokemonDetails(false)
		}
	}

	useEffect(() => {
		if (!isLoadingPokemonData && pokemonData?.results.length !== 0) {
			fetchPokemonDetails()
		}
	}, [pokemonData, isLoadingPokemonData])

	const filteredPokemon = pokemonDetails?.filter((pokemon) => {
		const matchingName = pokemon?.name
			?.toLowerCase()
			.includes(search.toLowerCase())
		const matchingType = pokemon?.types?.some(
			(type) => type.type.name === filter
		)

		if (search !== '' && filter === null) {
			return matchingName
		}

		if (search === '' && filter !== null) {
			return matchingType
		}

		if (search !== '' && filter !== null) {
			return matchingName && matchingType
		}

		return pokemonDetails
	})

	return (
		<div>
			<div className='flex w-full h-44 bg-purple-700 justify-center'>
				<img
					className='flex w-full max-w-56 h-full max-h-24 m-10'
					src={Icon}
					alt='Pokemon Icon'
				></img>
			</div>

			<div className='flex flex-col md:flex-row md:justify-between gap-5 md:items-center p-10'>
				<div>
					<Link to='/collection'>
						<button className='text-sm font-medium px-4 py-2 rounded-md bg-purple-700 hover:bg-purple-900 text-white flex items-center gap-2'>
							<MdCatchingPokemon size={24} />
							Your collection
						</button>
					</Link>
				</div>
				<div className='flex gap-5 items-center'>
					<div className='flex z-10 gap-5'>
						<Filter setFilter={setFilter} />
					</div>
					<div className='flex items-center gap-2 pl-4 max-w-[200px] rounded-md bg-white border border-gray-300 hover:bg-gray-50 focus:border-[#06476F] group'>
						<IoMdSearch fontSize='1.125rem' color='#06476F' />
						<input
							type='text'
							className='flex h-9 pe-4 py-1 w-full rounded-lg outline-none text-sm group-hover:bg-gray-50 group-focus:border-[#06476f]'
							placeholder='Search Pokemon'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
				</div>
			</div>

			{isLoadingPokemonData && filteredPokemon.length === 0 && (
				<div className='flex justify-center'>
					<span className='flex loading loading-spinner loading-lg'></span>
				</div>
			)}

			{filteredPokemon.length !== 0 &&
				pokemonData.results?.length !== 0 && (
					<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10'>
						{filteredPokemon
							?.slice(0, itemsToShow)
							.map((pokemon, id) => (
								<React.Fragment key={id}>
									<Card
										id={id}
										name={pokemon?.name}
										image={pokemon?.sprites?.front_default}
										type={pokemon?.types
											?.map(
												(typeInfo) => typeInfo.type.name
											)
											.join(', ')}
										weight={pokemon?.weight}
										height={pokemon?.height}
									/>
								</React.Fragment>
							))}
					</div>
				)}

			{!isLoadingPokemonData &&
				loadingPokemonDetails !== true &&
				filteredPokemon.length !== 0 &&
				itemsToShow < filteredPokemon.length && (
					<div className='flex w-full items-center justify-center mt-3 mb-10 px-10'>
						<button
							onClick={() => {
								const remainingItems =
									filteredPokemon.length - itemsToShow
								const itemsToAdd =
									remainingItems < 20 ? remainingItems : 20
								setItemsToShow(itemsToShow + itemsToAdd)
							}}
							className='max-w-2xl w-full px-5 py-3 border border-purple-700 bg-purple-700 hover:bg-white text-white hover:text-black text-sm font-medium rounded-lg'
						>
							Load more
						</button>
					</div>
				)}

			{!isLoadingPokemonData &&
				loadingPokemonDetails !== true &&
				filteredPokemon.length === 0 && (
					<div className='flex flex-col gap-5 items-center justify-center'>
						<h2 className='font-medium text-black text-2xl'>
							Pokemon not found
						</h2>
						<MdCatchingPokemon size={32} color='red' />
					</div>
				)}
		</div>
	)
}