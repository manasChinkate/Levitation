import logo1 from '../../assets/logo1.png'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { useNavigate } from 'react-router-dom'

const ProductInvoice = () => {

    const username = useSelector((state: RootState) => state.auth.username)
    const email = useSelector((state: RootState) => state.auth.email)
    const Products = useSelector((state: RootState) => state.auth.productcart)


    const subtotal = Products.reduce((acc, product) => {
        return acc + (product.productPrice || 0) * (product.ProductQuantity || 0);
    }, 0);

    // Apply 18% GST
    const gst = subtotal * 0.18;

    // Calculate total amount (subtotal + GST)
    const total = subtotal + gst;

    
    const currentDate = new Date().toLocaleDateString();


    const downloadPDF = async () => {
        try {
          const response = await fetch('http://localhost:3000/generate-invoice-pdf');
          const blob = await response.blob();
          const url = window.URL.createObjectURL(new Blob([blob]));
      
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'product-invoice.pdf'); // Filename for the downloaded PDF
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        } catch (error) {
          console.error('Error downloading PDF:', error);
        }
      };


    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className=' min-h-[90vh] w-[700px] border rounded-md flex flex-col'>
                <div className=' h-16 bg-white border-b  flex items-center justify-between px-8'>
                    <div>
                        <h1 className=' font-bold text-xl'>
                            INVOICE GENERATOR
                        </h1>
                        <h2 className=' text-[12px] text-[#A7A7A7]'>
                            Generate your purchase invoice
                        </h2>
                    </div>
                    <img src={logo1} alt="" />
                </div>
                {/* <div h-full  > */}
                    <div className='w-auto flex items-start justify-between p-6 h-auto m-4  rounded-xl bg-gradient-to-r from-slate-900 to-slate-800'>
                        <div>
                            <h2 className=' text-[12px] text-[#A7A7A7]'>
                                Traveller Name
                            </h2>
                            <h2 className=' text-[18px] text-[#CCF575]'>
                                {username}
                            </h2>
                            <h2 className=' text-[12px] text-white'>
                                {email}
                            </h2>
                        </div>
                        <h2 className=' text-[12px] text-[#A7A7A7]'>
                            Date: {currentDate}
                        </h2>
                    </div>
                {/* </div> */}

                <div>
                    <div className="overflow-x-auto rounded-lg flex justify-center">
                        <table className="w-full mx-8  border-collapse border-[#3F3F3F] ">
                            <thead >
                                <tr className="bg-gradient-to-r from-sky-700 to-red-800 text-white rounded-xl text-[12px] font-extralight  ">
                                    <th className="px-6 py-2 text-center">Product
                                        <span className="ml-2 cursor-pointer">▲</span>
                                    </th>
                                    <th className="px-6 py-2 text-center">Qty
                                        <span className="ml-2 cursor-pointer">▼</span>
                                    </th>
                                    <th className="px-6 py-2 text-center">Rate</th>
                                    <th className="px-6 py-3 text-center">Total Amount</th>
                                </tr>
                            </thead>
                            <tbody className=" text-black  ">

                                {
                                    Products?.map((e) => {
                                        return (
                                            <tr className="  text-[12px]  border-[#3F3F3F]   ">
                                                <td className="px-6 py-2  text-center">{e.productName}</td>
                                                <td className="px-6 py-2 text-center">{e.ProductQuantity}</td>
                                                <td className="px-6 py-2 text-center ">₹ {e.productPrice}</td>
                                                <td className="px-6 py-2 text-center ">INR {(Number(e.productPrice) || 0) * (Number(e.ProductQuantity) || 0)}</td>

                                            </tr>
                                        )
                                    })
                                }



                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='flex justify-end px-10 my-4'>
                    <div className=' w-[200px] p-3 border border-black rounded-lg space-y-2'>
                        <div className=' text-[10px] text-[#A7A7A7] flex justify-between'>
                            <p className=' text-black'>Total Charges</p>   <p className=' text-black'>₹ {subtotal}</p>
                        </div>
                        <div className=' text-[10px] text-[#A7A7A7] flex justify-between'>
                            <p>+GST 18%</p>   <p>₹ {gst}</p>
                        </div>
                        <div className=' text-[12px] text-[#A7A7A7] flex justify-between'>
                            <p className=' text-[13px] text-black font-bold'>
                                Total Amount
                            </p>
                            <p className='text-[13px] text-blue-500 font-bold'>
                            ₹ {total} </p>
                        </div>
                    </div>
                </div>

                <p className=' text-[11px] ml-10 mt-6'>
                   Date: {currentDate}
                </p>

                <div className=' text-[9px] text-white bg-[#272833] w-auto mx-16 my-3 px-5 py-2 rounded-3xl'>
                We are pleased to provide any further information you may require and look forward to assisting with your next order. Rest assured, it will receive our prompt and dedicated attention.
                </div>
                <button onClick={downloadPDF}>Download PDF</button>
            </div>

        </div>
    )
}

export default ProductInvoice