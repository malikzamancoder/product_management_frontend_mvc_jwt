import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Products = () => {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [desc, setDesc] = useState("");

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();


  const API_URL =
    "http://localhost:5050";


  // Fetch Products

  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        `${API_URL}/products`
      );

      setProducts(response.data);


    } catch(error){

      console.log(error);

    }

  };


  useEffect(()=>{

    const token = localStorage.getItem("loginToken");

    if(!token){
      navigate("/login");
      return;
    }

    fetchProducts();

  },[]);



  // Add / Update Product

  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{


      const token = localStorage.getItem("loginToken");


      const productData = {

        name,
        price,
        imageUrl,
        desc

      };



      if(editId){

        await axios.put(
          `${API_URL}/products/${editId}`,
          productData,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );


        alert("Product updated successfully");


      }
      else{


        await axios.post(
          `${API_URL}/products`,
          productData,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );


        alert("Product added successfully");


      }



      setName("");
      setPrice("");
      setImageUrl("");
      setDesc("");
      setEditId(null);


      fetchProducts();



    }catch(error){

      console.log(error);
      alert("Something went wrong");

    }

  };




  // Delete Product

  const deleteProduct = async(id)=>{


    try{


      const token = localStorage.getItem("loginToken");


      await axios.delete(
        `${API_URL}/products/${id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      alert("Product deleted");


      fetchProducts();



    }catch(error){

      console.log(error);

    }


  };





  // Edit Product

  const editProduct = (product)=>{


    setName(product.name);
    setPrice(product.price);
    setImageUrl(product.imageUrl);
    setDesc(product.desc);

    setEditId(product.id);


    window.scrollTo({
      top:0,
      behavior:"smooth"
    });


  };




  // Search Filter

  const filteredProducts = products.filter((product)=>{

    return product.name
    .toLowerCase()
    .includes(search.toLowerCase());

  });



  // Logout

  const logout = ()=>{

    localStorage.removeItem("loginToken");

    navigate("/login");

  };




  return (

<div className="min-h-screen bg-gray-100">


{/* Navbar */}

<nav className="
bg-white
shadow-md
px-6
py-4
flex
justify-between
items-center
">


<h1 className="
text-2xl
font-bold
text-blue-600
">
ProductHub
</h1>


<div className="flex gap-4">


<button
onClick={logout}
className="
bg-red-500
text-white
px-4
py-2
rounded-xl
hover:bg-red-600
transition
"
>
Logout
</button>


</div>


</nav>





<div className="
max-w-7xl
mx-auto
p-6
">


<h2 className="
text-3xl
font-bold
mb-6
text-gray-800
">

{editId ? "Edit Product" : "Add Product"}

</h2>





{/* Form */}

<form
onSubmit={handleSubmit}
className="
bg-white
rounded-2xl
shadow-lg
p-6
grid
gap-4
"
>


<input
className="
border
rounded-xl
p-3
outline-none
focus:ring-2
focus:ring-blue-500
"
placeholder="Product Name"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>


<input
className="
border
rounded-xl
p-3
outline-none
focus:ring-2
focus:ring-blue-500
"
placeholder="Price"
type="number"
value={price}
onChange={(e)=>setPrice(e.target.value)}
required
/>



<input
className="
border
rounded-xl
p-3
outline-none
focus:ring-2
focus:ring-blue-500
"
placeholder="Image URL"
value={imageUrl}
onChange={(e)=>setImageUrl(e.target.value)}
required
/>



<textarea

className="
border
rounded-xl
p-3
outline-none
focus:ring-2
focus:ring-blue-500
"

placeholder="Description"

value={desc}

onChange={(e)=>setDesc(e.target.value)}

required

/>




<button

className="
bg-blue-600
text-white
py-3
rounded-xl
font-semibold
hover:bg-blue-700
transition
"

>

{
editId
?
"Update Product"
:
"Add Product"
}


</button>



</form>





{/* Search */}

<div className="mt-8">


<input

className="
w-full
border
rounded-xl
p-3
shadow
"

placeholder="Search products..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>


</div>







{/* Products */}

<div className="
grid
md:grid-cols-3
gap-6
mt-8
">


{
filteredProducts.map((product)=>(


<div
key={product.id}
className="
bg-white
rounded-2xl
shadow-lg
overflow-hidden
hover:-translate-y-1
transition
"
>


<img

src={product.imageUrl}

alt={product.name}

className="
w-full
h-48
object-cover
"

/>



<div className="p-5">


<h3 className="
text-xl
font-bold
">

{product.name}

</h3>



<p className="
text-gray-500
mt-2
">

{product.desc}

</p>


<p className="
text-blue-600
font-bold
mt-3
">

Rs {product.price}

</p>



<div className="
flex
gap-3
mt-5
">


<button

onClick={()=>editProduct(product)}

className="
bg-yellow-500
text-white
px-4
py-2
rounded-lg
"

>

Edit

</button>



<button

onClick={()=>deleteProduct(product.id)}

className="
bg-red-500
text-white
px-4
py-2
rounded-lg
"

>

Delete

</button>


</div>



</div>


</div>


))
}


</div>


</div>


</div>

  );
};


export default Products;