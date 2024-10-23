import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import RegisterImage from '../assets/RegisterImage.png';
import axios from 'axios';
import { BASE_URL } from '../constants';
import toast from 'react-hot-toast';
import { useNavigation } from 'react-router-dom';

const Register = () => {

    type Inputs={
        username:string,
        email:string,
        password:string
    }
    // useForm hook
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<Inputs>()

    const navigate = useNavigate()

    // Submit handler
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const res = await axios.post(`${BASE_URL}/register`, data);
            if (res.data.success) {
                toast.success(res.data.message);
                
            } else {
                toast.success(res.data.message);
                reset()
                navigate('/login')
            }
        } catch (error:any) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="h-full w-full flex justify-evenly">
            <div className="lg:flex items-center justify-center hidden ">
                <img className='h-[500px]' src={RegisterImage} alt="Register" />
            </div>
            <div className="flex items-center justify-center">
                <div className='flex flex-col gap-4 sm:w-[500px] w-auto p-8'>
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-white text-2xl font-semibold'>
                            Sign up to begin your journey
                        </h1>
                        <h3 className='text-[#A7A7A7] text-[12px] w-72 font-light'>
                            This is a basic signup page used for levitation assignment purposes.
                        </h3>
                    </div>
                    <div>
                        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex flex-col gap-2'>
                                <label className='text-white text-sm'>Enter Your Name</label>
                                <input
                                    className={`border ${errors.username ? 'border-red-500' : 'border-[#424647]'} p-2 rounded-sm text-[12px] text-[#707070] bg-[#202020] placeholder:text-[12px] placeholder:text-[#707070]`}
                                    type="text"
                                    placeholder='Enter your name'
                                    {...register('username', {
                                        required: 'Name is required',
                                        pattern: {
                                            value: /^[a-zA-Z\s]{3,30}$/,
                                            message: 'Name should contain only letters and be 3-30 characters long'
                                        }
                                    })}
                                />
                                {errors.username && <p className='text-red-500 text-[12px]'>{errors.username.message}</p>}
                                <label className='text-[12px] text-[#A7A7A7]'>This name will be displayed with your inquiry</label>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-white text-sm'>Email Address</label>
                                <input
                                    className={`border ${errors.email ? 'border-red-500' : 'border-[#424647]'} p-2 rounded-sm text-[12px] text-[#707070] bg-[#202020] placeholder:text-[12px] placeholder:text-[#707070]`}
                                    type="text"
                                    placeholder='Enter Email ID'
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Please enter a valid email address'
                                        }
                                    })}
                                />
                                {errors.email && <p className='text-red-500 text-[12px]'>{errors.email.message}</p>}
                                <label className='text-[12px] text-[#A7A7A7]'>This email will be displayed with your inquiry</label>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-white text-sm'>Password</label>
                                <input
                                    className={`border ${errors.password ? 'border-red-500' : 'border-[#424647]'} p-2 rounded-sm text-[12px] text-[#707070] bg-[#202020] placeholder:text-[12px] placeholder:text-[#707070]`}
                                    type="password"
                                    placeholder='Enter the Password'
                                    {...register('password', {
                                        required: 'Password is required',
                                        pattern: {
                                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                            message: 'Password must be 8+ characters with letters and numbers.'
                                        }
                                    })}
                                />
                                {errors.password && <p className='text-red-500 text-[12px]'>{errors.password.message}</p>}
                                <label className='text-[12px] text-[#A7A7A7]'>Any further updates will be forwarded on this Email ID</label>
                            </div>

                            <div className='flex items-center gap-3'>
                                <button className='bg-[#303030] text-[12px] p-2 px-3 rounded-md text-[#C9F274]' type="submit">
                                    Register
                                </button>

                                <Link to={'/Login'}>
                                    <p className="text-[#A7A7A7] text-[12px] hover:underline">Already have an account?</p>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
