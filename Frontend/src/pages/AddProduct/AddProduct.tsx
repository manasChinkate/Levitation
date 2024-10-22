import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { IoAddCircleOutline } from "react-icons/io5";


const AddProduct = () => {

    const data = [
        {
            productName: "product 1",
            productQuantity: 3,
            productPrice: 56,
        },
        {
            productName: "product 2",
            productQuantity: 3,
            productPrice: 45,
        },
        {
            productName: "product 3",
            productQuantity: 4,
            productPrice: 96,
        },
    ]



    type Inputs = {
        productName: string,
        productPrice: number,
        ProductQuantity: number
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<Inputs>()


    const subtotal = data.reduce((acc, product) => {
        return acc + (Number(product.productPrice) || 0) * (Number(product.productQuantity) || 0);
    }, 0);

    // Apply 18% GST
    const gst = subtotal * 0.18;

    // Calculate total amount (subtotal + GST)
    const total = subtotal + gst;

    return (
        <div className=' flex  h-full flex-col gap-3  items-center justify-center  '>
            <div className=' flex flex-col gap-8  w-[800px]' >
                <div className='flex flex-col gap-1'>
                    <h1 className='text-white text-2xl font-semibold'>
                        Add Products
                    </h1>
                    <h3 className='text-[#A7A7A7] text-[12px] w-72 font-light'>
                        This is basic login page which is used for levitation assignment purpose.                         </h3>
                </div>

                <div>

                    <form className='flex flex-col gap-5' >
                        <div className=' grid grid-cols-3 gap-4'>
                            <div className='flex flex-col gap-2'>
                                <label className='text-white text-sm'>Product Name</label>
                                <input
                                    className={`border ${errors.productName ? 'border-red-500' : 'border-[#424647]'} p-2 rounded-sm text-[12px] text-[#707070] bg-[#202020] placeholder:text-[12px] placeholder:text-[#707070]`}
                                    type="text"
                                    placeholder='Enter the product name'
                                    {...register('productName')}
                                />
                                {errors.productName && <p className='text-red-500 text-[12px]'>{errors.productName.message}</p>}

                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-white text-sm'>Product Price</label>
                                <input
                                    className={`border ${errors.productPrice ? 'border-red-500' : 'border-[#424647]'} p-2 rounded-sm text-[12px] text-[#707070] bg-[#202020] placeholder:text-[12px] placeholder:text-[#707070]`}
                                    type="text"
                                    placeholder='Enter the price'
                                    {...register('productPrice')}
                                />
                                {errors.productPrice && <p className='text-red-500 text-[12px]'>{errors.productPrice.message}</p>}

                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-white text-sm'>Product Quantity</label>
                                <input
                                    className={`border ${errors.ProductQuantity ? 'border-red-500' : 'border-[#424647]'} p-2 rounded-sm text-[12px] text-[#707070] bg-[#202020] placeholder:text-[12px] placeholder:text-[#707070]`}
                                    type="text"
                                    placeholder='Enter the quantity'
                                    {...register('ProductQuantity')}
                                />
                                {errors.ProductQuantity && <p className='text-red-500 text-[12px]'>{errors.ProductQuantity.message}</p>}

                            </div>
                        </div>
                        <button className='bg-[#303030] w-32 flex items-center justify-center gap-2 text-[12px] p-2 px-3 rounded-md text-[#C9F274]' type="submit">
                            Add Product <IoAddCircleOutline className=' text-lg' />

                        </button>
                    </form>
                </div>

                <div>
                    <div className="overflow-x-auto rounded-lg">
                        <table className="min-w-full  border border-[#3F3F3F] ">
                            <thead >
                                <tr className="bg-white text-black text-[12px] font-light  ">
                                    <th className="px-6 py-2 text-left">Product name
                                        <span className="ml-2 cursor-pointer">▲</span>
                                    </th>
                                    <th className="px-6 py-2 text-left">Quantity
                                        <span className="ml-2 cursor-pointer">▼</span>
                                    </th>
                                    <th className="px-6 py-2 text-left">Price</th>
                                    <th className="px-6 py-3 text-left">Total Price</th>
                                </tr>
                            </thead>
                            <tbody className=" text-white ">

                                {
                                    data.map((e) => {
                                        return (
                                            <tr className="border  text-[12px]  border-[#3F3F3F]   ">
                                                <td className="px-6 py-2 ">{e.productName}</td>
                                                <td className="px-6 py-2  ">{e.productPrice}</td>
                                                <td className="px-6 py-2 ">{e.productQuantity}</td>
                                                <td className="px-6 py-2  ">INR {(Number(e.productPrice) || 0) * (Number(e.productQuantity) || 0)}</td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr className="border-t border-gray-700 text-[12px]">
                                    <td className="px-6 py-2" colSpan="2"></td>
                                    <td className="px-6 py-2">+GST 18%</td>
                                    <td className="px-6 py-2">INR {total.toFixed(2)}</td>
                                </tr>


                            </tbody>
                        </table>
                    </div>



                </div>

            </div>
            <button className='bg-[#303030] w-48 flex items-center justify-center gap-2 text-[12px] p-2 px-3 rounded-md text-[#C9F274]' type="submit">
                Generate PDF Invoice 

            </button>
        </div>
    )
}

export default AddProduct