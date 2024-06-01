import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

function ProductList({ products }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='mt-10'>
            <div className='w-[80%] mx-auto '>
                <div className=''>
                    <form className="flex items-center w-[200px] md:w-[250px] lg:w-[400px] mx-auto flex-wrap">
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">

                            <input type="text" id="simple-search"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Search product name..." required
                                   value={searchQuery}
                                   onChange={(e)=> setSearchQuery(e.target.value)}
                            />
                        </div>
                    </form>
                </div>

                <div className='mt-9'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 ">
                        {filteredProducts.length === 0 ? (
                            <div className="text-center">No products found.</div>
                        ) : (
                            filteredProducts.map((product, index) => (
                                <div key={index}
                                     className='border border-gray-300  p-4 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col my-2.5 mx-5 px-5 py-2.5 '>

                                    <Link href={`/product/${product.id}`} prefetch>
                                        <div className=' flex items-center justify-center w-[200px] h-[200px] mx-auto '>
                                            <Image src={product.image} alt={product.title} width={100} height={100}
                                                   loading='lazy'/>
                                        </div>
                                    </Link>
                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mt-6 mb-[10px]">
                                        {product.title}
                                    </h5>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span
                                            className="text-2xl font-semibold text-gray-900 dark:text-white">${product.price}</span>
                                        <Link href={`/product/${product.id}`} prefetch>
                                            <h1 className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                View Product...
                                            </h1>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return {
        props: {
            products: data,
        },
    };
}

export default ProductList;
