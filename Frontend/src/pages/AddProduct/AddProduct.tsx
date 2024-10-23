import { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addProductToCart, removeProductFromCart } from '../../../app/authslice';
import { MdDelete, MdOutlineDelete } from 'react-icons/md';
import axios from 'axios';
import { BASE_URL } from '../../constants';


const AddProduct = () => {

    const username = useSelector((state: RootState) => state.auth.username)
    const email = useSelector((state: RootState) => state.auth.email)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const Products = useSelector((state: RootState) => state.auth.productcart)



    useEffect(() => {
        // Check if the token is missing from localStorage
        const token = localStorage.getItem('token');


        if (!token || !username || !email) {
            toast.error("Your Session out, Please Login again")
            navigate('/login');
        }
    }, [navigate, username]);

    type Inputs = {
        productName: string,
        productPrice: number,
        ProductQuantity: number
    }



    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()


    const subtotal = Products.reduce((acc, product) => {
        return acc + (product.productPrice || 0) * (product.ProductQuantity || 0);
    }, 0);

    // Apply 18% GST
    const gst = subtotal * 0.18;

    // Calculate total amount (subtotal + GST)
    const total = subtotal + gst;


    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const updatedData = {
            ...data,
            productPrice: Number(data.productPrice),
            ProductQuantity: Number(data.ProductQuantity),
        };
        console.log(updatedData)
        dispatch(addProductToCart(updatedData))
        reset()
    }


    const onDeleteProduct = (productName: string) => {
        dispatch(removeProductFromCart(productName));
    };

    const generateInvoice = async () => {
        try {
            const invoiceData = {
                username,
                email,
                products: Products,
                totalwithgst: Number(total.toFixed(2))
            };
            const response = await axios.post(`${BASE_URL}/invoice`, invoiceData);
            // Handle success response
            toast.success("Invoice generated successfully!");
            navigate('/product-invoice')
            console.log(response.data); // You can navigate or update the state based on response
        } catch (error) {
            toast.error("Failed to generate invoice.");
            console.error(error);
        }
    };



    useEffect(() => {
        console.log(Products)
    }, [Products])

    return (
        <div className='flex h-full flex-col gap-3 items-center justify-center px-4 sm:px-8'>
            <div className='w-full max-w-lg flex flex-col gap-8 my-8'>
                <div className='flex flex-col gap-1'>
                    <h1 className='text-white text-2xl font-semibold'>Add Products</h1>
                    <h3 className='text-[#A7A7A7] text-[12px] font-light'>
                        This is a basic product form for assignment purposes.
                    </h3>
                </div>

                <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                        <div className='flex flex-col gap-2'>
                            <label className='text-white text-sm'>Product Name</label>
                            <input
                                className={`border ${errors.productName ? 'border-red-500' : 'border-[#424647]'} p-2 rounded-sm text-[12px] text-[#707070] bg-[#202020] placeholder:text-[12px] placeholder:text-[#707070]`}
                                type="text"
                                placeholder='Enter the product name'
                                {...register('productName', {
                                    required: 'Product Name is required',
                                })}
                            />
                            {errors.productName && <p className='text-red-500 text-[12px]'>{errors.productName.message}</p>}
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-white text-sm'>Product Price</label>
                            <input
                                className={`border ${errors.productPrice ? 'border-red-500' : 'border-[#424647]'} p-2 rounded-sm text-[12px] text-[#707070] bg-[#202020] placeholder:text-[12px] placeholder:text-[#707070]`}
                                type="text"
                                placeholder='Enter the price'
                                {...register('productPrice', {
                                    required: 'Price is required',
                                })}
                            />
                            {errors.productPrice && <p className='text-red-500 text-[12px]'>{errors.productPrice.message}</p>}
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-white text-sm'>Product Quantity</label>
                            <input
                                className={`border ${errors.ProductQuantity ? 'border-red-500' : 'border-[#424647]'} p-2 rounded-sm text-[12px] text-[#707070] bg-[#202020] placeholder:text-[12px] placeholder:text-[#707070]`}
                                type="text"
                                placeholder='Enter the quantity'
                                {...register('ProductQuantity', {
                                    required: 'Quantity is required',
                                })}
                            />
                            {errors.ProductQuantity && <p className='text-red-500 text-[12px]'>{errors.ProductQuantity.message}</p>}
                        </div>
                    </div>
                    <button className='bg-[#303030] w-full sm:w-32 flex items-center justify-center gap-2 text-[12px] p-2 px-3 rounded-md text-[#C9F274]' type="submit">
                        Add Product <IoAddCircleOutline className='text-lg' />
                    </button>
                </form>

                <div className="overflow-x-auto w-full">
                    <table className="min-w-full border border-[#3F3F3F] text-[12px]">
                        <thead>
                            <tr className="bg-white text-black">
                                <th className="px-4 py-2 text-left">Product name</th>
                                <th className="px-4 py-2 text-left">Quantity</th>
                                <th className="px-4 py-2 text-left">Price</th>
                                <th className="px-4 py-2 text-left">Total Price</th>
                                <th className="px-4 py-2"></th>
                            </tr>
                        </thead>
                        <tbody className="text-white">
                            {Products?.map((e) => (
                                <tr key={e.productName} className="border-b border-[#3F3F3F]">
                                    <td className="px-4 py-2">{e.productName}</td>
                                    <td className="px-4 py-2">{e.ProductQuantity}</td>
                                    <td className="px-4 py-2">{e.productPrice}</td>
                                    <td className="px-4 py-2">INR {(Number(e.productPrice) || 0) * (Number(e.ProductQuantity) || 0)}</td>
                                    <td className="px-4 py-2 text-lg">
                                        <MdOutlineDelete className="cursor-pointer" onClick={() => onDeleteProduct(e.productName)} />
                                    </td>
                                </tr>
                            ))}
                            <tr className="border-t border-gray-700">
                                <td className="px-4 py-2" colSpan="2"></td>
                                <td className="px-4 py-2">+GST 18%</td>
                                <td className="px-4 py-2">INR {total.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='flex justify-center mt-4'>
                    <button onClick={generateInvoice} className='bg-[#303030] w-full sm:w-48 flex items-center justify-center gap-2 text-[12px] p-2 px-3 rounded-md text-[#C9F274]'>
                        Generate PDF Invoice
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddProduct