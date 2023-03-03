import { useNavigate } from "react-router-dom";

const AddProducts = ({
    name,
    setName,
    price,
    setPrice,
    category,
    setCategory,
    company,
    setCompany,
    error,
    setError
}) => {

    const navigate = useNavigate();

    const addProduct = async (e) => {

        e.preventDefault();

        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.log(userId);

        let result = await fetch('http://localhost:5001/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, userId, company }),
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result);
        navigate('/');
    }

    return (
        <div className="container">
            <h1>Add Product</h1>
            <form method="post">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    placeholder="Enter Product Name"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                />
                {
                    error && !name &&
                    <span className="error-message">
                        Name can't be Empty!
                    </span>
                }
                <label htmlFor="price">Price</label>
                <input
                    type="text"
                    placeholder="Enter Product Price"
                    value={price}
                    onChange={(e) => { setPrice(e.target.value) }}
                />
                {
                    error && !price &&
                    <span className="error-message">
                        Price can't be Empty!
                    </span>
                }
                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    placeholder="Enter Product Category"
                    value={category}
                    onChange={(e) => { setCategory(e.target.value) }}
                />
                {
                    error && !category &&
                    <span className="error-message">
                        Category can't be Empty!
                    </span>
                }
                <label htmlFor="company">Company</label>
                <input
                    type="text"
                    placeholder="Enter Product Company"
                    value={company}
                    onChange={(e) => { setCompany(e.target.value) }}
                />
                {
                    error && !company &&
                    <span className="error-message">
                        Company can't be Empty!
                    </span>
                }
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={addProduct}
                >
                    Add Product
                </button>
            </form>
        </div>
    )
}

export default AddProducts