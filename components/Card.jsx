import Link from "next/link"

const Card = ({item}) => {
    const {_id,description,title,updatedAt} = item;
    return (
        <div>
            <Link href={`/memo/${_id}`} passHref>
            <div className="px-1 cursor-pointer">
			<div className=" bg-white dark:bg-indigo-900 rounded-lg overflow-hidden shadow-lg transition transform hover:-translate-y-1 md:hover:scale-105">
				<div className="px-6 py-4 md:px-10 md:py-8">
                    <div className="md:flex justify-between align-center">
                        <div className="font-bold text-indigo-700 dark:text-white text-xl md:text-2xl mb-1 capitalize truncate">{title}</div>
                        <div className="md:px-4"></div>
                        <div className="text-grey-700 dark:text-gray-100 text-sm md:text-base mb-3 mt-auto">{updatedAt.split('T')[0]} </div>
                    </div>
					<p className="text-gray-700 dark:text-gray-100 text text-sm md:mt-2 md:text-base">
						{description}
					</p>
				</div>
			</div>
		</div>
            </Link>
        </div>
    );
}

export default Card;