// pages/index.js

import ProductList from "@/pages/product";
export default function Home({ products }) {
    return (
        <div>
            <ProductList products={products} />
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
