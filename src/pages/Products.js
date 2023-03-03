import { useEffect } from "react"
import { Link } from "react-router-dom";

const Products = ({
    products,
    setProducts
}) => {

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch("http://localhost:5001/products");
        result = await result.json();
        setProducts(result);
    }
    // console.log(products);

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5001/product/${id}`, {
            method: 'Delete'
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    const searchHandle = async (e) => {
        let key = e.target.value;
        let result = await fetch(`http://localhost:5001/search/${key}`);
        result = result.json();
        if (result) {
            setProducts(result);
        }
    }

    return (
        <div className="container">
            <h1>Products List</h1>
            <input type="search" name="search" id="search" placeholder="Search Product..." onChange={searchHandle} />
            <ul className="product-table">
                <li>S.No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {products && products.map((item, index) =>
                <ul className="product-table" key={item.name}>
                    <li>{index + 1}</li>
                    <li>{item.name}</li>
                    <li>{item.price}</li>
                    <li>{item.category}</li>
                    <li>{item.company}</li>
                    <li className="flex-item">
                        <button
                            className="btn btn-warning"
                            onClick={() => deleteProduct(item._id)}
                        >
                            Delete
                        </button>
                        <Link
                            to={`/update/${item._id}`}
                            className="btn btn-info"
                        >
                            Update
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default Products