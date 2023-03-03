import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProducts = ({
    name,
    setName,
    price,
    setPrice,
    category,
    setCategory,
    company,
    setCompany
}) => {

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5001/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async (e) => {
        e.preventDefault();
        let result = await fetch(`http://localhost:5001/product/${params.id}`, {
            method: "Put",
            body: JSON.stringify({
                name,
                price,
                category,
                company
            }),
            headers: {
                'Content-Type': "application/json"
            }
        })
        result = await result.json();
        console.log(result);
        navigate('/');
    }
    return (
        <div className="container">
            <h1>Update Product</h1>
            <form method="post">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    placeholder="Enter Product Name"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                />
                <label htmlFor="price">Price</label>
                <input
                    type="text"
                    placeholder="Enter Product Price"
                    value={price}
                    onChange={(e) => { setPrice(e.target.value) }}
                />
                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    placeholder="Enter Product Category"
                    value={category}
                    onChange={(e) => { setCategory(e.target.value) }}
                />
                <label htmlFor="company">Company</label>
                <input
                    type="text"
                    placeholder="Enter Product Company"
                    value={company}
                    onChange={(e) => { setCompany(e.target.value) }}
                />
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={updateProduct}
                >
                    Update Product
                </button>
            </form>
        </div>
    )
}

export default UpdateProducts