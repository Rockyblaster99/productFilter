import Image from "next/image";
import { useRouter } from "next/router";

export default function Product({ product }) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const renderStars = (rating) => {
        const stars = [];
        const filledStars = Math.floor(rating); // Number of filled stars
        const remainder = rating - filledStars; // Decimal part of rating

        // Fill full stars
        for (let i = 0; i < filledStars; i++) {
            stars.push(
                <svg key={i} className="w-5 h-5 ms-1 text-yellow-300 " aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path
                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
            );
        }

        // Add half star if remainder >= 0.5
        if (remainder >= 0.5) {
            stars.push(
                <svg key="half" className="w-5 h-5 ms-1 text-yellow-300" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path
                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
            );
        } else if (remainder > 0) {
            // If remainder is less than 0.5, add a blank star
            stars.push(
                <svg key="blank" className="w-5 h-5 ms-1 text-black" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path
                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
            );
        }

        // Add blank stars to complete 5
        for (let i = filledStars + 1; i < 5; i++) {
            stars.push(
                <svg key={i} className="w-5 h-5 ms-1 text-black" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path
                        d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
            );
        }

        return stars;
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-14 mt-[150px] mb-[200px]'>

            <div className=' '>

                <Image className=' ml-[100px]  md:ms-auto' src={product.image} alt={product.title} width={300} height={300}/>
            </div>

            <div className='md:mt-[50px] lg:mt-[50px] mt-5 md:[50%] lg:w-[70%] '>
                <h4 className='uppercase text-black text-[20px] font-bold ml-[150px] md:ml-0'>
                    {product.category}
                </h4>
                <h1 className=' mt-5 font-normal text-[20px]  md:text-[25px] lg:text-[35px] ml-[10px] md:ml-0'>
                    {product.title}
                </h1>
                <div className='mt-4 flex gap-2 items-center ml-[130px] md:ml-0'>
                    <div className="flex items-center  mb-5 ">
                        {renderStars(product.rating.rate)}
                    </div>
                    <div className='mt-[-20px]  font-semibold flex items-center gap-1 '>
                        <h1 className='text-[20px] text-red-500'>{product.rating.rate}</h1>
                        <h1>({product.rating.count})</h1>

                    </div>
                </div>
                <div className='flex items-center gap-2 ml-5 md:ml-0'>
                    <span className='md:leading-4 leading-6 md:text-[25px] text-[30px] font-semibold text-red-500'>$</span>
                    <p className='md:text-[20px] md:font-semibold text-[25px]'>{product.price}</p>
                </div>
                <p className='text-[18px] font-semibold mt-5 ml-5 md:ml-0' >
                    {product.description}
                </p>
            </div>


        </div>
    );
}

export async function getStaticPaths() {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();

    const paths = data.map((product) => ({
        params: {id: product.id.toString()},
    }));

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps({params}) {
    const {id} = params;
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await response.json();

    return {
        props: {
            product,
        },
        revalidate: 60,
    };
}
